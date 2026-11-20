# QA — Circuito completo (F39)

Prueba del frontend integrado con el backend real, sobre `development` actualizada. La referencia es la versión 1.4 del enunciado (18/11/2026) y `docs/enunciado-17-nov.md`.

## Preparación

1. Levantar el backend y el frontend según `docs/dev-setup.md`.
2. Partir de una base vacía para que el circuito cree sus propios datos. `npm run seed:dev` solo se usa para pruebas parciales.
3. Tener dos navegadores o una ventana privada para los casos con dos sesiones.
4. Anotar el commit de `development` en la tabla de ejecuciones.

## Cómo registrar

- **Resultado:** ✅ funciona, ⚠️ funciona con una observación, ❌ falla, ⏳ pendiente.
- Cada ❌ se anota en la tabla de defectos con su responsable y la tarjeta o PR que lo corrige. Los defectos no se corrigen en este PR.

## Ejecuciones

| Fecha      | Commit de `development` | Quién  | Resultado general                                                                                                                                             |
| ---------- | ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 18/11/2026 | `2648f66`               | Braian | Parcial, con flujo automatizado sobre base vacía: circuito principal y casos de error completos. Pendiente la validación final después de F44, F45, F49 y F50 |
| 20/11/2026 | `825c0ef`               | Braian | Final, con flujo automatizado sobre base vacía y backend `2dc291d`: A, B, C y D completos sin ❌. Observaciones menores en B14, D y la tabla de abajo         |

## A. Circuito principal

Orden pedido por la tarea: administrador → especialidad → médico → disponibilidad → paciente nuevo → reservar → Mis turnos → cancelar → horario libre.

| ID  | Paso                                                                                    | Resultado esperado                                                                  | Ref.             | Resultado |
| --- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------- | --------- |
| A01 | Ingresar en `/admin/login` con el administrador inicial                                 | Lleva a `/admin/home` con el panel y sus indicadores                                | RF01, RN05       | ✅        |
| A02 | Crear una especialidad con nombre y descripción                                         | "Especialidad registrada correctamente." y aparece en el listado                    | RF04             | ✅        |
| A03 | Crear un médico con nombre, matrícula y la especialidad nueva                           | "Médico registrado correctamente." y aparece en el directorio                       | RF03             | ✅        |
| A04 | Cargar disponibilidad del médico para al menos tres días hábiles                        | Se guarda sin errores y queda visible al volver a abrir la pantalla                 | RF05, CU02       | ✅        |
| A05 | Cerrar sesión e ingresar en `/login` con un correo y DNI nuevos                         | El paciente se registra solo y entra a "Reservar Turno Médico"                      | RF02, RN06       | ✅        |
| A06 | Elegir la especialidad y el médico nuevos y presionar "Buscar Disponibilidad"           | Aparecen el médico y la semana con bloques de 30 minutos dentro del horario cargado | RF06, RN01, RN02 | ✅        |
| A07 | Elegir un horario, escribir el motivo y presionar "Confirmar Turno"                     | Modal "Turno confirmado" con "Tu turno se reservó con éxito."                       | RF07, CU01       | ✅        |
| A08 | Ir a "Mis Turnos"                                                                       | El turno aparece con especialidad, médico, fecha, hora y estado                     | Actor Paciente   | ✅        |
| A09 | Volver a la reserva con el mismo médico                                                 | El horario reservado ya no aparece                                                  | RN03             | ✅        |
| A10 | En "Mis Turnos", cancelar el turno y confirmar                                          | "El turno se canceló correctamente." y el turno sale de los activos                 | RF08, CU03       | ✅        |
| A11 | Volver a la reserva con el mismo médico                                                 | El horario cancelado vuelve a estar disponible                                      | CU03             | ✅        |
| A12 | Ingresar como administrador y buscar en "Búsqueda de Pacientes" por el DNI del paciente | Aparecen sus turnos, con el cancelado en estado cancelado                           | RF09             | ✅        |
| A13 | Combinar filtros de especialidad, médico y fecha en la búsqueda                         | El resultado respeta todos los filtros y la paginación funciona                     | RF09             | ✅        |

## B. Casos de error

