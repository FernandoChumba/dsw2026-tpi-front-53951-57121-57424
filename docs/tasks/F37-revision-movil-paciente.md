# F37 · UI — Revisión móvil del paciente

| Campo            | Valor                             |
| ---------------- | --------------------------------- |
| Responsable      | Tobías                            |
| Revisión         | Braian                            |
| Etapa            | 3. Cierre                         |
| Depende de       | F35                               |
| Repositorio      | frontend                          |
| Rama             | `fix/f37-revision-movil-paciente` |
| Tarjeta anterior | F32                               |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Verificar en móvil el flujo completo del paciente.

## Referencias

- RNF05
- Mockup: página 29
- Unidad 5: mobile-first

## Contrato API

- No aplica.

## Archivos permitidos

- `src/modules/patients/**`
- `src/modules/auth/**`

## Reutilizar

- Breakpoints de Tailwind: estilos base para móvil y `sm:`, `md:` hacia arriba.

## Fuera de alcance

- Nuevas funciones.
- Rediseños: cada tarea ya se construye mobile-first; esto es una pasada final.

## Criterios de aceptación

- [ ] Login, reserva, confirmación y Mis turnos funcionan a 360 px y 390 px.
- [ ] No hay desplazamiento horizontal de la página.
- [ ] Botones y campos se pueden usar con el dedo.

## Verificación

- Adjuntar capturas a 360 px y 390 px.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Responsive:** el paciente es la única parte que tiene que ser responsive (mobile-first).
- **Tablas:** en el celular pasan a listas o tarjetas.
- **Referencia:** el mockup p29 deja "Confirmar Turno" fijo abajo.
