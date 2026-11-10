# F28 · Mis turnos — Turnos activos

| Campo            | Valor                         |
| ---------------- | ----------------------------- |
| Responsable      | Tobías                        |
| Revisión         | Braian                        |
| Etapa            | 2. Dominios                   |
| Depende de       | F04, F06, F11                 |
| Repositorio      | frontend                      |
| Rama             | `feat/f28-mis-turnos-activos` |
| Tarjeta anterior | F24                           |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Mostrar los turnos activos reales del paciente.

## Referencias

- Actor Paciente: consultar turnos activos
- Enunciado v1.7, página 19
- Unidad 5: Screaming Architecture y SOLID (página → hook → service).

## Contrato API

- `GET /api/appointments/patient?dni=` → lista con estado `BOOKED`.
- Las horas pueden llegar como `HH:mm:ss`.

## Archivos permitidos

- `src/modules/patients/pages/AppointmentsPage.jsx`
- `src/modules/patients/components/appointments/**`
- `src/modules/patients/hooks/usePatientAppointments.js`
- `src/modules/patients/services/getPatientAppointments.js`

## Reutilizar

- `Card`, `StatusBadge`, `EmptyState`, `formatDate.js`.

## Fuera de alcance

- Tocar `pages/PatientHome.jsx` o `components/booking/`.
- Cancelar (F29).

## Criterios de aceptación

- [ ] Desaparece `sampleAppointments`.
- [ ] Muestra médico, especialidad, fecha, hora y estado.
- [ ] "Solicitar nuevo turno" lleva a `/`.
- [ ] Muestra estados de carga, error y lista vacía.

## Verificación

- Probar paciente con y sin turnos.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Paciente mobile-first:** es obligatorio. En el celular las tablas se convierten en listas o tarjetas: "en mobile no entran tablas".
- **DNI:** usar el `dni` de `useAuth()`. No leer `localStorage` directo: la sesión vive solo en `shared/helpers/session.js` (PR #20).
- **Hook:** la lógica va en un hook; la página solo dibuja.
