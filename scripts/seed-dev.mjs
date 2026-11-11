import { URL } from 'node:url';

const API_PREFIX = '/api';
const PAGE_SIZE = 100;
const ADMIN_EMAIL_ENV = 'SEED_ADMIN_EMAIL';
const ADMIN_PASSWORD_ENV = 'SEED_ADMIN_PASSWORD';

const seedData = {
  specialty: {
    name: 'F04 Medicina de prueba',
    description: 'Especialidad ficticia para pruebas locales de desarrollo.',
  },
  doctor: {
    name: 'Medico de prueba F04',
    licenseNumber: 'F04-DEV-0001',
  },
  patient: {
    email: 'paciente.f04@example.com',
    dni: '99000004',
  },
  appointmentReason: 'Reserva de prueba F04 para desarrollo.',
};

class ApiError extends Error {
  constructor(status, payload) {
    const code =
      payload && typeof payload === 'object' ? payload.errorCode : undefined;
    const message =
      payload && typeof payload === 'object' ? payload.message : undefined;

    super(message || code || 'La API devolvio un error sin detalle.');
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

function getConfiguration() {
  const missing = [ADMIN_EMAIL_ENV, ADMIN_PASSWORD_ENV].filter(
    (name) => !process.env[name]?.trim()
  );

  if (missing.length > 0) {
    throw new Error(
      'Faltan variables de entorno necesarias: ' + missing.join(', ')
    );
  }

  const backendUrl = (
    process.env.VITE_BACKEND_URL || 'http://localhost:5278'
  ).replace(/\/+$/, '');

  let parsedUrl;
  try {
    parsedUrl = new URL(backendUrl);
  } catch {
    throw new Error('VITE_BACKEND_URL no contiene una URL valida.');
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    throw new Error('VITE_BACKEND_URL debe comenzar con http:// o https://.');
  }

  return {
    backendUrl,
    adminEmail: process.env[ADMIN_EMAIL_ENV].trim(),
    adminPassword: process.env[ADMIN_PASSWORD_ENV],
  };
}

async function request(
  path,
  { backendUrl, token, method = 'GET', body, query } = {}
) {
  const url = new URL(API_PREFIX + path, backendUrl);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, String(value));
    }
  }

  const headers = { Accept: 'application/json' };
  if (token) headers.Authorization = 'Bearer ' + token;
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el backend en ' + backendUrl + '.'
    );
  }

  const responseText = await response.text();
  let payload = null;
  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = responseText;
    }
  }

  if (!response.ok) throw new ApiError(response.status, payload);
  return payload;
}

async function getAllPages(path, token, backendUrl, filters = {}) {
  const items = [];
  let pageIndex = 0;
  let total = Number.POSITIVE_INFINITY;

  while (items.length < total) {
    const result = await request(path, {
      backendUrl,
      token,
      query: { ...filters, pageIndex, pageSize: PAGE_SIZE },
    });

    if (!Array.isArray(result?.data)) {
      throw new Error('La API devolvio una pagina con formato inesperado.');
    }

    items.push(...result.data);
    total = Number(result.total);
    pageIndex += 1;

    if (result.data.length === 0 || !Number.isFinite(total)) break;
  }

  return items;
}

function normalizeText(value) {
  return String(value || '')
    .trim()
    .toLocaleLowerCase('es');
}

async function loginAdmin(configuration) {
  const result = await request('/auth/admin/login', {
    backendUrl: configuration.backendUrl,
    method: 'POST',
    body: {
      email: configuration.adminEmail,
      password: configuration.adminPassword,
    },
  });

  if (!result?.token) {
    throw new Error('El login de administrador no devolvio un token.');
  }

  return result.token;
}

