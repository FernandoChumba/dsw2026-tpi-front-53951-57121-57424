# F29 · Mis turnos — Cancelar

| Campo            | Valor                          |
| ---------------- | ------------------------------ |
| Responsable      | Tobías                         |
| Revisión         | Braian                         |
| Etapa            | 2. Dominios                    |
| Depende de       | F07, F28                       |
| Repositorio      | frontend                       |
| Rama             | `feat/f29-mis-turnos-cancelar` |
| Tarjeta anterior | F25                            |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Cancelar un turno y liberar su horario.

## Referencias

- RF08
- CU03
- Enunciado v1.7, página 19

## Contrato API

- `DELETE /api/appointments/{id}` → 200 con texto `ok`: no tratarlo como JSON.
- 409 `APPOINTMENT_INVALID_STATUS`.

## Archivos permitidos

- `src/modules/patients/pages/AppointmentsPage.jsx`
- `src/modules/patients/components/appointments/**`
- `src/modules/patients/services/cancelAppointment.js`

## Reutilizar

- `ConfirmDialog`, `FormMessage`, `apiError.js`.

## Fuera de alcance

- Cancelar turnos de otros pacientes: lo valida el backend.

## Criterios de aceptación

- [ ] Cancelar el diálogo conserva el turno.
- [ ] Confirmar lo quita de activos.
- [ ] El horario vuelve a estar disponible para reservar.
- [ ] Un 409 se informa y actualiza la lista.

## Verificación

- Cancelar y comprobar que el bloque reaparece en la reserva.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
