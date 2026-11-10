# F33 · Panel — Indicadores reales

| Campo            | Valor                        |
| ---------------- | ---------------------------- |
| Responsable      | Tobías                       |
| Revisión         | Braian                       |
| Etapa            | 2. Dominios                  |
| Depende de       | F06, F10                     |
| Repositorio      | frontend                     |
| Rama             | `feat/f33-panel-indicadores` |
| Tarjeta anterior | F28                          |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Reemplazar los números inventados del panel por datos reales.

## Referencias

- Mockup: página 23
- Unidad 5: Screaming Architecture y SOLID (página → hook → service).

## Contrato API

- Médicos: `total` de `GET /api/doctors?pageSize=1`.
- Especialidades: `total` de `GET /api/specialties?pageSize=1`.
- "Turnos confirmados para hoy" del mockup: `GET /api/appointments?date=YYYY-MM-DD`, contando solo `BOOKED`.

## Archivos permitidos

- `src/modules/dashboard/pages/OverviewPage.jsx`
- `src/modules/dashboard/hooks/useDashboardSummary.js`
- `src/modules/dashboard/services/getTodayAppointments.js`

## Reutilizar

- `getDoctors.js` y `getSpecialties.js`, solo para leer.
- `Card`, `DataTable`.

## Fuera de alcance

- Agregar un endpoint de contadores.
- Métricas sin datos que las respalden.

## Criterios de aceptación

- [ ] Ningún número es fijo.
- [ ] Crear datos o cancelar un turno cambia los indicadores.
- [ ] El listado del panel usa médicos reales.
- [ ] Muestra estados de carga, error y lista vacía.

## Verificación

- Comparar los indicadores con las respuestas de la API.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Nueva UI en camino:** el profe va a publicar una nueva versión de la UI y puede cambiar indicadores. No agregar indicadores que no estén en esta tarjeta.
- **Indicadores de la p24 (listado de médicos):** "Disponibles" y "Emergencias" se sacan. "Total consultas hoy" se puede calcular, pero todavía no está definido. Queda fuera de esta tarjeta.
