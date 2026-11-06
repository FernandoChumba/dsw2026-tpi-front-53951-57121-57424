# F08 · UI — Paginación por servidor

| Campo            | Valor                 |
| ---------------- | --------------------- |
| Responsable      | Fernando              |
| Revisión         | Tobías                |
| Etapa            | 0. Base               |
| Depende de       | F06                   |
| Repositorio      | frontend              |
| Rama             | `feat/f08-paginacion` |
| Tarjeta anterior | F04                   |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Adaptar `TablePagination` al contrato paginado del backend.

## Referencias

- Unidad 4: tablas dinámicas y paginación.
- Unidad 5: Atomic Design y Tailwind mobile-first.

## Contrato API

- Respuesta paginada: `{ pageSize, pageIndex, data, total }`.
- `pageIndex` empieza en 0; `pageSize` va de 1 a 100.

## Archivos permitidos

- `src/modules/shared/components/TablePagination.jsx`
- `docs/ui-guide.md`

## Reutilizar

- Diseño actual de `TablePagination`.

## Fuera de alcance

- Modificar páginas que todavía no lo usan.
- Hacer peticiones dentro del componente.

## Criterios de aceptación

- [ ] Recibe `pageIndex`, `pageSize`, `total` y `onPageChange`, con `pageIndex` base 0.
- [ ] Muestra "Mostrando X a Y de Z registros".
- [ ] Anterior y siguiente respetan los límites.
- [ ] Con `total` 0 no se rompe.

## Verificación

- Probar con 0, 1 y más de una página.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
