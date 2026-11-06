# F09 · Acceso — Sesión real con JWT

| Campo            | Valor                  |
| ---------------- | ---------------------- |
| Responsable      | Braian                 |
| Revisión         | Fernando               |
| Etapa            | 1. Acceso              |
| Depende de       | F05                    |
| Repositorio      | frontend               |
| Rama             | `feat/f09-sesion-real` |
| Tarjeta anterior | F07                    |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Reemplazar la sesión simulada por la sesión real, con token, rol y DNI.

## Referencias

- RF01
- RF02
- RNF01
- Unidad 5: `AuthProvider`, `useAuth`
- Unidad 4: `localStorage`

## Contrato API

- `POST /api/auth/admin/login`: `{ email, password }` → `{ token, role }`.
- `POST /api/auth/patient/login`: `{ email, dni }`, con `dni` como texto → `{ token, role }`.
- `POST /api/auth/logout`: revoca el token y responde 200.
- Roles de respuesta: `ADMINISTRADOR`, `PACIENTE`.
- El JWT no incluye DNI: hay que guardarlo desde el login.

## Archivos permitidos

- `src/modules/auth/context/AuthProvider.jsx`
- `src/modules/auth/hook/useAuth.js`
- `src/modules/auth/services/adminLogin.js`
- `src/modules/auth/services/patientLogin.js`
- `src/modules/auth/services/logout.js`
- `src/modules/auth/services/login.js`
- `src/modules/auth/pages/LoginPage.jsx`
- `src/modules/auth/components/LoginForm.jsx`
- `src/modules/auth/pages/AdminLoginPage.jsx`
- `src/modules/patients/pages/PatientLoginPage.jsx`
- `src/modules/patients/components/PatientLayout.jsx`
- `src/modules/dashboard/components/DashboardLayout.jsx`

## Reutilizar

- `axiosInstance` y `apiError.js` de F05.
- Carpeta `auth/hook`, tal como la define la Unidad 5.

## Fuera de alcance

- Validaciones de formulario (F10 y F11).
- Protección por rol (F12).
- Refresh token.

## Criterios de aceptación

- [ ] No queda ninguna credencial ni token simulado en el código.
- [ ] Se eliminan `LoginPage`, `LoginForm` y `services/login.js`, que no se usan.
- [ ] `useAuth` expone `isAuthenticated`, `role`, `dni`, `signInAdmin`, `signInPatient` y `signOut`, sin el error de tipeo `singin`.
- [ ] En los demás archivos de la lista solo cambian esas llamadas.
- [ ] La sesión sobrevive a recargar la página.
- [ ] `signOut` llama a logout y limpia solo las claves de sesión, aunque la petición falle.

## Verificación

- Login y logout reales de ambos roles.
- Después del logout, el token anterior recibe 401.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
