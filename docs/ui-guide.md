# Guía de UI

Dónde están los estilos y componentes compartidos, y cómo usarlos para que todas las pantallas se vean iguales. F06, F07 y F08 completan el catálogo.

## Reglas

1. **Reutilizar antes de crear.** Buscar primero en la tabla de componentes.
2. **Si falta un componente,** proponerlo en un PR propio. No crearlo dentro de una página.
3. **Colores solo con tokens `med-*`.** No usar la paleta de Tailwind para marca o estados (por ejemplo, `bg-red-600`), ni valores hexadecimales en JSX.
4. **Mobile-first:** estilos base para móvil y `sm:`, `md:` hacia arriba.
5. **Una sola fuente:** los tokens viven en `src/index.css` y los componentes en `src/modules/shared/components`.

## Dónde va cada cosa

Según Atomic Design (Unidad 5):

| Nivel              | Qué es                           | Dónde                              |
| ------------------ | -------------------------------- | ---------------------------------- |
| Átomos y moléculas | `Button`, `Input`, `StatusBadge` | `modules/shared/components`        |
| Organismos         | Formulario o tabla de un dominio | `modules/<dominio>/components`     |
| Plantillas         | Layouts con `Outlet`             | `DashboardLayout`, `PatientLayout` |
| Páginas            | Conectan datos con la UI         | `modules/<dominio>/pages`          |

## Tokens

Definidos en `@theme`, dentro de `src/index.css`. Se usan como clases: `bg-med-bg`, `text-med-text-main`, `border-med-border`.

| Uso             | Tokens                                                                   |
| --------------- | ------------------------------------------------------------------------ |
| Marca           | `med-primary-50`, `100`, `200`, `500`, `600`, `700`, `800`, `900`, `950` |
| Fondos          | `med-bg`, `med-card`                                                     |
| Bordes          | `med-border`, `med-border-subtle`                                        |
| Texto           | `med-text-main`, `med-text-sub`, `med-text-muted`                        |
| Estado activo   | `med-active-bg`, `med-active-text`                                       |
| Estado de aviso | `med-leave-bg`, `med-leave-text`                                         |
| Estado de error | `med-danger-bg`, `med-danger-text`, `med-danger-hover`                   |

## Componentes

| Componente                              | Props principales                                                         | Estado           |
| --------------------------------------- | ------------------------------------------------------------------------- | ---------------- |
| `Button`                                | `variant` admite `default`, `secondary`, `outline`, `ghost` y `danger`    | Disponible       |
| `Card`                                  | `className`, `children`                                                   | Disponible       |
| `Input`                                 | `label`, `error`, `id`, props nativas de input                            | Disponible       |
| `TablePagination`                       | `pageIndex` (base 0), `pageSize`, `total`, `onPageChange`                 | Disponible       |
| `PageHeader`                            | `title`, `description`, `actions`                                         | Disponible       |
| `SearchInput`                           | Props de `Input`, con tipo de búsqueda y etiqueta predeterminada «Buscar» | Disponible       |
| `Select`                                | `label`, `error`, `id`, opciones como hijos y props nativas de select     | Disponible       |
| `Textarea`                              | `label`, `error`, `id`, `rows` y props nativas de textarea                | Disponible       |
| `StatusBadge`                           | `status` recibe el estado de turno de la API                              | Disponible       |
| `DataTable`                             | `caption`, `columns`, `rows`, `getRowKey`, `emptyMessage`                 | Disponible       |
| `EmptyState`                            | `title`, `description`, `action`                                          | Disponible       |
| `Modal`, `ConfirmDialog`, `FormMessage` | Las define F07                                                            | Pendiente de F07 |

Quien complete una de esas tareas actualiza esta tabla en el mismo PR.

En `TablePagination`, el listado pasa el total de registros y controla el índice de página desde cero. `onPageChange` recibe el nuevo índice. Con cero registros, los dos botones quedan deshabilitados.

Pasar `{...register('campo')}` a `Input`, `Select` o `Textarea` y el mensaje de validación a `error`. Cada campo vincula su etiqueta y el error con el control nativo.

En `DataTable`, cada columna recibe `key`, `header` y, cuando haga falta, `render(row)`. Las filas usan `row.id` como clave por defecto. Si el recurso tiene otro identificador, pasar `getRowKey`. La tabla permite desplazamiento horizontal dentro de su contenedor en pantallas angostas.

En `shared/helpers/formatDate.js`, `formatDate` presenta fechas `YYYY-MM-DD` con formato argentino sin desplazarlas por zona horaria. `formatTime` muestra horas `HH:mm` a partir de valores `HH:mm` o `HH:mm:ss`. Ambos devuelven una cadena vacía si el valor es inválido.

## Mockups

Las imágenes están en `docs/mockups/`. El índice y las decisiones sobre datos sin respaldo en el backend están en `docs/tasks/README.md`.
