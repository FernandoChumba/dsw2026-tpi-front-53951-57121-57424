# F11 · Acceso — Login de paciente con correo y DNI

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| Responsable      | Braian                    |
| Revisión         | Fernando                  |
| Etapa            | 1. Acceso                 |
| Depende de       | F06, F09                  |
| Repositorio      | frontend                  |
| Rama             | `feat/f11-login-paciente` |
| Tarjeta anterior | F05                       |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Conectar el login de paciente, sin contraseña, con registro automático.

## Referencias

- RF02
- RN06
- Mockup: página 28
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `POST /api/auth/patient/login`: `{ email, dni }`, con `dni` de 7 u 8 dígitos como texto.
- 401 si el correo y el DNI no coinciden; 429 a las 10 solicitudes por minuto.

## Archivos permitidos

- `src/modules/patients/pages/PatientLoginPage.jsx`
- `src/modules/auth/helpers/backendError.js`

## Reutilizar

- `Input`, `Button` y `FormMessage` de `shared`.
- `signInPatient` de `useAuth`.
- `apiError.js`.

## Fuera de alcance

- Pantallas de registro: el alta es automática.
- Enlaces a soporte, fuera del alcance.

## Criterios de aceptación

- [ ] No se pide contraseña.
- [ ] El correo debe ser válido y el DNI tener 7 u 8 dígitos.
- [ ] Un paciente nuevo entra en el primer acceso.
- [ ] El DNI queda disponible en la sesión.
- [ ] El login correcto lleva a `/`.
- [ ] Se elimina `backendError.js`, que usa códigos numéricos que el backend no devuelve.

## Verificación

- Probar paciente nuevo, paciente existente, DNI inválido y correo con otro DNI.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
