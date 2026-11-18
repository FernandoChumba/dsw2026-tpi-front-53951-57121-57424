# Enunciado modificado el 17/11/2026

El profesor publicó una nueva versión del enunciado (`DSW2026_TPI_MOD_17_NOV.pdf`, versión 7.0 del archivo compartido, 28 páginas). Este documento compara esa versión con la v1.7 (`DSW2026_TPI (1).pdf`, 30 páginas), que hasta ahora era la referencia del equipo.

## Resumen

- **Mockups:** son el cambio real. Se rehicieron las 13 imágenes y ya están en `docs/mockups/`.
- **Texto:** parte de una copia anterior. El historial interno termina en la versión 1.2 (8/07/2026) y faltan secciones que la v1.7 sí tenía.
- **Decisión vigente:** el contrato de la API sigue siendo el de `docs/api-contract.md` (v1.7 y backend) hasta que el profesor confirme lo contrario. Los ajustes visuales siguen los mockups nuevos.

## Mockups

| Mockup                             | Página | Cambio respecto de la v1.7                                                                                  | Tarjetas |
| ---------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- | -------- |
| Admin: login                       | 21     | Correo en lugar de usuario, recuadro de credenciales de prueba y enlace al portal de pacientes              | F10      |
| Admin: página principal            | 21     | Menú lateral unificado; acción "Ver Detalle" por médico                                                     | F33, F34 |
| Admin: listado de médicos          | 22     | Sin indicadores debajo de la tabla                                                                          | F17      |
| Admin: crear médico                | 22     | Solo cambia el menú lateral                                                                                 | F18, F19 |
| Admin: disponibilidad horaria      | 23     | Nueva columna "Acciones" con un botón de copiar por día                                                     | F45      |
| Admin: listado de especialidades   | 23     | Sin indicadores ni imagen debajo de la tabla; agrega paginación                                             | F13      |
| Admin: crear especialidad          | 24     | Solo cambia el menú lateral                                                                                 | F14, F15 |
| Admin: búsqueda avanzada           | 24     | Acción "Ver Detalle" por turno                                                                              | F31, F32 |
| Paciente: login                    | 25     | Fondo azul oscuro, campo "Contraseña", recuadro de credenciales de prueba y enlace al acceso administrativo | F42      |
| Paciente: reserva de turno         | 25     | Encabezado "Portal Salud" con "Reservar Turno" y "Mis Turnos"; resumen con duración y botón de confirmación | F43      |
| Paciente: listado de turnos        | 26     | Pantalla nueva: tarjetas con especialidad, médico, fecha, estado y "Cancelar Turno"                         | F44      |
| Paciente: móvil, reserva de turno  | 27     | Días en fila desplazable, horarios en tres columnas y resumen al final                                      | F43      |
| Paciente: móvil, listado de turnos | 28     | Pantalla nueva: tarjetas en una columna y "Solicitar Nuevo Turno" debajo del título                         | F44      |

## Texto

Diferencias entre la v1.7 y el PDF del 17/11. Ninguna se aplica hasta que el profesor la confirme (F45).

| Tema                      | v1.7                                                           | 17/11                                       |
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

## Consultas para el profesor

1. **Login del paciente:** el texto pide correo y DNI, pero el mockup muestra "Contraseña". ¿Cuál vale?
2. **Texto del enunciado:** ¿las diferencias de la tabla anterior son intencionales o el texto se editó sobre una copia anterior?
3. **Credenciales de prueba:** ¿hay que mostrarlas en las pantallas de login, como en los mockups?
4. **Botón de copiar en disponibilidad:** ¿qué debe copiar (el horario de un día a los demás días)?

## Datos de los mockups que no tienen respaldo en el backend

Se mantiene la decisión 1 de `docs/tasks/README.md`: no se muestran datos que la API no devuelve. En los mockups nuevos aplica a "Verificado", la clínica y el consultorio del médico, y el estado "Pendiente" de Mis turnos, porque la API solo usa `BOOKED`, `CANCELLED`, `ATTENDED` y `NO_SHOW`.