| ID  | Caso                       | Paso                                                                                       | Resultado esperado                                                                                                     | Resultado |
| --- | -------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | --------- |
| B01 | Acceso indebido sin sesión | Abrir `/admin/home` y `/appointments` sin haber iniciado sesión                            | Redirige a `/admin/login` y a `/login`                                                                                 | ✅        |
| B02 | Acceso indebido por rol    | Con sesión de paciente, abrir `/admin/home`; con sesión de administrador, abrir `/`        | Cada rol vuelve a su propia página de inicio                                                                           | ✅        |
| B03 | Login de administrador     | Contraseña incorrecta                                                                      | "Usuario y/o contraseña no son correctos."                                                                             | ✅        |
| B04 | Login de paciente          | Correo ya registrado con otro DNI                                                          | "El DNI no coincide con el del correo ingresado."                                                                      | ✅        |
| B05 | Demasiados intentos        | Repetir el login de administrador con error más de 5 veces en un minuto                    | "Hiciste demasiados intentos. Esperá un minuto y volvé a probar."                                                      | ✅        |
| B06 | Formularios inválidos      | Enviar vacíos los logins y los formularios de especialidad y médico                        | Mensaje debajo de cada campo, sin llamar a la API                                                                      | ✅        |
| B07 | Disponibilidad inválida    | Salida anterior a la entrada; horario fuera de intervalos de 30 minutos; ningún día activo | "La salida debe ser posterior a la entrada.", "Usá intervalos de 30 minutos.", "Habilitá al menos un día de atención." | ✅        |
| B08 | Motivo inválido            | Confirmar un turno sin motivo o con menos de 5 caracteres                                  | "Ingresá el motivo de la consulta." o el mensaje de longitud mínima                                                    | ✅        |
| B09 | Listas vacías              | Paciente sin turnos; búsqueda de especialidad sin resultados; médico sin disponibilidad    | "No tenés turnos activos", "No se encontraron especialidades.", "Sin disponibilidad"                                   | ✅        |
| B10 | Búsqueda corta             | Buscar médicos o especialidades con menos de 3 caracteres                                  | "Ingresá al menos 3 caracteres para buscar."                                                                           | ✅        |
| B11 | Doble confirmación         | Hacer doble clic rápido en "Confirmar Turno"                                               | Se crea un solo turno                                                                                                  | ✅        |
| B12 | Conflicto de reserva       | Dos pacientes en navegadores distintos eligen el mismo horario y confirman                 | El segundo ve el modal "Horario no disponible" y puede actualizar los horarios                                         | ✅        |
| B13 | Sesión vencida             | Con sesión iniciada, alterar el token guardado en el navegador y navegar                   | Se borra la sesión y vuelve al login del área                                                                          | ✅        |
| B14 | Reservas en el pasado      | En la reserva, intentar ir a una semana anterior a la actual                               | La flecha está deshabilitada y no se muestran horarios pasados                                                         | ✅ OBS-01 |
| B15 | Servidor caído             | Detener el backend y recargar una pantalla con datos                                       | "No se pudo conectar con el servidor. Revisá tu conexión." y, donde corresponde, botón "Reintentar"                    | ✅ DEF-02 |

## C. Flujos obligatorios de la versión 1.4

| ID  | Pantalla                  | Aclaración del profesor                     | Paso                                               | Resultado esperado                                             | Resultado         |
| --- | ------------------------- | ------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------- | ----------------- |
| C01 | Página principal          | "Ver detalle lleva a la página de doctores" | Usar el acceso a médicos desde la página principal | Lleva a "Directorio de médicos"                                | ✅ enlace general |
| C02 | Listado de médicos        | "Borrado lógico si es obligatorio."         | Eliminar un médico y confirmar                     | "Médico eliminado correctamente." y deja de listarse           | ✅                |
| C03 | Listado de especialidades | "Eliminar si es obligatorio."               | Eliminar una especialidad y confirmar              | "La especialidad se eliminó correctamente." y deja de listarse | ✅                |

## D. Mockups y tamaños de pantalla

Comparar con `docs/mockups/`. Paciente a 1366, 390 y 360 px; administración a 1366 y 700 px.

| ID  | Pantalla                         | Mockup                                                             | Anchos         | Resultado |
| --- | -------------------------------- | ------------------------------------------------------------------ | -------------- | --------- |
| D01 | Admin: login                     | `p21-admin-login.png`                                              | 1366, 700      | ✅        |
| D02 | Admin: página principal          | `p21-admin-principal.png`                                          | 1366, 700      | ✅ DEF-01 |
| D03 | Admin: listado de médicos        | `p22-admin-medicos-listado.png`                                    | 1366, 700      | ⚠️ OBS-03 |
| D04 | Admin: crear médico              | `p22-admin-medicos-crear.png`                                      | 1366, 700      | ✅        |
| D05 | Admin: disponibilidad horaria    | `p23-admin-disponibilidad.png`                                     | 1366, 700      | ✅        |
| D06 | Admin: listado de especialidades | `p23-admin-especialidades-listado.png`                             | 1366, 700      | ✅ OBS-04 |
| D07 | Admin: crear especialidad        | `p24-admin-especialidades-crear.png`                               | 1366, 700      | ✅        |
| D08 | Admin: búsqueda avanzada         | `p24-admin-busqueda.png`                                           | 1366, 700      | ⚠️ OBS-03 |
| D09 | Paciente: login                  | `p25-paciente-login.png`                                           | 1366, 390, 360 | ✅        |
| D10 | Paciente: reserva                | `p25-paciente-reserva.png`, `p27-paciente-movil-reserva.png`       | 1366, 390, 360 | ✅        |
| D11 | Paciente: Mis turnos             | `p26-paciente-mis-turnos.png`, `p28-paciente-movil-mis-turnos.png` | 1366, 390, 360 | ✅        |

En cada pantalla revisar también el uso con teclado: orden del foco, foco visible y cierre de modales con Escape.

