// Traduce los errores del backend a mensajes en español para la UI.
// El backend responde: { errorCode, message, details: [{ field, issue }] }.
// Ver la sección "Errores" de docs/api-contract.md.

const MESSAGES = {
  VALIDATION_ERROR: 'Revisá los datos ingresados.',
  APPOINTMENT_VALIDATION: 'Los datos del turno no son válidos.',
  AVAILABILITY_VALIDATION: 'Los datos de la disponibilidad no son válidos.',
  AUTHENTICATION_FAILED: 'Usuario y/o contraseña no son correctos.',
  AUTHORIZATION_FAILED: 'No tenés permiso para realizar esta acción.',
  ENTITY_NOTFOUND: 'El elemento buscado no existe.',
  APPOINTMENT_CONFLICT: 'El horario elegido ya no está disponible. Elegí otro.',
  APPOINTMENT_INVALID_STATUS: 'El turno cambió de estado. Actualizá la lista.',
  AVAILABILITY_DUPLICATE_DAY: 'Ese día ya tiene disponibilidad cargada.',
  RATE_LIMIT_EXCEEDED:
    'Hiciste demasiados intentos. Esperá un minuto y volvé a probar.',
  UNHANDLED_ERROR: 'Ocurrió un error inesperado. Intentá de nuevo más tarde.',
  AVAILABILITY_CALENDAR_UNAVAILABLE:
    'No se pudo guardar la disponibilidad. Intentá de nuevo más tarde.',
};

const NETWORK_ERROR_MESSAGE =
  'No se pudo conectar con el servidor. Revisá tu conexión.';

// Los nombres de campo llegan en distintos formatos ('dni', 'Email',
// 'Patient.Dni'). Se normalizan a camelCase sin prefijo: 'dni', 'email'.
// Si el campo no viene (null o undefined), se usa una cadena vacía.
const normalizeField = (field) => {
  const name = (field ?? '').split('.').pop();

  return name.charAt(0).toLowerCase() + name.slice(1);
};

// Recibe el error que lanza axios y devuelve:
// - code: el errorCode del backend (o null si no hubo respuesta).
// - message: el mensaje para mostrar al usuario.
// - details: lista de { field, issue } con el campo ya normalizado.
export function getApiError(error) {
  const data = error?.response?.data;

  // Sin respuesta: el servidor no está levantado o no hay conexión.
  if (!error?.response) {
    return { code: null, message: NETWORK_ERROR_MESSAGE, details: [] };
  }

  const code = data?.errorCode ?? null;
  const details = (data?.details ?? []).map((detail) => ({
    field: normalizeField(detail.field),
    issue: detail.issue,
  }));

  return {
    code,
    message: MESSAGES[code] ?? MESSAGES.UNHANDLED_ERROR,
    details,
  };
}
