# F40 · Entrega — Build, lint y formato

| Campo            | Valor                            |
| ---------------- | -------------------------------- |
| Responsable      | Tobías                           |
| Revisión         | Braian                           |
| Etapa            | 3. Cierre                        |
| Depende de       | F39                              |
| Repositorio      | frontend                         |
| Rama             | `chore/f40-verificacion-entrega` |
| Tarjeta anterior | F35                              |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Dejar el proyecto sin errores de herramientas ni de consola.

## Referencias

- Criterio de evaluación: Calidad del código

## Contrato API

- No aplica.

## Archivos permitidos

- Solo los archivos que señalen `build`, `lint` o `format:check`.

## Reutilizar

- Scripts de `package.json`.

## Fuera de alcance

- Refactors y formateos ajenos a los errores detectados.

## Criterios de aceptación

- [ ] `npm run build`, `npm run lint` y `npm run format:check` terminan sin errores.
- [ ] No hay errores de consola en el circuito principal.

## Verificación

- Registrar el resultado de los tres comandos en el PR.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Evaluación:** el profe corre `lint` y `build` sobre el proyecto: no puede haber errores.
- **Revisión de patrones:** también va a revisar si se respetan los patrones (página → hook → service, Atomic Design, sin código duplicado).
