# F34 · Navegación — Accesos y botones vacíos

| Campo            | Valor                |
| ---------------- | -------------------- |
| Responsable      | Fernando             |
| Revisión         | Tobías               |
| Etapa            | 3. Cierre            |
| Depende de       | F14, F18, F21, F33   |
| Repositorio      | frontend             |
| Rama             | `fix/f34-navegacion` |
| Tarjeta anterior | F29                  |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Conectar los accesos rápidos y retirar los controles sin función.

## Referencias

- Mockup: página 23
- Unidad 5: React Router (`ProtectedRoute`, `Navigate`, `Outlet`).

## Contrato API

- No aplica.

## Archivos permitidos

- `src/modules/dashboard/pages/OverviewPage.jsx`
- `src/modules/dashboard/components/DashboardLayout.jsx`
- `src/modules/patients/components/PatientLayout.jsx`
- `src/App.jsx`

## Reutilizar

- `NavLink` y `useNavigate`.

## Fuera de alcance

- Módulos de notificaciones, soporte o configuración.
- Refactors.

## Criterios de aceptación

- [ ] Agregar médico y especialidad abren su formulario.
- [ ] No queda ningún `alert` en `src/`.
- [ ] Se retiran los controles decorativos sin función.
- [ ] El menú marca la sección activa.
- [ ] Las rutas desconocidas tienen una salida coherente por rol.

## Verificación

- Recorrer todos los enlaces con ambos roles.
- `grep -rn "alert(" src` no devuelve resultados.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Nombre del menú:** el ítem se llama **"Panel"** (o "Panel principal"), no "Tablero" ni "Dashboard".
- **URLs:** en un solo idioma (inglés, como las actuales); no mezclar.
- **Protección por rol:** ya está en PR #20 (`ProtectedRoute` con `role`). No tocarla en esta tarea.
