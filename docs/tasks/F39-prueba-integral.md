# F39 · QA — Prueba del circuito completo

| Campo            | Valor                      |
| ---------------- | -------------------------- |
| Responsable      | Braian                     |
| Revisión         | Fernando                   |
| Etapa            | 3. Cierre                  |
| Depende de       | F36, F37, F38              |
| Repositorio      | frontend                   |
| Rama             | `docs/f39-prueba-integral` |
| Tarjeta anterior | F34                        |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Comprobar el sistema integrado contra el backend real.

## Referencias

- RF01 a RF09
- RN01 a RN06
- CU01 a CU03
- Criterio de evaluación: Funcionalidad (40%)

## Contrato API

- Toda la API: frontend y backend levantados.

## Archivos permitidos

- `docs/qa/circuito-completo.md`

## Reutilizar

- `docs/dev-setup.md` y `npm run seed:dev`.

## Fuera de alcance

- Corregir errores en este PR: cada defecto va a un PR propio, de su responsable.

## Criterios de aceptación

- [ ] Se ejecuta: administrador → especialidad → médico → disponibilidad → paciente nuevo → reservar → Mis turnos → cancelar → horario libre.
- [ ] Se prueba: acceso indebido, formularios inválidos, listas vacías, doble confirmación, conflicto de reserva y sesión vencida.
- [ ] Cada paso queda registrado con su resultado.
- [ ] Ningún defecto queda abierto sin responsable.

## Verificación

- Repetir el circuito sobre `main` actualizado después de corregir los defectos.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
