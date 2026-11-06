# F21 · Disponibilidad — Pantalla de días y horarios

| Campo            | Valor                              |
| ---------------- | ---------------------------------- |
| Responsable      | Fernando                           |
| Revisión         | Tobías                             |
| Etapa            | 2. Dominios                        |
| Depende de       | F17                                |
| Repositorio      | frontend                           |
| Rama             | `feat/f21-disponibilidad-pantalla` |
| Tarjeta anterior | F18                                |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Mostrar y editar en pantalla los días y horarios de un médico.

## Referencias

- RF05
- CU02
- Mockup: página 25
- Unidad 5: Atomic Design y Tailwind mobile-first.

## Contrato API

- `GET /api/doctors/{id}/availabilities` → `[{ id, day, startTime, endTime }]`; vacío si no hay carga este mes.
- Días: `LUNES` a `DOMINGO`.

## Archivos permitidos

- `src/modules/doctors/pages/DoctorAvailabilityPage.jsx`
- `src/modules/doctors/components/AvailabilityForm.jsx`
- `src/modules/doctors/services/getDoctorAvailability.js`
- `src/modules/doctors/hooks/useDoctorAvailability.js`

## Reutilizar

- `Select`, `Button`, `PageHeader`.
- `doctors/services/getDoctors.js`.

## Fuera de alcance

- Guardar (F22).
- Generar bloques en el frontend.

## Criterios de aceptación

- [ ] Se elige el médico en un selector; `?doctorId=` lo preselecciona.
- [ ] Cada día se habilita y tiene entrada y salida.
- [ ] La carga existente se precarga.
- [ ] Cancelar vuelve al listado.

## Verificación

- Probar médico con y sin disponibilidad, también a 360 px.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
