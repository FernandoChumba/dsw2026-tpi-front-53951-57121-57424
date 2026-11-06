# F20 · Médicos — Eliminar

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| Responsable      | Fernando                    |
| Revisión         | Tobías                      |
| Etapa            | 2. Dominios                 |
| Depende de       | F07, F17                    |
| Repositorio      | frontend                    |
| Rama             | `feat/f20-medicos-eliminar` |
| Tarjeta anterior | F15                         |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Reemplazar el `alert` por una baja lógica confirmada.

## Referencias

- Enunciado v1.7, página 17

## Contrato API

- `DELETE /api/doctors/{id}` → 200 con texto `ok`: no tratarlo como JSON.
- 404 `ENTITY_NOTFOUND`.

## Archivos permitidos

- `src/modules/doctors/pages/DoctorsPage.jsx`
- `src/modules/doctors/services/deleteDoctor.js`

## Reutilizar

- `ConfirmDialog` y `FormMessage`.

## Fuera de alcance

- Reglas de bloqueo que el backend no aplica (ver decisiones en `docs/tasks/README.md`).

## Criterios de aceptación

- [ ] Cancelar conserva la fila.
- [ ] Confirmar la quita y actualiza el total.
- [ ] Si era la última fila de la página, muestra una página válida.

## Verificación

- Probar cancelar, confirmar y eliminar la última fila de una página.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
