# Contrato de la API

Qué endpoints puede usar el frontend y qué particularidades tienen. Fuente: rama `development` de [`BraianMedrano/dsw2026-tpi`](https://github.com/BraianMedrano/dsw2026-tpi).

> **Importante:** F03 cambia parte de este contrato. Los puntos afectados están en [Cambios pendientes](#cambios-pendientes-de-f03). Si el código del backend y este documento no coinciden, manda el backend: avisar al equipo y corregir este archivo.

## Lo que más se confunde

| Tema                 | Regla                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| Paginación           | `pageIndex` empieza en 0                                                      |
| Filtro `name`        | Omitirlo si está vacío; con menos de 3 caracteres responde 400                |
| DNI del paciente     | El JWT no lo trae: guardarlo desde el login                                   |
| Reserva del paciente | Usar `GET /api/availability-slots`; especialidades y médicos le responden 403 |
| `DELETE` y logout    | Responden el texto `ok`, no JSON                                              |
| 401 en login         | Son credenciales inválidas, no una sesión vencida                             |

## Autenticación

Enviar `Authorization: Bearer <token>` en todas las rutas salvo los dos logins.

| Endpoint                       | Cuerpo                                                         | Respuesta 200                      |
| ------------------------------ | -------------------------------------------------------------- | ---------------------------------- |
| `POST /api/auth/admin/login`   | `{ email, password }`, con `password` de al menos 8 caracteres | `{ token, role: "ADMINISTRADOR" }` |
| `POST /api/auth/patient/login` | `{ email, dni }`, con `dni` de 7 u 8 dígitos como texto        | `{ token, role: "PACIENTE" }`      |
| `POST /api/auth/logout`        | Sin cuerpo                                                     | Texto `ok`; revoca el token        |

- El primer login de un paciente lo crea automáticamente.
- El token dura 60 minutos en desarrollo y no hay refresh.
- Usar el `role` del cuerpo del login. Dentro del JWT el rol tiene otro formato (`Administrador`, `Paciente`).

## Especialidades (Administrador)

| Endpoint                       | Entrada                                | Respuesta                                   |
| ------------------------------ | -------------------------------------- | ------------------------------------------- |
| `GET /api/specialties`         | Query: `pageIndex`, `pageSize`, `name` | 200 paginado de `{ id, name, description }` |
| `GET /api/specialties/{id}`    | —                                      | 200 con el elemento                         |
| `POST /api/specialties`        | `{ name, description }`                | 201 con el elemento                         |
| `PUT /api/specialties/{id}`    | `{ name, description }`                | 200 con el elemento                         |
| `DELETE /api/specialties/{id}` | —                                      | 200 con texto `ok`                          |

Validación: `name` de 3 a 100 caracteres y `description` de 10 a 100.

## Médicos (Administrador)

| Endpoint                   | Entrada                                 | Respuesta                                                              |
| -------------------------- | --------------------------------------- | ---------------------------------------------------------------------- |
| `GET /api/doctors`         | Query: `pageIndex`, `pageSize`, `name`  | 200 paginado de `{ id, name, licenseNumber, specialty: { id, name } }` |
| `POST /api/doctors`        | `{ name, licenseNumber, specialityId }` | 201 con el elemento                                                    |
| `PUT /api/doctors/{id}`    | `{ name, licenseNumber, specialityId }` | 200 con el elemento                                                    |
| `DELETE /api/doctors/{id}` | —                                       | 200 con texto `ok`                                                     |

Validación: `name` de 3 a 100 caracteres; `licenseNumber` y `specialityId` obligatorios.

## Disponibilidad

| Endpoint                               | Rol           | Entrada                                             | Respuesta                                                               |
| -------------------------------------- | ------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `GET /api/doctors/{id}/availabilities` | Administrador | —                                                   | 200 `[{ id, day, startTime, endTime }]`; vacío si no hay carga este mes |
| `POST /api/availabilities`             | Administrador | `{ doctorId, days: [{ day, startTime, endTime }] }` | 201 con la lista                                                        |
| `PUT /api/availabilities`              | Administrador | Igual que `POST`                                    | 200 con la lista                                                        |
| `GET /api/availability-slots`          | Paciente      | Query opcional: `specialtyId`, `doctorId`, `date`   | 200 sin paginar (forma abajo)                                           |

```json
{
  "availabilitySlotId": "guid",
  "date": "YYYY-MM-DD",
  "startTime": "HH:mm",
  "endTime": "HH:mm",
  "doctor": { "doctorId": "guid", "name": "texto" },
  "specialty": { "specialtyId": "guid", "name": "texto" }
}
```

- **Días:** `LUNES`, `MARTES`, `MIÉRCOLES`, `JUEVES`, `VIERNES`, `SÁBADO`, `DOMINGO`.
- **Horas de entrada:** `HH:mm` en múltiplos de 30 minutos, con un rango por día.
- **Alcance:** las reglas cubren el resto del mes actual; no hay parámetro de mes.
- **Guardar:** consultar primero. Sin carga, usar `POST`; con carga, `PUT`. Un `POST` sobre un día existente responde 409.
- **Bloques:** los genera el backend, salteando feriados. `availability-slots` devuelve solo bloques libres y futuros; una lista vacía significa "Sin disponibilidad".

## Turnos

`Appointment` es `{ id, specialtyId, specialty, doctorId, doctor, availabilitySlotId, date, startTime, endTime, patientDni, reason, status }`.

| Endpoint                                | Rol           | Entrada                                                                           | Respuesta                                              |
| --------------------------------------- | ------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `POST /api/appointments`                | Paciente      | `{ doctorId, availabilitySlotId, patient: { dni }, reason }`                      | 201 con `Appointment`                                  |
| `GET /api/appointments/patient`         | Paciente      | Query obligatoria: `dni`                                                          | 200 `Appointment[]`, solo `BOOKED`                     |
| `GET /api/appointments/patient/history` | Paciente      | Query: `dni`, `pageIndex`, `pageSize`                                             | 200 paginado; `CANCELLED`, `ATTENDED`, `NO_SHOW`       |
| `DELETE /api/appointments/{id}`         | Paciente      | —                                                                                 | 200 con texto `ok`                                     |
| `GET /api/appointments`                 | Administrador | Query obligatoria: `date`                                                         | 200 `Appointment[]` sin paginar, con todos los estados |
| `GET /api/appointments/search`          | Administrador | Query opcional: `specialtyId`, `doctorId`, `dni`, `date`, `pageIndex`, `pageSize` | 200 paginado (forma abajo)                             |

```json
{
  "appointmentsId": "guid",
  "appointmentsStatus": "BOOKED",
  "patient": { "dni": 12345678, "fullName": "" },
  "doctor": {
    "doctorId": "guid",
    "name": "texto",
    "specialty": { "specialtyId": "guid", "name": "texto" }
  }
}
```

- `reason` va de 5 a 500 caracteres.
- El `dni` debe pertenecer al usuario del token: otro DNI responde 403 y uno inexistente, 404.
- `dni` es texto en todos lados, salvo el número de `patient.dni` en la búsqueda.
- `fullName` hoy siempre llega vacío.
- Las horas de `Appointment` pueden llegar como `HH:mm:ss`: formatearlas antes de mostrarlas.
- Hoy ningún endpoint marca `ATTENDED` ni `NO_SHOW`.

## Otros

| Endpoint            | Rol             | Respuesta           |
| ------------------- | --------------- | ------------------- |
| `GET /health-check` | Cualquier token | Estado del servicio |

## Convenciones

- **JSON:** camelCase. Todos los IDs son GUID.
- **Fechas:** `YYYY-MM-DD`, sin zona horaria; "futuro" usa la hora local del servidor.
- **Estados de turno:** `BOOKED`, `CANCELLED`, `ATTENDED`, `NO_SHOW`.

## Paginación

Respuesta: `{ pageSize, pageIndex, data, total }`.

| Parámetro   | Por defecto | Rango   |
| ----------- | ----------- | ------- |
| `pageIndex` | 0           | Desde 0 |
| `pageSize`  | 10          | 1 a 100 |

Filtro `name`: en médicos, un valor en blanco responde 400; en especialidades, un `name` corto responde 400. Por eso se omite si está vacío.

## Errores

Formato: `{ errorCode, message, details: [{ field, issue }] }`. `details` puede ser una lista vacía.

| Estado | `errorCode`                                                             | Qué hacer en la UI                                              |
| ------ | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| 400    | `VALIDATION_ERROR`, `APPOINTMENT_VALIDATION`, `AVAILABILITY_VALIDATION` | Mostrar el error del campo o un mensaje general                 |
| 401    | `AUTHENTICATION_FAILED`                                                 | En login: credenciales inválidas. En otras rutas: cerrar sesión |
| 403    | `AUTHORIZATION_FAILED`                                                  | Avisar que no tiene permiso                                     |
| 404    | `ENTITY_NOTFOUND`                                                       | Mostrar que no existe y dar una salida                          |
| 409    | `APPOINTMENT_CONFLICT`                                                  | Avisar, recargar los bloques y pedir otro                       |
| 409    | `APPOINTMENT_INVALID_STATUS`                                            | Avisar y actualizar la lista                                    |
| 409    | `AVAILABILITY_DUPLICATE_DAY`                                            | Avisar y recargar la disponibilidad                             |
| 429    | `RATE_LIMIT_EXCEEDED`                                                   | Pedir que espere; no hay encabezado `Retry-After`               |
| 500    | `UNHANDLED_ERROR`                                                       | Mensaje general, sin detalles técnicos                          |
| 503    | `AVAILABILITY_CALENDAR_UNAVAILABLE`                                     | Avisar que no se pudo guardar                                   |

**Campos en `details`:** los errores de servicio usan camelCase (`dni`). Los de validación automática pueden traer otro formato, como `Email` o `Patient.Dni`, así que hay que normalizarlos antes de asociarlos a un campo. Esto último surge de leer el código: comprobarlo al implementar F05.

### Límites por minuto

| Operación              | Límite | Por          |
| ---------------------- | ------ | ------------ |
| Login de administrador | 5      | IP           |
| Login de paciente      | 10     | IP           |
| Reserva de turno       | 5      | Usuario      |
| Resto                  | 100    | Usuario o IP |

## Ejecución local

- **URL del backend:** `http://localhost:5278`. Swagger está en `/swagger`, solo en Development.
- **Frontend:** usar el proxy `/api` de Vite con `VITE_BACKEND_URL=http://localhost:5278`.
- **Administrador inicial:** se configura con `InitialAdministrator:Email` e `InitialAdministrator:Password`, por User Secrets o variables de entorno. Sin esos valores, el backend no arranca.
- **Base de datos:** SQLite; en Development se migra sola al iniciar.

F04 deja la guía completa en `docs/dev-setup.md`.

## Cambios pendientes de F03

Hasta que F03 esté en `development`, vale lo documentado arriba. Cuando se integre, actualizar este archivo.

| Hoy                                        | Después de F03                                                |
| ------------------------------------------ | ------------------------------------------------------------- |
| Médicos reciben `specialityId`             | Reciben `specialtyId`, como dice el enunciado                 |
| No existe `GET /api/doctors/{id}`          | Existe para Administrador                                     |
| La búsqueda no trae fecha ni horario       | Agrega `date`, `startTime` y `endTime`                        |
| `UseCors` corre después de la autorización | Corre antes, y permite `http://localhost:5173` en Development |
