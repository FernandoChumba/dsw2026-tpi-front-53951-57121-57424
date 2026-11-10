# F38 · UI — Revisión móvil de administración y teclado

| Campo            | Valor                          |
| ---------------- | ------------------------------ |
| Responsable      | Fernando                       |
| Revisión         | Tobías                         |
| Etapa            | 3. Cierre                      |
| Depende de       | F35                            |
| Repositorio      | frontend                       |
| Rama             | `fix/f38-revision-movil-admin` |
| Tarjeta anterior | F33                            |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Verificar en móvil y con teclado las pantallas de administración.

## Referencias

- RNF05
- Unidad 5: mobile-first
- Unidad 4: accesibilidad

## Contrato API

- No aplica.

## Archivos permitidos

- `src/modules/dashboard/**`
- `src/modules/doctors/**`
- `src/modules/specialties/**`
- `src/modules/appointments/**`

## Reutilizar

- `DataTable` y `Modal`.

## Fuera de alcance

- Nuevas funciones.
- Rediseños.

## Criterios de aceptación

- [ ] Las tablas se consultan a 360 px, con desplazamiento dentro de la tabla.
- [ ] El menú funciona en móvil.
- [ ] Se puede tabular, ver el foco, guardar, cancelar y cerrar diálogos.

## Verificación

- Adjuntar capturas a 360 px y recorrer un formulario solo con teclado.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **⚠️ Cambio de alcance:** el profe dijo que el **admin no es responsive**. Se usa desde escritorio, notebook o, como mucho, tablet, con un mínimo de **600–700 px**. Por eso:
  - Ya no se revisa el admin en el celular.
  - Se verifica que las pantallas de admin funcionen bien desde **700 px** de ancho.
  - La parte de **teclado** sigue igual (foco visible, Escape en modales, navegación con Tab).
