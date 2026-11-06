# F01 · Base — Guías del repositorio y mockups

| Campo            | Valor                         |
| ---------------- | ----------------------------- |
| Responsable      | Braian                        |
| Revisión         | Fernando                      |
| Etapa            | 0. Base                       |
| Depende de       | Ninguna                       |
| Repositorio      | frontend                      |
| Rama             | `docs/f01-guias-para-agentes` |
| Tarjeta anterior | Nueva                         |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Dejar en el repositorio las reglas y referencias que todo agente debe leer antes de trabajar.

## Referencias

- `DSW2026_TPI (1).pdf` v1.7, páginas 23 a 29 (mockups)
- Reglas de `docs/tasks/README.md`

## Contrato API

- Documentar en `docs/api-contract.md` todos los endpoints, errores y particularidades del backend (ver `docs/tasks/README.md`).

## Archivos permitidos

- `AGENTS.md`
- `CLAUDE.md`
- `docs/api-contract.md`
- `docs/ui-guide.md`
- `docs/mockups/*.png`

## Reutilizar

- Reglas de `docs/tasks/README.md`: `AGENTS.md` las resume y enlaza, sin copiarlas enteras.

## Fuera de alcance

- Código de `src/`.
- Subir el PDF completo del enunciado.
- Credenciales o tokens.

## Criterios de aceptación

- [ ] `AGENTS.md` tiene menos de 100 líneas e incluye comandos, stack cerrado, reglas y dueños por carpeta.
- [ ] `CLAUDE.md` contiene `@AGENTS.md` y nada más.
- [ ] `docs/api-contract.md` cubre todos los endpoints de `origin/development` del backend.
- [ ] Hay una imagen por cada mockup de las páginas 23 a 29, con nombre descriptivo.
- [ ] `docs/ui-guide.md` define dónde se documentan tokens y componentes; F06 completa el catálogo.

## Verificación

- Un agente nuevo encuentra comandos, contrato y mockup de una tarea leyendo solo `AGENTS.md`.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
