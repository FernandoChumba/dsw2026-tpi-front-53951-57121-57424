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
| Estado de error | `med-danger-bg`, `med-danger-text`                                       |

> **Pendiente de F06:** la escala `med-primary` no está ordenada, porque `800` es más oscuro que `900`. Evitar nuevos usos de `800` hasta que se corrija.

## Componentes

| Componente                                                                                  | Props principales                                                         | Estado                                    |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| `Button`                                                                                    | `variant`: `default`, `secondary`, `outline`, `ghost`, `danger`           | Disponible; F06 ajusta `danger` a tokens  |
| `Card`                                                                                      | `className`, `children`                                                   | Disponible                                |
| `Input`                                                                                     | `label`, `error`                                                          | Disponible; F06 ajusta errores y etiqueta |
| `TablePagination`                                                                           | Hoy `currentPage`, `totalPages`, `totalItems`, `pageSize`, `onPageChange` | F08 lo pasa a `pageIndex` base 0          |
| `PageHeader`, `SearchInput`, `Select`, `Textarea`, `StatusBadge`, `DataTable`, `EmptyState` | Las define F06                                                            | Pendiente de F06                          |
| `Modal`, `ConfirmDialog`, `FormMessage`                                                     | Las define F07                                                            | Pendiente de F07                          |

Quien complete una de esas tareas actualiza esta tabla en el mismo PR.

## Mockups

Las imágenes están en `docs/mockups/`, y `AGENTS.md` tiene el índice. Si el mockup muestra datos que el backend no tiene, se omiten según las decisiones de `docs/tasks/README.md`.
