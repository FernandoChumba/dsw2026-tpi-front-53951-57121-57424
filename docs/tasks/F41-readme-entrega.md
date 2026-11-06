# F41 · Entrega — README

| Campo            | Valor                     |
| ---------------- | ------------------------- |
| Responsable      | Tobías                    |
| Revisión         | Braian                    |
| Etapa            | 3. Cierre                 |
| Depende de       | F39                       |
| Repositorio      | frontend                  |
| Rama             | `docs/f41-readme-entrega` |
| Tarjeta anterior | F36                       |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Completar el README que pide la entrega.

## Referencias

- Enunciado v1.7, página 30: entregables

## Contrato API

- Resumen de los endpoints que usa el frontend, tomado de `docs/api-contract.md`.

## Archivos permitidos

- `README.md`
- `package.json`
- `package-lock.json`

## Reutilizar

- `docs/dev-setup.md`: enlazarlo, sin copiarlo.

## Fuera de alcance

- Secretos o credenciales.
- Referencias a datos simulados.

## Criterios de aceptación

- [ ] Incluye datos de los integrantes, instrucciones de ejecución y descripción de endpoints.
- [ ] Se reemplaza el nombre `unidad-5` del proyecto.
- [ ] Un compañero levanta el proyecto siguiendo solo el README.
- [ ] Con F40 y F41 integradas, `development` se pasa a `main` por PR, y el README y la aplicación quedan listos en `main`.

## Verificación

- Otro integrante sigue el README desde un clon limpio.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
