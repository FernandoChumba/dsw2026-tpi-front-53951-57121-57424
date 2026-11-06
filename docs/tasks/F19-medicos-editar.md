# F19 · Médicos — Editar

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| Responsable      | Fernando                  |
| Revisión         | Tobías                    |
| Etapa            | 2. Dominios               |
| Depende de       | F03, F18                  |
| Repositorio      | frontend                  |
| Rama             | `feat/f19-medicos-editar` |
| Tarjeta anterior | F14                       |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Reutilizar el formulario para editar un médico existente.

## Referencias

- Mockup: página 24
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `GET /api/doctors/{id}` (agregado en F03).
- `PUT /api/doctors/{id}`: mismo cuerpo que el alta → 200.
- 404 `ENTITY_NOTFOUND`.

## Archivos permitidos

- `src/modules/doctors/pages/DoctorFormPage.jsx`
- `src/modules/doctors/components/DoctorForm.jsx`
- `src/modules/doctors/services/getDoctor.js`
- `src/modules/doctors/services/updateDoctor.js`

## Reutilizar

- `DoctorForm` de F18: no duplicar el formulario.

## Fuera de alcance

- Cambios en el listado.
- Eliminación.

## Criterios de aceptación

- [ ] El formulario se precarga también al abrir la URL directamente.
- [ ] Guardar cambia solo ese médico.
- [ ] Cancelar no cambia datos.
- [ ] Un ID inexistente muestra una salida al listado.

## Verificación

- Probar edición válida, inválida, cancelar e ID inexistente.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
