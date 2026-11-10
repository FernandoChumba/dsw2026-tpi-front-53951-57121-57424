# F32 · Búsqueda — Paginación y detalle

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| Responsable      | Tobías                      |
| Revisión         | Braian                      |
| Etapa            | 2. Dominios                 |
| Depende de       | F07, F08, F31               |
| Repositorio      | frontend                    |
| Rama             | `feat/f32-busqueda-detalle` |
| Tarjeta anterior | F27                         |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Paginar los resultados y mostrar el detalle de un turno.

## Referencias

- RF09
- Mockup: página 27
- Unidad 4: tablas dinámicas y paginación.

## Contrato API

- Mismos parámetros que F31; `pageIndex` empieza en 0.

## Archivos permitidos

- `src/modules/appointments/pages/AppointmentsSearchPage.jsx`
- `src/modules/appointments/components/**`
- `src/modules/appointments/hooks/useAppointmentSearch.js`

## Reutilizar

- `TablePagination`, `Modal`.

## Fuera de alcance

- Acciones sobre el turno: el enunciado no las pide al administrador.

## Criterios de aceptación

- [ ] Cambiar filtros vuelve a la primera página.
- [ ] El detalle muestra identificador, paciente, profesional, especialidad, fecha, hora y estado.
- [ ] No quedan `alert` en la página.

## Verificación

- Probar más de una página y el detalle de varias filas.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Paginación:** la información viene del backend (`total`, `pageIndex`, `pageSize`) y se pasa a `TablePagination`. No recalcularla en el front.
- **Detalle:** usar el `Modal` compartido.
