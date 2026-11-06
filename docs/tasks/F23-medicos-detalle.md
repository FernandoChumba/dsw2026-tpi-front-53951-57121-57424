# F23 · Médicos — Detalle y acceso a disponibilidad

| Campo            | Valor                      |
| ---------------- | -------------------------- |
| Responsable      | Fernando                   |
| Revisión         | Tobías                     |
| Etapa            | 2. Dominios                |
| Depende de       | F07, F21                   |
| Repositorio      | frontend                   |
| Rama             | `feat/f23-medicos-detalle` |
| Tarjeta anterior | F16                        |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Reemplazar el `alert` de detalle por un modal.

## Referencias

- Mockup: página 24
- Unidad 5: props

## Contrato API

- Usa los datos de la fila; no requiere otra petición.

## Archivos permitidos

- `src/modules/doctors/pages/DoctorsPage.jsx`
- `src/modules/doctors/components/DoctorDetailModal.jsx`

## Reutilizar

- `Modal`.

## Fuera de alcance

- Datos que el backend no tiene.

## Criterios de aceptación

- [ ] Muestra nombre, matrícula y especialidad del médico elegido.
- [ ] Cierra con botón y Escape.
- [ ] El enlace lleva a `/admin/doctors/availability?doctorId=...`.
- [ ] No quedan `alert` en la página.

## Verificación

- Abrir el detalle de varios médicos y navegar a disponibilidad.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