Ejecución del 20/11: ninguna pantalla tiene scroll horizontal en los anchos indicados. Escape cierra el diálogo de confirmación; el modal "Turno confirmado" no se cierra a propósito (OBS-02). El menú móvil del paciente tiene nombre, estado y foco visible desde F50. Las diferencias de contenido sin respaldo en el backend (estado de médicos y especialidades, avatares, clínica, "Estado inicial") y el recuadro de credenciales de prueba se omiten según las decisiones del equipo en `docs/enunciado-17-nov.md`.

## F. Validación de inputs

Se revisa que cada campo limite lo que se puede escribir, no solo lo que se puede enviar.

| ID  | Campo                                 | Regla actual en el front                      | Regla en el backend              | Observación                                     | Resultado |
| --- | ------------------------------------- | --------------------------------------------- | -------------------------------- | ----------------------------------------------- | --------- |
| F01 | DNI del login de paciente             | 7 u 8 números al enviar                       | 7 u 8 dígitos                    | Se pueden escribir letras y más de 8 caracteres | ✅ DEF-03 |
| F02 | DNI de la búsqueda avanzada           | 7 u 8 números al enviar                       | Numérico                         | Se pueden escribir letras y más de 8 caracteres | ✅ DEF-03 |
| F03 | Nombre y descripción de especialidad  | 3 a 100 caracteres al enviar                  | Nombre 3–100, descripción 10–100 | Se pueden escribir más de 100 caracteres        | ✅ DEF-03 |
| F04 | Nombre del médico                     | 3 a 100 caracteres al enviar                  | Hasta 100                        | Se pueden escribir más de 100 caracteres        | ✅ DEF-03 |
| F05 | Matrícula del médico                  | Obligatoria, sin máximo                       | Obligatoria, sin máximo          | No tiene límite de largo                        | ✅ DEF-03 |
| F06 | Motivo de la consulta                 | 5 a 500 caracteres al enviar                  | 5 a 500                          | Se pueden escribir más de 500 caracteres        | ✅ DEF-03 |
| F07 | Correos de los logins                 | Formato de correo al enviar                   | Formato de correo                | Sin máximo de largo                             | ✅ DEF-03 |
| F08 | Búsquedas de médicos y especialidades | Mínimo 3 caracteres; especialidades hasta 100 | Hasta 100                        | La búsqueda de médicos no tiene máximo          | ✅ DEF-03 |
| F09 | Horarios de disponibilidad            | Tipo hora, intervalos de 30 minutos           | Intervalos de 30 minutos         | Correcto                                        | ✅        |
| F10 | Fecha de la búsqueda avanzada         | Tipo fecha                                    | `YYYY-MM-DD`                     | Correcto                                        | ✅        |

## E. Verificaciones técnicas

| ID  | Comando                | Resultado |
| --- | ---------------------- | --------- |
| E01 | `npm run build`        | ✅        |
| E02 | `npm run lint`         | ✅        |
| E03 | `npm run format:check` | ✅        |

## Defectos

| ID     | Caso | Descripción                                                                                                                                                                                     | Responsable | Tarjeta o PR | Estado  |
| ------ | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------ | ------- |
| DEF-01 | D02  | El panel muestra "M?dicos activos": hay un `?` en lugar de la "é" en `src/modules/dashboard/pages/OverviewPage.jsx:97`, desde el commit `1fc77ca`                                               | Braian      | PR #51       | Cerrado |
| DEF-02 | B15  | Con el backend apagado se muestra "Ocurrió un error inesperado" en lugar de "No se pudo conectar con el servidor", porque el proxy de Vite responde 500. Severidad baja: hay botón "Reintentar" | Braian      | PR #53 (F49) | Cerrado |

## Observaciones

No son defectos: el flujo funciona. Quedan registradas por si el equipo decide ajustarlas.

| ID     | Caso     | Observación                                                                                                                                                                                                            |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OBS-01 | B14      | La reserva abre en la primera semana con turnos. Si es la siguiente, la flecha permite volver a la semana actual, que muestra "No hay turnos disponibles", y ahí queda deshabilitada                                   |
| OBS-02 | A07      | El modal "Turno confirmado" no se cierra con Escape ni con "Cerrar", que aparece deshabilitado: la única salida es "Ir a Mis turnos" (`dismissible={false}` en `SlotPicker.jsx`)                                       |
| OBS-03 | D03, D08 | A 700 px las tablas se desplazan de costado dentro de su recuadro; "Acciones" y "Estado" quedan fuera de vista hasta desplazar                                                                                         |
| OBS-04 | D06      | El mockup de la 1.4 muestra en rojo la acción de eliminar especialidades; en la pantalla el botón "Eliminar" usa el estilo contorno, a diferencia del listado de médicos, donde ya está en rojo. Resuelta en el PR #57 |
| DEF-03 | F01–F08  | Los campos validan el largo y el formato al enviar, pero permiten escribir sin límite y aceptan letras en los DNI                                                                                                      | Braian | PR #51 | Cerrado |

## Cierre

- [x] Circuito principal completo sin ❌.
- [x] Casos de error completos sin ❌.
- [x] Ningún defecto sin responsable.
- [x] Circuito repetido sobre `development` actualizada después de las correcciones.
- [ ] En el backend, `development` pasado a `main` por PR. Pendiente de decidir con el equipo.
