# F35 · UI — Textos, fechas y estados

| Campo            | Valor                         |
| ---------------- | ----------------------------- |
| Responsable      | Tobías                        |
| Revisión         | Braian                        |
| Etapa            | 3. Cierre                     |
| Depende de       | F16, F20, F23, F27, F30, F32  |
| Repositorio      | frontend                      |
| Rama             | `fix/f35-consistencia-textos` |
| Tarjeta anterior | F30                           |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Unificar los textos y formatos de toda la aplicación.

## Referencias

- `docs/ui-guide.md`
- Criterio de evaluación: mensajes claros en la UI

## Contrato API

- Estados: `BOOKED`, `CANCELLED`, `ATTENDED`, `NO_SHOW`.

## Archivos permitidos

- `src/modules/**/pages/**`
- `src/modules/**/components/**`

## Reutilizar

- `StatusBadge`, `formatDate.js`, `EmptyState`.

## Fuera de alcance

- Cambiar lógica o estructura.
- Crear componentes nuevos.

## Criterios de aceptación

- [ ] Solo cambian textos y etiquetas.
- [ ] No hay mezcla de inglés y español.
- [ ] Fechas, horas y estados usan el formato común.
- [ ] Todos los campos tienen etiqueta.
- [ ] Las listas vacías explican qué hacer.

## Verificación

- Recorrer todas las pantallas con ambos roles.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Nombre del menú:** "Panel", no "Tablero".
- **Columna "Estado":** texto informativo (badge), nunca un botón.
- **Íconos:** tienen que tener sentido (un calendario para fechas, etc.). Se puede usar Lucide o Google Icons si se parecen a los del mockup; si no, el SVG como componente propio.
