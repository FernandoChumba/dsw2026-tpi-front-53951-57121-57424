# F02 · Base — CI y template de PR

| Campo            | Valor                           |
| ---------------- | ------------------------------- |
| Responsable      | Braian                          |
| Revisión         | Fernando                        |
| Etapa            | 0. Base                         |
| Depende de       | Ninguna                         |
| Repositorio      | frontend                        |
| Rama             | `chore/f02-ci-y-template-de-pr` |
| Tarjeta anterior | Nueva                           |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Automatizar los controles de cada PR para que ningún cambio roto llegue a `main`.

## Referencias

- Guía del equipo: contenido obligatorio del PR
- Unidad 4: control de versiones y CI/CD

## Contrato API

- No aplica.

## Archivos permitidos

- `.github/workflows/frontend-ci.yml`
- `.github/pull_request_template.md`

## Reutilizar

- Scripts existentes de `package.json`: `build`, `lint`, `format:check`.

## Fuera de alcance

- Agregar tests o dependencias.
- Configurar despliegues.

## Criterios de aceptación

- [ ] El workflow corre en cada PR hacia `main` y ejecuta `npm ci`, `build`, `lint` y `format:check`.
- [ ] El template pide: tarjeta, qué se hizo, pasos de prueba, capturas y resultado de los tres comandos.
- [ ] Fernando, como dueño del repositorio, evalúa exigir el check y una aprobación para mergear en `main`.

## Verificación

- El check aparece en verde en el PR de esta tarea.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
