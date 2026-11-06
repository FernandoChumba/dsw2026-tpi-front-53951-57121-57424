# F06 · Base — Tokens y componentes compartidos

| Campo            | Valor                   |
| ---------------- | ----------------------- |
| Responsable      | Fernando                |
| Revisión         | Tobías                  |
| Etapa            | 0. Base                 |
| Depende de       | Ninguna                 |
| Repositorio      | frontend                |
| Rama             | `feat/f06-fundacion-ui` |
| Tarjeta anterior | Nueva                   |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Definir la única fuente de estilos y componentes para que la UI sea consistente entre ramas.

## Referencias

- Unidad 5: Atomic Design y Tailwind mobile-first.
- RNF05
- Mockups v1.7, páginas 23 a 29

## Contrato API

- Estados de turno: `BOOKED`, `CANCELLED`, `ATTENDED`, `NO_SHOW`.

## Archivos permitidos

- `src/index.css`
- `src/elements.css`
- `src/modules/shared/components/**`
- `src/modules/shared/helpers/formatDate.js`
- `docs/ui-guide.md`

## Reutilizar

- Tokens `med-*` de `src/index.css`.
- Componentes `Button`, `Card` e `Input` existentes.

## Fuera de alcance

- Modificar páginas de dominio.
- Librerías de componentes.
- Crear una pantalla de catálogo.

## Criterios de aceptación

- [ ] La escala `med-primary-*` queda ordenada: hoy `800` es más oscuro que `900`.
- [ ] `Button` e `Input` usan solo tokens para estados de error y peligro.
- [ ] Se agregan `PageHeader`, `SearchInput`, `Select`, `Textarea`, `StatusBadge`, `DataTable` y `EmptyState`.
- [ ] `Input`, `Select` y `Textarea` funcionan con `register`, asocian su `label` y muestran el error debajo.
- [ ] `StatusBadge` muestra `BOOKED` como "Confirmada", `CANCELLED` como "Cancelada", `ATTENDED` como "Atendida" y `NO_SHOW` como "No asistió", según CU01 y CU03.
- [ ] `formatDate.js` formatea fechas y acepta horas `HH:mm` y `HH:mm:ss`.
- [ ] `docs/ui-guide.md` lista tokens, cada componente, sus props y la regla: reutilizar antes de crear.

## Verificación

- Los componentes se prueban a 360 px y 1366 px.
- No quedan colores de la paleta de Tailwind para marca o estados dentro de `shared/`.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
