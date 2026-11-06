# F12 · Acceso — Rutas por rol

| Campo            | Valor                    |
| ---------------- | ------------------------ |
| Responsable      | Braian                   |
| Revisión         | Fernando                 |
| Etapa            | 1. Acceso                |
| Depende de       | F09                      |
| Repositorio      | frontend                 |
| Rama             | `feat/f12-rutas-por-rol` |
| Tarjeta anterior | F08                      |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Impedir que cada rol abra las pantallas del otro.

## Referencias

- RN05
- Unidad 5: React Router (`ProtectedRoute`, `Navigate`, `Outlet`).

## Contrato API

- 403 `AUTHORIZATION_FAILED` si el backend rechaza el rol.

## Archivos permitidos

- `src/modules/auth/components/ProtectedRoute.jsx`
- `src/App.jsx`

## Reutilizar

- `role` de `useAuth`.
- Rutas declaradas en F05.

## Fuera de alcance

- Crear rutas nuevas.
- Considerarlo la seguridad del sistema: la valida el backend.

## Criterios de aceptación

- [ ] `ProtectedRoute` recibe el rol permitido.
- [ ] Sin sesión, redirige al login del área.
- [ ] Un paciente que escribe `/admin/...` vuelve a `/`.
- [ ] Un administrador que escribe `/` vuelve a `/admin/home`.
- [ ] En `App.jsx` solo cambia el rol pasado a `ProtectedRoute`.

## Verificación

- Probar cada combinación de rol y URL escribiéndola a mano.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
