# F22 · Disponibilidad — Validar y guardar

| Campo            | Valor                             |
| ---------------- | --------------------------------- |
| Responsable      | Fernando                          |
| Revisión         | Tobías                            |
| Etapa            | 2. Dominios                       |
| Depende de       | F21                               |
| Repositorio      | frontend                          |
| Rama             | `feat/f22-disponibilidad-guardar` |
| Tarjeta anterior | F19                               |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Validar el horario y enviarlo: el backend genera los bloques de 30 minutos.

## Referencias

- CU02
- RN01
- RN02
- Enunciado v1.7, página 18
- Unidad 5: React Hook Form (`useForm`, `register`, errores debajo del campo).

## Contrato API

- `POST /api/availabilities` si no hay carga; `PUT /api/availabilities` si ya existe.
- Cuerpo: `{ doctorId, days: [{ day, startTime, endTime }] }`, con horas `HH:mm`.
- Horas en múltiplos de 30 minutos y un rango por día.
- 409 `AVAILABILITY_DUPLICATE_DAY`, 400 `AVAILABILITY_VALIDATION`, 503 `AVAILABILITY_CALENDAR_UNAVAILABLE`.

## Archivos permitidos

- `src/modules/doctors/components/AvailabilityForm.jsx`
- `src/modules/doctors/services/saveDoctorAvailability.js`
- `src/modules/doctors/hooks/useDoctorAvailability.js`

## Reutilizar

- `apiError.js` y `FormMessage`.

## Fuera de alcance

- Generar bloques o calcular feriados en el frontend: lo hace el backend.

## Criterios de aceptación

- [ ] Entrada anterior a salida, en múltiplos de 30 minutos.
- [ ] Un día habilitado sin horario bloquea el envío.
- [ ] Se elige POST o PUT según la carga existente.
- [ ] Guardar muestra éxito.
- [ ] Editar no borra reservas existentes: lo garantiza el backend y se comprueba en la prueba.

## Verificación

- Guardar y comprobar los bloques en `GET /api/availability-slots`.
- Editar con una reserva activa y comprobar que sigue.
- Ejecutar `npm run build`, `npm run lint` y `npm run format:check` y registrar el resultado en el PR.

## Aclaraciones del profe (consultas de noviembre)

- **Mensaje de éxito arriba** del formulario: el profe aprobó "Disponibilidad horaria configurada con éxito".
- **Dónde va la llamada:** el `POST`/`PUT` va en el hook (`useDoctorAvailability`), no en la página.
- **Página propia:** la pantalla sigue siendo una página con el médico elegido por URL (`?doctorId=`), no un modal. Ya está así.
