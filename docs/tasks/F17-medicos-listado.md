# F17 · Médicos — Listado, búsqueda y paginación

| Campo            | Valor                      |
| ---------------- | -------------------------- |
| Responsable      | Fernando                   |
| Revisión         | Tobías                     |
| Etapa            | 2. Dominios                |
| Depende de       | F04, F06, F08, F10         |
| Repositorio      | frontend                   |
| Rama             | `feat/f17-medicos-listado` |
| Tarjeta anterior | F17                        |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Mostrar los médicos reales con búsqueda y paginación por servidor.

## Referencias

- Mockup: página 24
- Unidad 4: tablas dinámicas y paginación.
- Unidad 5: Screaming Architecture y SOLID (página → hook → service).

## Contrato API

- `GET /api/doctors?pageIndex&pageSize&name` → `{ id, name, licenseNumber, specialty: { id, name } }`.
- `name` va de 3 a 100 caracteres: omitirlo si está vacío, porque vacío responde 400.

## Archivos permitidos

- `src/modules/doctors/pages/DoctorsPage.jsx`
- `src/modules/doctors/hooks/useDoctors.js`
- `src/modules/doctors/services/getDoctors.js`

## Reutilizar

- `PageHeader`, `SearchInput`, `DataTable`, `EmptyState`, `TablePagination`: se elimina el paginador propio de la página.

## Fuera de alcance

- Estado de disponibilidad, avatares e indicadores decorativos: el backend no tiene esos datos.
- Crear, editar o eliminar.

## Criterios de aceptación

- [ ] Desaparecen los datos fijos.
- [ ] La tabla muestra nombre, matrícula y especialidad.
- [ ] Búsqueda y paginación consultan al backend.
- [ ] Con 1 o 2 caracteres se avisa el mínimo y no se llama a la API.
- [ ] Muestra estados de carga, error y lista vacía.
- [ ] Los botones llevan a `/admin/doctors/new` y `/admin/doctors/availability`.

## Verificación

- Probar con los datos de F04 y con más de una página.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
