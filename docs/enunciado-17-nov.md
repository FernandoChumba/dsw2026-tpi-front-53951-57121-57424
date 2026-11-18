# Enunciado modificado en noviembre de 2026

El profesor publicó dos versiones nuevas del enunciado:

- **1.3 (17/11/2026), "Actualización de UI":** `DSW2026_TPI_MOD_17_NOV.pdf`.
- **1.4 (18/11/2026), "Aclaración de los flujos obligatorios":** `DSW2026_TPI_MOD_18_NOV.pdf`. Es la referencia vigente.

Este documento compara esas versiones con la v1.7 (`DSW2026_TPI (1).pdf`, 30 páginas), que hasta ahora era la referencia del equipo.

## Resumen

- **Mockups:** son el cambio real. Se rehicieron las 13 imágenes; las de `docs/mockups/` corresponden a la 1.4.
- **Flujos obligatorios (1.4):** el profesor aclaró qué acciones de administración son obligatorias. Ver la sección siguiente.
- **Texto:** la numeración nueva continúa desde la 1.2 (8/07/2026), así que el texto no incluye lo que agregaban las versiones 1.3 a 1.7 anteriores.
- **Decisión vigente:** el contrato de la API sigue siendo el de `docs/api-contract.md` (v1.7 y backend). Lo que la v1.7 agregaba, como la paginación, no contradice el texto nuevo. Los ajustes visuales siguen los mockups de la 1.4.

## Flujos obligatorios (1.4)

| Pantalla                         | Página | Aclaración del profesor                                                  | Estado en la aplicación                                             |
| -------------------------------- | ------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Admin: página principal          | 21     | "Ver detalle lleva a la página de doctores"                              | Hoy hay un enlace "Ver directorio completo"; no hay acción por fila |
| Admin: listado de médicos        | 22     | "Detalle y edición no es obligatorio. Borrado lógico si es obligatorio." | Implementados detalle, edición y baja                               |
| Admin: listado de especialidades | 23     | "Edición no es obligatorio. Eliminar si es obligatorio."                 | Implementadas edición y baja                                        |
| Admin: búsqueda avanzada         | 24     | "Ver Detalle no es obligatorio"                                          | Implementado                                                        |

Lo que no es obligatorio y ya está hecho se conserva.

## Mockups

| Mockup                             | Página | Cambio respecto de la v1.7                                                                                                            | Tarjetas |
| ---------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| Admin: login                       | 21     | Correo en lugar de usuario, recuadro de credenciales de prueba y enlace al portal de pacientes. En la 1.4 el segundo campo dice "DNI" | F10      |
| Admin: página principal            | 21     | Menú lateral unificado; acción "Ver Detalle" por médico                                                                               | F33, F34 |
| Admin: listado de médicos          | 22     | Sin indicadores debajo de la tabla                                                                                                    | F17      |
| Admin: crear médico                | 22     | Solo cambia el menú lateral                                                                                                           | F18, F19 |
| Admin: disponibilidad horaria      | 23     | La 1.3 agregaba un botón de copiar por día; la 1.4 lo quita. Tampoco muestra "Horario Regular"                                        | F21, F22 |
| Admin: listado de especialidades   | 23     | Sin indicadores ni imagen debajo de la tabla; agrega paginación. En la 1.4 el botón de eliminar está en rojo                          | F13, F16 |
| Admin: crear especialidad          | 24     | Solo cambia el menú lateral                                                                                                           | F14, F15 |
| Admin: búsqueda avanzada           | 24     | Acción "Ver Detalle" por turno                                                                                                        | F31, F32 |
| Paciente: login                    | 25     | Fondo azul oscuro, recuadro de credenciales de prueba y enlace al acceso administrativo. En la 1.4 el campo es "DNI"                  | F42      |
| Paciente: reserva de turno         | 25     | Encabezado "Portal Salud" con "Reservar Turno" y "Mis Turnos"; botón "Buscar Disponibilidad"                                          | F43      |
| Paciente: listado de turnos        | 26     | Pantalla nueva: tarjetas con especialidad, médico, fecha, estado y "Cancelar Turno"                                                   | F44      |
| Paciente: móvil, reserva de turno  | 27     | Días en fila desplazable, horarios en tres columnas y resumen al final                                                                | F43      |
| Paciente: móvil, listado de turnos | 28     | Pantalla nueva: tarjetas en una columna y "Solicitar Nuevo Turno" debajo del título                                                   | F44      |

## Texto

Diferencias entre la v1.7 y el texto de las versiones de noviembre. Se registran como referencia, pero no cambian la implementación.

| Tema                      | v1.7                                                           | Noviembre (1.3 y 1.4)                       |
| ------------------------- | -------------------------------------------------------------- | ------------------------------------------- |
| Paginación                | `pageSize` y `pageIndex` en especialidades, médicos y búsqueda | Solo `name`; la búsqueda sin paginación     |
| Respuestas                | POST y PUT devuelven la entidad; DELETE devuelve `ok`          | No se especifican                           |
| Médico                    | Incluye `licenseNumber`; `specialtyId` es Guid                 | Sin `licenseNumber`; `specialtyId` numérico |
| Reserva                   | `availabilitySlotId`                                           | `availabilityId`                            |
| Disponibilidad (CU02)     | Turnos para el resto del mes                                   | Turnos para la semana siguiente             |
| Actualizar disponibilidad | Sobrescribe solo los turnos futuros no reservados              | Sobrescribe todo el mes                     |
| Feriados                  | Se excluyen y se cargan desde un JSON                          | No se mencionan                             |
| Rate limiting y log       | Definidos                                                      | No se mencionan                             |
| Códigos de error          | Los define el grupo                                            | "A definir"                                 |
| Entregables y evaluación  | Backend y frontend, con criterios y porcentajes                | No aparecen                                 |

## Consultas resueltas por la 1.4

1. **Login del paciente:** el mockup ahora pide "DNI", igual que el texto. Se mantiene correo y DNI.
2. **Botón de copiar en disponibilidad:** el mockup ya no lo muestra. No se implementa.

## Consulta abierta

- **Login del administrador:** en la 1.4 el mockup también dice "DNI" en el segundo campo, pero el texto pide correo y contraseña de al menos 8 caracteres (RNF01). Parece un error del mockup: se mantiene la contraseña.

## Credenciales de prueba

Los mockups de login muestran un recuadro con credenciales de prueba. No se agrega a las pantallas: la regla 12 de `docs/tasks/README.md` prohíbe credenciales en el código y el usuario administrador lo crea el backend desde su configuración. Las credenciales para probar la aplicación se documentan en el README de entrega (F41).

## Datos de los mockups que no tienen respaldo en el backend

Se mantiene la decisión 1 de `docs/tasks/README.md`: no se muestran datos que la API no devuelve. En los mockups nuevos aplica a "Verificado", la clínica y el consultorio del médico, y el estado "Pendiente" de Mis turnos, porque la API solo usa `BOOKED`, `CANCELLED`, `ATTENDED` y `NO_SHOW`.
