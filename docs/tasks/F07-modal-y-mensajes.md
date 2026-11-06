# F07 · UI — Modal, confirmación y mensajes

| Campo            | Valor                       |
| ---------------- | --------------------------- |
| Responsable      | Fernando                    |
| Revisión         | Tobías                      |
| Etapa            | 0. Base                     |
| Depende de       | F06                         |
| Repositorio      | frontend                    |
| Rama             | `feat/f07-modal-y-mensajes` |
| Tarjeta anterior | F03                         |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Crear los diálogos y mensajes que reemplazan todos los `alert` de la aplicación.

## Referencias

- Unidad 5: Atomic Design y Tailwind mobile-first.
- Unidad 4: eventos de teclado
- Enunciado v1.7: claridad en respuestas y errores

## Contrato API

- No aplica.

## Archivos permitidos

- `src/modules/shared/components/Modal.jsx`
- `src/modules/shared/components/ConfirmDialog.jsx`
- `src/modules/shared/components/FormMessage.jsx`
- `docs/ui-guide.md`

## Reutilizar

- `Button` y tokens de `shared`.

## Fuera de alcance

- Reemplazar `alert` en páginas: lo hace cada tarea de dominio.
- Librerías de diálogos o notificaciones.

## Criterios de aceptación

- [ ] `Modal` toma el foco al abrirse, cierra con Escape y devuelve el foco al elemento anterior.
- [ ] `ConfirmDialog` ejecuta la acción una sola vez y deshabilita el botón mientras está en curso.
- [ ] Cancelar no ejecuta la acción.
- [ ] `FormMessage` muestra éxito y error con texto legible, no solo con color.

## Verificación

- Probar los tres componentes solo con teclado.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.
