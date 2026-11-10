# F30 · Mis turnos — Historial

| Campo            | Valor                           |
| ---------------- | ------------------------------- |
| Responsable      | Tobías                          |
| Revisión         | Braian                          |
| Etapa            | 2. Dominios                     |
| Depende de       | F08, F28                        |
| Repositorio      | frontend                        |
| Rama             | `feat/f30-mis-turnos-historial` |
| Tarjeta anterior | F37                             |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Mostrar el historial paginado del paciente.

## Referencias

- Adicional al enunciado: viene de la tarjeta F37 y el backend ya tiene el endpoint
- Unidad 4: tablas dinámicas y paginación.

## Contrato API

- `GET /api/appointments/patient/history?dni&pageIndex&pageSize` → `{ pageIndex, pageSize, total, data }`.
- Hoy nada marca `ATTENDED` ni `NO_SHOW`, así que en la práctica muestra canceladas.

## Archivos permitidos

- `src/modules/patients/pages/AppointmentsPage.jsx`
- `src/modules/patients/components/appointments/**`
- `src/modules/patients/hooks/useAppointmentHistory.js`
- `src/modules/patients/services/getAppointmentHistory.js`

## Reutilizar

- `DataTable`, `StatusBadge`, `TablePagination`, `EmptyState`.

## Fuera de alcance

- Datos simulados.
- Marcar turnos como atendidos.

## Criterios de aceptación

- [ ] Se ve en Mis turnos, con médico, especialidad, fecha, horario, motivo y estado.
- [ ] Pagina por servidor.
- [ ] Una cita cancelada aparece en el historial.
- [ ] No aparecen citas de otro paciente.
- [ ] Muestra estados de carga, error y lista vacía.

## Verificación

- Cancelar un turno y verlo en el historial, también a 360 px.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Celular:** el historial también se ve como lista en el celular, no como tabla.
- **Paginación:** sale de los datos del backend (`total`, `pageIndex`) con `TablePagination`.
