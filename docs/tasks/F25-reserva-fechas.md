# F25 · Reserva — Buscar disponibilidad y navegar fechas

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| Responsable      | Braian                    |
| Revisión         | Fernando                  |
| Etapa            | 2. Dominios               |
| Depende de       | F24                       |
| Repositorio      | frontend                  |
| Rama             | `feat/f25-reserva-fechas` |
| Tarjeta anterior | F21                       |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Mostrar los bloques reales por fecha y permitir elegir uno.

## Referencias

- RF06
- RN04
- CU01 pasos 4 y 5, flujos 4a y 4b
- Mockups: páginas 28 y 29

## Contrato API

- `GET /api/availability-slots`: devuelve solo bloques libres y futuros, sin paginar.

## Archivos permitidos

- `src/modules/patients/components/booking/**`
- `src/modules/patients/hooks/useAvailableSlots.js`

## Reutilizar

- `Button`, `EmptyState`, `formatDate.js`.

## Fuera de alcance

- Librerías de calendario.
- Filtrar por pasado en el frontend: lo hace el backend.

## Criterios de aceptación

- [ ] Las flechas cambian realmente de período.
- [ ] No quedan fechas fijas.
- [ ] Un día sin bloques muestra "Sin disponibilidad".
- [ ] Elegir un bloque lo resalta y actualiza el resumen.

## Verificación

- Probar médico con bloques y sin bloques.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
