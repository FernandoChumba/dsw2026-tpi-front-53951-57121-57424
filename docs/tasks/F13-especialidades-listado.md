# F13 · Especialidades — Listado, búsqueda y paginación

| Campo            | Valor                             |
| ---------------- | --------------------------------- |
| Responsable      | Tobías                            |
| Revisión         | Braian                            |
| Etapa            | 2. Dominios                       |
| Depende de       | F04, F06, F08, F10                |
| Repositorio      | frontend                          |
| Rama             | `feat/f13-especialidades-listado` |
| Tarjeta anterior | F12                               |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Mostrar las especialidades reales con búsqueda y paginación por servidor.

## Referencias

- Mockup: página 25
- Unidad 4: tablas dinámicas y paginación.
- Unidad 5: Screaming Architecture y SOLID (página → hook → service).

## Contrato API

- `GET /api/specialties?pageIndex&pageSize&name`
- `name` va de 3 a 100 caracteres: omitirlo si está vacío, porque con menos de 3 responde 400.

## Archivos permitidos

- `src/modules/specialties/pages/SpecialtiesPage.jsx`
- `src/modules/specialties/hooks/useSpecialties.js`
- `src/modules/specialties/services/getSpecialties.js`

## Reutilizar

- `PageHeader`, `SearchInput`, `DataTable`, `EmptyState`, `TablePagination`.

## Fuera de alcance

- Crear, editar o eliminar.
- Columna de estado e indicadores decorativos: el backend no tiene esos datos.

## Criterios de aceptación

- [ ] Desaparecen los datos fijos de la página.
- [ ] La búsqueda y el cambio de página consultan al backend.
- [ ] Buscar vuelve a la primera página.
- [ ] Con 1 o 2 caracteres se avisa el mínimo y no se llama a la API.
- [ ] Muestra estados de carga, error y lista vacía.
- [ ] Las acciones llevan a `/admin/specialties/new` y `/admin/specialties/:id/edit`.

## Verificación

- Probar con los datos de F04 y con más de una página.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
