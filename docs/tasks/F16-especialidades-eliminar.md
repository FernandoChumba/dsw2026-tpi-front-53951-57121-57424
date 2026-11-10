# F16 · Especialidades — Eliminar

| Campo            | Valor                              |
| ---------------- | ---------------------------------- |
| Responsable      | Tobías                             |
| Revisión         | Braian                             |
| Etapa            | 2. Dominios                        |
| Depende de       | F07, F13                           |
| Repositorio      | frontend                           |
| Rama             | `feat/f16-especialidades-eliminar` |
| Tarjeta anterior | F11                                |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Reemplazar el `alert` por una baja lógica confirmada.

## Referencias

- Enunciado v1.7, página 15
- Unidad 5: comunicación entre componentes

## Contrato API

- `DELETE /api/specialties/{id}` → 200 con texto `ok`: no tratarlo como JSON.
- 404 `ENTITY_NOTFOUND`.

## Archivos permitidos

- `src/modules/specialties/pages/SpecialtiesPage.jsx`
- `src/modules/specialties/services/deleteSpecialty.js`

## Reutilizar

- `ConfirmDialog` y `FormMessage`.

## Fuera de alcance

- Reglas de bloqueo que el backend no aplica (ver decisiones en `docs/tasks/README.md`).

## Criterios de aceptación

- [ ] Cancelar conserva la fila.
- [ ] Confirmar la quita y actualiza el total.
- [ ] Si era la última fila de la página, muestra una página válida.
- [ ] No quedan `alert` en la página.

## Verificación

- Probar cancelar, confirmar y eliminar la última fila de una página.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Baja lógica:** la hace el backend ("no hagas un delete, hacé un update"). El front solo llama al `DELETE`.
- **Dónde va la llamada:** en el hook (`removeSpecialty` en `useSpecialties`), igual que `removeDoctor` en `useDoctors` (PR #20). La página solo confirma con `ConfirmDialog` y muestra el aviso.
- **Archivos permitidos:** sumar `src/modules/specialties/hooks/useSpecialties.js`.
