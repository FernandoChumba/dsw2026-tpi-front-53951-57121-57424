# F04 · Base — Datos de prueba por API

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| Responsable      | Braian                      |
| Revisión         | Fernando                    |
| Etapa            | 0. Base                     |
| Depende de       | F03                         |
| Repositorio      | frontend                    |
| Rama             | `chore/f04-datos-de-prueba` |
| Tarjeta anterior | Nueva (reemplaza F01 y F02) |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Permitir que cualquier integrante cargue datos reales de desarrollo con un solo comando.

## Referencias

- CU02
- RN02
- `docs/api-contract.md`

## Contrato API

- `POST /api/auth/admin/login`, `POST /api/auth/patient/login`
- `GET/POST /api/specialties`, `GET/POST /api/doctors`
- `GET /api/doctors/{id}/availabilities`, `POST/PUT /api/availabilities`
- `GET /api/availability-slots`, `POST /api/appointments`

## Archivos permitidos

- `scripts/seed-dev.mjs`
- `package.json`
- `docs/dev-setup.md`

## Reutilizar

- `fetch` nativo de Node; no agregar dependencias.

## Fuera de alcance

- Código de `src/`.
- Guardar credenciales en el repositorio.
- Tocar la base de datos directamente.

## Criterios de aceptación

- [ ] `npm run seed:dev` crea especialidades, médicos, disponibilidad, un paciente y una reserva.
- [ ] Las credenciales de administrador se leen de variables de entorno; si faltan, termina con un mensaje claro.
- [ ] Ejecutarlo dos veces no duplica datos.
- [ ] Si no hay bloques para el resto del mes, lo informa y no reserva.
- [ ] `docs/dev-setup.md` explica cómo levantar backend y frontend desde cero con `VITE_BACKEND_URL=http://localhost:5278`.

## Verificación

- Probar el script dos veces sobre una base vacía.
- Otro integrante levanta todo siguiendo `docs/dev-setup.md`.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
