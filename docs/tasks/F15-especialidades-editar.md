# F15 · Especialidades — Editar

| Campo            | Valor                            |
| ---------------- | -------------------------------- |
| Responsable      | Tobías                           |
| Revisión         | Braian                           |
| Etapa            | 2. Dominios                      |
| Depende de       | F14                              |
| Repositorio      | frontend                         |
| Rama             | `feat/f15-especialidades-editar` |
| Tarjeta anterior | F10                              |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Reutilizar el formulario para editar una especialidad existente.

## Referencias

- Mockup: página 26
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `GET /api/specialties/{id}`
- `PUT /api/specialties/{id}`: `{ name, description }` → 200.
- 404 `ENTITY_NOTFOUND`.

## Archivos permitidos

- `src/modules/specialties/pages/SpecialtyFormPage.jsx`
- `src/modules/specialties/components/SpecialtyForm.jsx`
- `src/modules/specialties/services/getSpecialty.js`
- `src/modules/specialties/services/updateSpecialty.js`

## Reutilizar

- `SpecialtyForm` de F14: no duplicar el formulario.

## Fuera de alcance

- Cambios en el listado.
- Eliminación.

## Criterios de aceptación

- [ ] El formulario se precarga también al abrir la URL directamente.
- [ ] Guardar actualiza sin duplicar.
- [ ] Cancelar no cambia datos.
- [ ] Un ID inexistente muestra un mensaje y una salida al listado.

## Verificación

- Probar edición válida, inválida, cancelar e ID inexistente.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Misma página que el alta:** `SpecialtyFormPage` con `key={id ?? 'new'}`, igual que `DoctorFormPage`.
- **Datos:** el `GET` y el `PUT` van en `useSpecialtyForm`, no en la página.
- **Id inexistente (404):** mostrar el mensaje y el enlace "Volver al listado", como en médicos.
