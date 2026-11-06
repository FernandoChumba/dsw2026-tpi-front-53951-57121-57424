# F27 · Reserva — Confirmar

| Campo            | Valor                        |
| ---------------- | ---------------------------- |
| Responsable      | Braian                       |
| Revisión         | Fernando                     |
| Etapa            | 2. Dominios                  |
| Depende de       | F26                          |
| Repositorio      | frontend                     |
| Rama             | `feat/f27-reserva-confirmar` |
| Tarjeta anterior | F23                          |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Registrar la reserva real y manejar el conflicto de concurrencia.

## Referencias

- RF07
- RN03
- CU01 paso 6 y flujo alternativo
- Mockups: páginas 28 y 29

## Contrato API

- `POST /api/appointments`: `{ doctorId, availabilitySlotId, patient: { dni }, reason }` → 201.
- `dni` sale de la sesión y debe pertenecer al usuario: si no, 403.
- 409 `APPOINTMENT_CONFLICT`, 429 `RATE_LIMIT_EXCEEDED` (5 por minuto).

## Archivos permitidos

- `src/modules/patients/components/booking/**`
- `src/modules/patients/hooks/useCreateAppointment.js`
- `src/modules/patients/services/createAppointment.js`

## Reutilizar

- `Modal`, `FormMessage`, `apiError.js`.

## Fuera de alcance

- Reintentos automáticos.
- Mostrar éxito antes de la respuesta.

## Criterios de aceptación

- [ ] El turno se crea una sola vez, sin doble envío.
- [ ] El éxito se muestra después de guardar y lleva a Mis turnos.
- [ ] Ante un 409 se informa, se recargan los bloques y se pide elegir otro.
- [ ] El 429 pide esperar.

## Verificación

- Reservar el mismo bloque desde dos sesiones y comprobar el conflicto.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
