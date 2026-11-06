# F05 · Base — Conexión con la API, errores y rutas

| Campo            | Valor                   |
| ---------------- | ----------------------- |
| Responsable      | Braian                  |
| Revisión         | Fernando                |
| Etapa            | 0. Base                 |
| Depende de       | Ninguna                 |
| Repositorio      | frontend                |
| Rama             | `feat/f05-base-tecnica` |
| Tarjeta anterior | Nueva                   |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Dejar lista la conexión con el backend y declaradas todas las rutas, para que `App.jsx` casi no vuelva a cambiar.

## Referencias

- Unidad 5: Screaming Architecture y SOLID (página → hook → service).
- Unidad 5: React Router (`ProtectedRoute`, `Navigate`, `Outlet`).
- Unidad 5: proxy de Vite
- Enunciado v1.7, página 21: formato de errores

## Contrato API

- Formato de error: `{ errorCode, message, details }`.
- 401 en `/api/auth/**/login` significa credenciales inválidas, no sesión vencida.

## Archivos permitidos

- `src/App.jsx`
- `src/modules/shared/api/axiosInstance.js`
- `src/modules/shared/helpers/apiError.js`
- `src/modules/dashboard/components/DashboardLayout.jsx`
- `src/modules/specialties/pages/SpecialtyFormPage.jsx`
- `src/modules/doctors/pages/DoctorFormPage.jsx`
- `src/modules/doctors/pages/DoctorAvailabilityPage.jsx`
- `.env.development`
- `vite.config.js`

## Reutilizar

- Instancia `axios` e interceptores existentes.
- Proxy `/api` de `vite.config.js`.

## Fuera de alcance

- Implementar pantallas: las páginas nuevas son solo un título.
- Cambiar diseño.
- Lógica de sesión (F09).

## Criterios de aceptación

- [ ] `axios` usa rutas relativas y pasa por el proxy; `VITE_BACKEND_URL` solo configura el destino del proxy.
- [ ] Se quita `withCredentials`, porque la sesión usa token.
- [ ] `apiError.js` traduce cada `errorCode` del backend a un mensaje en español y expone los `details`.
- [ ] Un 401 en login no redirige; un 401 en otra ruta limpia la sesión y redirige al login del área correspondiente.
- [ ] El router se crea fuera del componente `App`.
- [ ] Rutas declaradas: `/admin/specialties/new`, `/admin/specialties/:id/edit`, `/admin/doctors/new`, `/admin/doctors/:id/edit`, `/admin/doctors/availability` y `/admin/appointments`.
- [ ] Se eliminan los duplicados `/admin/patients` y `/admin/patient-search`, y el menú apunta a `/admin/appointments`.

## Verificación

- Con el backend levantado, una petición desde el navegador llega al backend sin error de CORS.
- Cada ruta nueva muestra su título.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
