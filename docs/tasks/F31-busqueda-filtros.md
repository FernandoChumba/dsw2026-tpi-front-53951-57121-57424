# F31 · Búsqueda — Filtros combinados

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| Responsable      | Tobías                      |
| Revisión         | Braian                      |
| Etapa            | 2. Dominios                 |
| Depende de       | F03, F04, F06, F10          |
| Repositorio      | frontend                    |
| Rama             | `feat/f31-busqueda-filtros` |
| Tarjeta anterior | F26                         |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Conectar la búsqueda avanzada de turnos con el backend.

## Referencias

- RF09
- Mockup: página 27
- Enunciado v1.7, página 20
- Unidad 5: Screaming Architecture y SOLID (página → hook → service).

## Contrato API

- `GET /api/appointments/search?specialtyId&doctorId&dni&date&pageIndex&pageSize`.
- Respuesta: `{ appointmentsId, appointmentsStatus, patient, doctor }`, más fecha y horarios de F03.
- `fullName` puede ser vacío.

## Archivos permitidos

- `src/modules/appointments/pages/AppointmentsSearchPage.jsx`
- `src/modules/appointments/hooks/useAppointmentSearch.js`
- `src/modules/appointments/services/searchAppointments.js`
- `src/modules/appointments/components/**`

## Reutilizar

- `Select`, `Input`, `Button`, `DataTable`, `StatusBadge`, `EmptyState`.
- `getSpecialties.js` y `getDoctors.js`, solo para leer.

## Fuera de alcance

- Buscar por nombre de paciente: el backend filtra por DNI.
- Paginación y detalle (F32).

## Criterios de aceptación

- [ ] Desaparecen los datos fijos.
- [ ] La tabla muestra especialidad, médico, horario, paciente y estado, como pide el enunciado en la página 20.
- [ ] Aplicar filtra por DNI, especialidad, médico y fecha, combinados.
- [ ] Limpiar restaura los resultados.
- [ ] Los médicos se limitan a la especialidad elegida.
- [ ] Muestra estados de carga, error y lista vacía.

## Verificación

- Probar cada filtro solo y combinado.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
