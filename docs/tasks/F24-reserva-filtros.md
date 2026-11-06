# F24 · Reserva — Filtrar por especialidad y médico

| Campo            | Valor                      |
| ---------------- | -------------------------- |
| Responsable      | Braian                     |
| Revisión         | Fernando                   |
| Etapa            | 2. Dominios                |
| Depende de       | F04, F06, F11              |
| Repositorio      | frontend                   |
| Rama             | `feat/f24-reserva-filtros` |
| Tarjeta anterior | F20                        |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Cargar especialidades y médicos desde los bloques disponibles reales.

## Referencias

- RF06
- CU01 pasos 1 a 3
- Mockups: páginas 28 y 29
- Unidad 5: Screaming Architecture y SOLID (página → hook → service).

## Contrato API

- `GET /api/availability-slots?specialtyId&doctorId&date` → `[{ availabilitySlotId, date, startTime, endTime, doctor, specialty }]`.
- El paciente recibe 403 en `/api/specialties` y `/api/doctors`: no usarlos acá.

## Archivos permitidos

- `src/modules/patients/pages/PatientHome.jsx`
- `src/modules/patients/components/booking/**`
- `src/modules/patients/hooks/useAvailableSlots.js`
- `src/modules/patients/services/getAvailableSlots.js`

## Reutilizar

- `Select`, `Card`, `EmptyState`.

## Fuera de alcance

- Calendario (F25).
- Reseñas, consultorio y datos decorativos del mockup.
- Tocar `pages/AppointmentsPage.jsx`.

## Criterios de aceptación

- [ ] Desaparecen los datos fijos.
- [ ] Los selectores salen de los bloques, sin repetidos.
- [ ] Solo aparecen médicos de la especialidad elegida.
- [ ] Cambiar el filtro limpia médico y horario incompatibles.
- [ ] La página queda dividida en componentes dentro de `components/booking/`.
- [ ] Muestra estados de carga, error y lista vacía.

## Verificación

- Probar con los datos de F04, también a 360 px.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
