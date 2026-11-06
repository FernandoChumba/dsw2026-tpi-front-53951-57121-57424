# F36 · UI — Ajuste de escritorio

| Campo            | Valor                         |
| ---------------- | ----------------------------- |
| Responsable      | Fernando                      |
| Revisión         | Tobías                        |
| Etapa            | 3. Cierre                     |
| Depende de       | F34, F35                      |
| Repositorio      | frontend                      |
| Rama             | `fix/f36-revision-escritorio` |
| Tarjeta anterior | F31                           |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Comparar cada pantalla con su mockup y corregir las diferencias.

## Referencias

- Mockups: páginas 23 a 28
- Unidad 4: Flexbox y Grid

## Contrato API

- No aplica.

## Archivos permitidos

- `src/modules/**/pages/**`
- `src/modules/**/components/**`
- `src/modules/shared/components/**`

## Reutilizar

- Tokens y componentes de `docs/ui-guide.md`.

## Fuera de alcance

- Datos inexistentes del mockup (ver decisiones en `docs/tasks/README.md`).
- Nuevas funciones.

## Criterios de aceptación

- [ ] Solo cambian clases de estilo.
- [ ] No hay elementos superpuestos ni textos cortados a 1366 px.
- [ ] El PR explica cada diferencia con el mockup que se mantiene.

## Verificación

- Adjuntar capturas a 1366 px de cada pantalla modificada.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