async function ensureSpecialty(token, backendUrl) {
  const specialties = await getAllPages('/specialties', token, backendUrl, {
    name: seedData.specialty.name,
  });
  const existing = specialties.find(
    (item) =>
      normalizeText(item.name) === normalizeText(seedData.specialty.name)
  );

  if (existing) {
    console.log('Especialidad reutilizada: ' + existing.name);
    return existing;
  }

  const created = await request('/specialties', {
    backendUrl,
    token,
    method: 'POST',
    body: seedData.specialty,
  });

  console.log('Especialidad creada: ' + created.name);
  return created;
}

async function ensureDoctor(token, backendUrl, specialty) {
  const doctors = await getAllPages('/doctors', token, backendUrl);
  const existing = doctors.find(
    (item) =>
      normalizeText(item.licenseNumber) ===
      normalizeText(seedData.doctor.licenseNumber)
  );

  if (existing) {
    const sameDoctor =
      normalizeText(existing.name) === normalizeText(seedData.doctor.name) &&
      existing.specialty?.id === specialty.id;

    if (!sameDoctor) {
      throw new Error(
        'La matricula de prueba ya pertenece a un medico con otros datos; no se modifico.'
      );
    }

    console.log('Medico reutilizado: ' + existing.name);
    return existing;
  }

  const created = await request('/doctors', {
    backendUrl,
    token,
    method: 'POST',
    body: { ...seedData.doctor, specialtyId: specialty.id },
  });

  console.log('Medico creado: ' + created.name);
  return created;
}

function chooseAvailabilityDay() {
  const today = new Date();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const counts = new Map();

  for (
    let dayOfMonth = today.getDate() + 1;
    dayOfMonth <= lastDay;
    dayOfMonth += 1
  ) {
    const weekday = new Date(
      today.getFullYear(),
      today.getMonth(),
      dayOfMonth
    ).getDay();
    counts.set(weekday, (counts.get(weekday) || 0) + 1);
  }

  const dayNames = new Map([
    [1, 'LUNES'],
    [2, 'MARTES'],
    [3, 'MIERCOLES'],
    [4, 'JUEVES'],
    [5, 'VIERNES'],
    [6, 'SABADO'],
    [0, 'DOMINGO'],
  ]);
  const preferredWeekdays = [1, 2, 3, 4, 5, 6, 0];
  const availableDay = preferredWeekdays
    .filter((weekday) => counts.has(weekday))
    .sort((left, right) => counts.get(right) - counts.get(left))[0];

  return availableDay === undefined ? null : dayNames.get(availableDay);
}

async function getDoctorAvailability(token, backendUrl, doctorId) {
  const result = await request('/doctors/' + doctorId + '/availabilities', {
    backendUrl,
    token,
  });

  if (!Array.isArray(result)) {
    throw new Error(
      'La API devolvio la disponibilidad con formato inesperado.'
    );
  }

  return result;
}

async function ensureAvailability(token, backendUrl, doctor) {
  const existing = await getDoctorAvailability(token, backendUrl, doctor.id);

  if (existing.length > 0) {
    console.log('Disponibilidad reutilizada para el medico.');
    return;
  }

  const day = chooseAvailabilityDay();
  if (!day) {
    console.log(
      'No quedan fechas futuras en el mes actual para crear disponibilidad.'
    );
    return;
  }

  await request('/availabilities', {
    backendUrl,
    token,
    method: 'POST',
    body: {
      doctorId: doctor.id,
      days: [{ day, startTime: '09:00', endTime: '12:00' }],
    },
  });

  console.log('Disponibilidad creada para ' + day + ' de 09:00 a 12:00.');
}

async function loginPatient(backendUrl) {
  const result = await request('/auth/patient/login', {
    backendUrl,
    method: 'POST',
    body: {
      email: seedData.patient.email,
      dni: seedData.patient.dni,
    },
  });

  if (!result?.token) {
    throw new Error('El login del paciente no devolvio un token.');
  }

  console.log('Paciente de desarrollo autenticado.');
  return result.token;
}

function isSeedAppointment(appointment, doctorId) {
  return (
    appointment?.doctorId === doctorId &&
    appointment?.reason === seedData.appointmentReason
  );
}

