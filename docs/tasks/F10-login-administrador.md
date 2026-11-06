# F10 · Acceso — Login de administrador

| Campo            | Valor                          |
| ---------------- | ------------------------------ |
| Responsable      | Braian                         |
| Revisión         | Fernando                       |
| Etapa            | 1. Acceso                      |
| Depende de       | F06, F09                       |
| Repositorio      | frontend                       |
| Rama             | `feat/f10-login-administrador` |
| Tarjeta anterior | F06                            |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Conectar el login de administrador y validar sus campos.

## Referencias

- RF01
- RNF01
- Mockup: página 23
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `POST /api/auth/admin/login`
- 401 `AUTHENTICATION_FAILED`, 400 `VALIDATION_ERROR`, 429 `RATE_LIMIT_EXCEEDED` (5 por minuto).

## Archivos permitidos

- `src/modules/auth/pages/AdminLoginPage.jsx`

## Reutilizar

- `Input`, `Button` y `FormMessage` de `shared`.
- `signInAdmin` de `useAuth`.
- `apiError.js`.

## Fuera de alcance

- Cambiar el diseño del mockup.
- Recuperación de contraseña.

## Criterios de aceptación

- [ ] El correo es obligatorio y debe ser válido; la contraseña, obligatoria y de al menos 8 caracteres.
- [ ] Credenciales incorrectas muestran un mensaje claro, sin detalles técnicos.
- [ ] El 429 muestra que hay que esperar.
- [ ] No se puede enviar dos veces en paralelo.
- [ ] El login correcto lleva a `/admin/home`.

## Verificación

- Probar caso válido, inválido, vacío y credenciales incorrectas.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
