# F18 · Médicos — Crear

| Campo            | Valor                    |
| ---------------- | ------------------------ |
| Responsable      | Fernando                 |
| Revisión         | Tobías                   |
| Etapa            | 2. Dominios              |
| Depende de       | F03, F17                 |
| Repositorio      | frontend                 |
| Rama             | `feat/f18-medicos-crear` |
| Tarjeta anterior | F13                      |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Dar de alta médicos desde el formulario del mockup.

## Referencias

- RF03
- Mockup: página 24
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `POST /api/doctors`: `{ name, licenseNumber, specialtyId }` → 201.
- `name` de 3 a 100 caracteres; `licenseNumber` y `specialtyId` obligatorios.
- `GET /api/specialties` para el selector.

## Archivos permitidos

- `src/modules/doctors/pages/DoctorFormPage.jsx`
- `src/modules/doctors/components/DoctorForm.jsx`
- `src/modules/doctors/services/createDoctor.js`

## Reutilizar

- `Input`, `Select`, `Button`, `FormMessage`.
- `specialties/services/getSpecialties.js`, solo para leer.

## Fuera de alcance

- Modificar el módulo de especialidades.
- Edición (F19).

## Criterios de aceptación

- [ ] El selector usa especialidades reales y avisa si no hay ninguna.
- [ ] Los errores bloquean el envío.
- [ ] Guardar vuelve al listado con mensaje de éxito.
- [ ] Cancelar no crea nada.
- [ ] No se puede enviar dos veces.

## Verificación

- Probar caso válido, vacío, inválido y cancelar.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
