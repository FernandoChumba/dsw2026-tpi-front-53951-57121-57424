# F14 · Especialidades — Crear

| Campo            | Valor                           |
| ---------------- | ------------------------------- |
| Responsable      | Tobías                          |
| Revisión         | Braian                          |
| Etapa            | 2. Dominios                     |
| Depende de       | F13                             |
| Repositorio      | frontend                        |
| Rama             | `feat/f14-especialidades-crear` |
| Tarjeta anterior | F09                             |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Dar de alta especialidades desde el formulario del mockup.

## Referencias

- RF04
- Mockup: página 26
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `POST /api/specialties`: `{ name, description }` → 201.
- `name` de 3 a 100 caracteres; `description` de 10 a 100.

## Archivos permitidos

- `src/modules/specialties/pages/SpecialtyFormPage.jsx`
- `src/modules/specialties/components/SpecialtyForm.jsx`
- `src/modules/specialties/services/createSpecialty.js`

## Reutilizar

- `Input`, `Textarea`, `Button`, `FormMessage`, `PageHeader`.
- `apiError.js`.

## Fuera de alcance

- Campo "Estado inicial" del mockup: no existe en el backend.
- Edición (F15).

## Criterios de aceptación

- [ ] Los errores bloquean el envío y aparecen debajo del campo.
- [ ] Guardar crea la especialidad y vuelve al listado con mensaje de éxito.
- [ ] Cancelar vuelve sin crear nada.
- [ ] Los errores del backend se muestran sin detalles técnicos.
- [ ] No se puede enviar dos veces.

## Verificación

- Probar caso válido, vacío, inválido y cancelar.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Página propia** con URL (`/admin/specialties/new`), no un modal: "el mockup siempre es tu base".
- **"Estado inicial" del mockup:** el backend no lo tiene, no agregarlo.
- **Patrón a seguir:** el de médicos. `useSpecialtyForm` hace la carga y el guardado; `SpecialtyForm` es el formulario con React Hook Form, con el error del backend debajo del campo. Ver `doctors/hooks/useDoctorForm.js` y `doctors/components/DoctorForm.jsx` (PR #20).
- **Archivos permitidos:** sumar `src/modules/specialties/hooks/useSpecialtyForm.js`. La página no llama a services directo.