async function findSeedAppointment(token, backendUrl, doctorId) {
  const active = await request('/appointments/patient', {
    backendUrl,
    token,
    query: { dni: seedData.patient.dni },
  });

  if (!Array.isArray(active)) {
    throw new Error(
      'La API devolvio los turnos activos con formato inesperado.'
    );
  }

  const activeMatch = active.find((appointment) =>
    isSeedAppointment(appointment, doctorId)
  );
  if (activeMatch) return activeMatch;

  const history = await getAllPages(
    '/appointments/patient/history',
    token,
    backendUrl,
    { dni: seedData.patient.dni }
  );

  return history.find((appointment) =>
    isSeedAppointment(appointment, doctorId)
  );
}

async function getAvailableSlots(token, backendUrl, specialtyId, doctorId) {
  const slots = await request('/availability-slots', {
    backendUrl,
    token,
    query: { specialtyId, doctorId },
  });

  if (!Array.isArray(slots)) {
    throw new Error(
      'La API devolvio los bloques disponibles con formato inesperado.'
    );
  }

  return slots;
}

async function createSeedAppointment(token, backendUrl, specialty, doctor) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const slots = await getAvailableSlots(
      token,
      backendUrl,
      specialty.id,
      doctor.id
    );
    const slot = slots.find(
      (item) =>
        item.doctor?.doctorId === doctor.id &&
        item.specialty?.specialtyId === specialty.id
    );

    if (!slot) {
      console.log(
        'No hay bloques futuros disponibles para el resto del mes. No se creo una reserva.'
      );
      return;
    }

    try {
      const appointment = await request('/appointments', {
        backendUrl,
        token,
        method: 'POST',
        body: {
          doctorId: doctor.id,
          availabilitySlotId: slot.availabilitySlotId,
          patient: { dni: seedData.patient.dni },
          reason: seedData.appointmentReason,
        },
      });

      console.log(
        'Reserva creada para ' +
          appointment.date +
          ' a las ' +
          String(appointment.startTime).slice(0, 5) +
          '.'
      );
      return;
    } catch (error) {
      if (
        !(error instanceof ApiError) ||
        error.status !== 409 ||
        error.code !== 'APPOINTMENT_CONFLICT'
      )
        throw error;

      const existing = await findSeedAppointment(token, backendUrl, doctor.id);
      if (existing) {
        console.log(
          'La reserva F04 ya existe con estado ' + existing.status + '.'
        );
        return;
      }

      if (attempt === 2) {
        throw new Error(
          'El bloque cambio durante la reserva. No se creo una cita; volve a ejecutar el seed.'
        );
      }
    }
  }
}

async function main() {
  const configuration = getConfiguration();
  const adminToken = await loginAdmin(configuration);
  console.log('Sesion de administrador iniciada.');

  const specialty = await ensureSpecialty(adminToken, configuration.backendUrl);
  const doctor = await ensureDoctor(
    adminToken,
    configuration.backendUrl,
    specialty
  );
  await ensureAvailability(adminToken, configuration.backendUrl, doctor);

  const patientToken = await loginPatient(configuration.backendUrl);
  const existingAppointment = await findSeedAppointment(
    patientToken,
    configuration.backendUrl,
    doctor.id
  );

  if (existingAppointment) {
    console.log(
      'La reserva F04 ya existe con estado ' +
        existingAppointment.status +
        '; no se creo otra.'
    );
    return;
  }

  await createSeedAppointment(
    patientToken,
    configuration.backendUrl,
    specialty,
    doctor
  );
}

main().catch((error) => {
  if (error instanceof ApiError) {
    const code = error.code ? ' (' + error.code + ')' : '';
    if (error.status === 401) {
      console.error(
        'La API rechazo la autenticacion (401)' +
          code +
          '. Verifica las credenciales locales configuradas.'
      );
    } else {
      console.error(
        'La API respondio ' + error.status + code + ': ' + error.message
      );
    }
  } else {
    console.error('Error en seed:dev: ' + error.message);
  }

  process.exitCode = 1;
});
