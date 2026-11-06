# F26 · Reserva — Motivo y validación

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| Responsable      | Braian                    |
| Revisión         | Fernando                  |
| Etapa            | 2. Dominios               |
| Depende de       | F25                       |
| Repositorio      | frontend                  |
| Rama             | `feat/f26-reserva-motivo` |
| Tarjeta anterior | F22                       |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Pedir el motivo y mostrar el resumen antes de confirmar.

## Referencias

- CU01
- Enunciado v1.7, página 19
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `reason`: de 5 a 500 caracteres.

## Archivos permitidos

- `src/modules/patients/components/booking/**`

## Reutilizar

- `Textarea`, `Card`, `Button`.

## Fuera de alcance

- Enviar la reserva (F27).

## Criterios de aceptación

- [ ] No se puede confirmar sin médico, bloque y motivo válido.
- [ ] El resumen coincide con la selección.
- [ ] Los errores aparecen junto al campo.

## Verificación

- Probar motivo vacío, corto, largo y válido.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
