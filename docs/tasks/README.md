# Plan de tareas del frontend

Fuente de verdad de **qué hay que hacer**. Trello indica **quién lo hace y en qué estado está**, y cada tarjeta enlaza a su archivo.

El frontend se conecta al backend real: el criterio de Funcionalidad (40%) pide "llamadas reales a los endpoints definidos en backend".

## Reglas para personas y agentes

1. **Una tarea, una rama, un PR hacia `development`.** La rama sale de `development` actualizada. Idealmente menos de 400 líneas.
2. **Solo se tocan los archivos permitidos de la tarea.** Si hace falta otro, detenerse y consultar.
3. **No agregar requisitos.** Lo que no está en la tarea o en el enunciado no se hace.
4. **Stack cerrado:** React, React Router, React Hook Form, Axios y Tailwind. Ninguna librería nueva sin acuerdo del equipo.
5. **Arquitectura:** `modules/<dominio>/{pages,components,hooks,services}`. La página usa un hook, el hook usa un service, y `axios` nunca aparece en una vista. El módulo `auth` conserva su carpeta `hook`.
6. **Un service por archivo**, como ya hace `auth/services`. Otro módulo solo puede importar un service para leer datos.
7. **UI consistente:** usar tokens `med-*` y componentes de `shared`. Antes de crear un componente, revisar `docs/ui-guide.md`. Si falta uno, se propone en un PR propio.
8. **Mobile-first en cada tarea:** estilos base para móvil y `sm:`, `md:` hacia arriba.
9. **Formularios con React Hook Form**, con el error debajo de cada campo.
10. **Cada lista muestra** carga, error y estado vacío, con `key` estable por ID.
11. **Archivos compartidos** (`App.jsx`, `index.css`, `shared/`): solo los cambia una tarea que los liste.
12. **Nada de datos simulados, credenciales ni tokens** en el código.
13. **Antes de pedir revisión:** `npm run build`, `npm run lint` y `npm run format:check`.
14. **Nadie aprueba su propio PR.** Se mueve a Terminado después del merge y de comprobar el flujo sobre `development` actualizada.

## Ramas

- `development`: integración. Recibe los PR de cada tarea.
- `main`: entrega. Solo recibe `development` por PR, al cerrar el trabajo (F41). En el backend, lo hace F39.

## Reparto

| Persona  | Trello           | Tareas | Carpetas                                                             |
| -------- | ---------------- | ------ | -------------------------------------------------------------------- |
| Braian   | `braianmedrano`  | 14     | Base técnica, `auth`, reserva en `patients`                          |
| Fernando | `fernandochumba` | 13     | `shared` (UI), `doctors`                                             |
| Tobías   | `tobiasjuarez4`  | 14     | `specialties`, `appointments`, `dashboard`, Mis turnos en `patients` |

## Orden de ejecución

El número no es una cola estricta: una tarea puede empezar cuando sus dependencias están en `development`.

- **Etapa 0:** F01, F02, F03, F05 y F06 pueden ir en paralelo.
- **Etapa 1:** F09 primero. F10 destraba las pantallas de administración y F11 las de paciente.
- **Etapa 2:** las tres personas trabajan en paralelo, cada una en orden dentro de su bloque.
- **Etapa 3:** se integra y se cierra en orden.

| Etapa       | ID                                         | Tarea                                            | Responsable | Revisión | Depende de                   | Tarjeta anterior            |
| ----------- | ------------------------------------------ | ------------------------------------------------ | ----------- | -------- | ---------------------------- | --------------------------- |
| 0. Base     | [F01](F01-guias-para-agentes.md)           | Base — Guías del repositorio y mockups           | Braian      | Fernando | —                            | Nueva                       |
| 0. Base     | [F02](F02-ci-y-template-de-pr.md)          | Base — CI y template de PR                       | Braian      | Fernando | —                            | Nueva                       |
| 0. Base     | [F03](F03-alinear-backend-con-frontend.md) | Base — Arreglos del backend para el frontend     | Braian      | Fernando | —                            | Nueva                       |
| 0. Base     | [F04](F04-datos-de-prueba.md)              | Base — Datos de prueba por API                   | Braian      | Fernando | F03                          | Nueva (reemplaza F01 y F02) |
| 0. Base     | [F05](F05-base-tecnica.md)                 | Base — Conexión con la API, errores y rutas      | Braian      | Fernando | —                            | Nueva                       |
| 0. Base     | [F06](F06-fundacion-ui.md)                 | Base — Tokens y componentes compartidos          | Fernando    | Tobías   | —                            | Nueva                       |
| 0. Base     | [F07](F07-modal-y-mensajes.md)             | UI — Modal, confirmación y mensajes              | Fernando    | Tobías   | F06                          | F03                         |
| 0. Base     | [F08](F08-paginacion.md)                   | UI — Paginación por servidor                     | Fernando    | Tobías   | F06                          | F04                         |
| 1. Acceso   | [F09](F09-sesion-real.md)                  | Acceso — Sesión real con JWT                     | Braian      | Fernando | F05                          | F07                         |
| 1. Acceso   | [F10](F10-login-administrador.md)          | Acceso — Login de administrador                  | Braian      | Fernando | F06, F09                     | F06                         |
| 1. Acceso   | [F11](F11-login-paciente.md)               | Acceso — Login de paciente con correo y DNI      | Braian      | Fernando | F06, F09                     | F05                         |
| 1. Acceso   | [F12](F12-rutas-por-rol.md)                | Acceso — Rutas por rol                           | Braian      | Fernando | F09                          | F08                         |
| 2. Dominios | [F13](F13-especialidades-listado.md)       | Especialidades — Listado, búsqueda y paginación  | Tobías      | Braian   | F04, F06, F08, F10           | F12                         |
| 2. Dominios | [F14](F14-especialidades-crear.md)         | Especialidades — Crear                           | Tobías      | Braian   | F13                          | F09                         |
| 2. Dominios | [F15](F15-especialidades-editar.md)        | Especialidades — Editar                          | Tobías      | Braian   | F14                          | F10                         |
| 2. Dominios | [F16](F16-especialidades-eliminar.md)      | Especialidades — Eliminar                        | Tobías      | Braian   | F07, F13                     | F11                         |
| 2. Dominios | [F17](F17-medicos-listado.md)              | Médicos — Listado, búsqueda y paginación         | Fernando    | Tobías   | F04, F06, F08, F10           | F17                         |
| 2. Dominios | [F18](F18-medicos-crear.md)                | Médicos — Crear                                  | Fernando    | Tobías   | F03, F17                     | F13                         |
| 2. Dominios | [F19](F19-medicos-editar.md)               | Médicos — Editar                                 | Fernando    | Tobías   | F03, F18                     | F14                         |
| 2. Dominios | [F20](F20-medicos-eliminar.md)             | Médicos — Eliminar                               | Fernando    | Tobías   | F07, F17                     | F15                         |
| 2. Dominios | [F21](F21-disponibilidad-pantalla.md)      | Disponibilidad — Pantalla de días y horarios     | Fernando    | Tobías   | F17                          | F18                         |
| 2. Dominios | [F22](F22-disponibilidad-guardar.md)       | Disponibilidad — Validar y guardar               | Fernando    | Tobías   | F21                          | F19                         |
| 2. Dominios | [F23](F23-medicos-detalle.md)              | Médicos — Detalle y acceso a disponibilidad      | Fernando    | Tobías   | F07, F21                     | F16                         |
| 2. Dominios | [F24](F24-reserva-filtros.md)              | Reserva — Filtrar por especialidad y médico      | Braian      | Fernando | F04, F06, F11                | F20                         |
| 2. Dominios | [F25](F25-reserva-fechas.md)               | Reserva — Buscar disponibilidad y navegar fechas | Braian      | Fernando | F24                          | F21                         |
| 2. Dominios | [F26](F26-reserva-motivo.md)               | Reserva — Motivo y validación                    | Braian      | Fernando | F25                          | F22                         |
| 2. Dominios | [F27](F27-reserva-confirmar.md)            | Reserva — Confirmar                              | Braian      | Fernando | F26                          | F23                         |
| 2. Dominios | [F28](F28-mis-turnos-activos.md)           | Mis turnos — Turnos activos                      | Tobías      | Braian   | F04, F06, F11                | F24                         |
| 2. Dominios | [F29](F29-mis-turnos-cancelar.md)          | Mis turnos — Cancelar                            | Tobías      | Braian   | F07, F28                     | F25                         |
| 2. Dominios | [F30](F30-mis-turnos-historial.md)         | Mis turnos — Historial                           | Tobías      | Braian   | F08, F28                     | F37                         |
| 2. Dominios | [F31](F31-busqueda-filtros.md)             | Búsqueda — Filtros combinados                    | Tobías      | Braian   | F03, F04, F06, F10           | F26                         |
| 2. Dominios | [F32](F32-busqueda-detalle.md)             | Búsqueda — Paginación y detalle                  | Tobías      | Braian   | F07, F08, F31                | F27                         |
| 2. Dominios | [F33](F33-panel-indicadores.md)            | Panel — Indicadores reales                       | Tobías      | Braian   | F06, F10                     | F28                         |
| 3. Cierre   | [F34](F34-navegacion.md)                   | Navegación — Accesos y botones vacíos            | Fernando    | Tobías   | F14, F18, F21, F33           | F29                         |
| 3. Cierre   | [F35](F35-consistencia-textos.md)          | UI — Textos, fechas y estados                    | Tobías      | Braian   | F16, F20, F23, F27, F30, F32 | F30                         |
| 3. Cierre   | [F36](F36-revision-escritorio.md)          | UI — Ajuste de escritorio                        | Fernando    | Tobías   | F34, F35                     | F31                         |
| 3. Cierre   | [F37](F37-revision-movil-paciente.md)      | UI — Revisión móvil del paciente                 | Tobías      | Braian   | F35                          | F32                         |
| 3. Cierre   | [F38](F38-revision-movil-admin.md)         | UI — Revisión móvil de administración y teclado  | Fernando    | Tobías   | F35                          | F33                         |
| 3. Cierre   | [F39](F39-prueba-integral.md)              | QA — Prueba del circuito completo                | Braian      | Fernando | F36, F37, F38                | F34                         |
| 3. Cierre   | [F40](F40-verificacion-entrega.md)         | Entrega — Build, lint y formato                  | Tobías      | Braian   | F39                          | F35                         |
| 3. Cierre   | [F41](F41-readme-entrega.md)               | Entrega — README                                 | Tobías      | Braian   | F39                          | F36                         |

Las tarjetas actuales F01 y F02 (fixtures y store local) se archivan: los datos viven en la API.

## Cobertura del enunciado v1.7

| Requisito      | Qué pide                                        | Tareas                                |
| -------------- | ----------------------------------------------- | ------------------------------------- |
| RF01           | Autenticación de administradores                | F09, F10                              |
| RF02           | Autenticación de pacientes                      | F09, F11                              |
| RF03           | Registrar médicos                               | F18 (gestión: F17, F19, F20, F23)     |
| RF04           | Registrar especialidades                        | F14 (gestión: F13, F15, F16)          |
| RF05           | Configurar disponibilidades                     | F21, F22                              |
| RF06           | Consultar turnos disponibles                    | F24, F25                              |
| RF07           | Reservar turnos                                 | F26, F27                              |
| RF08           | Cancelar turnos                                 | F29                                   |
| RF09           | Búsquedas avanzadas                             | F31, F32                              |
| RN01           | Turnos dentro del horario configurado           | F22 y backend                         |
| RN02           | Bloques de 30 minutos                           | F22 y backend                         |
| RN03           | Sin superposición                               | F27 y backend                         |
| RN04           | Sin reservas en el pasado                       | F25 y backend                         |
| RN05           | Acceso por roles                                | F12 y backend                         |
| RN06           | Alta automática del paciente                    | F11 y backend                         |
| RNF01          | JWT y contraseña de 8 caracteres                | F09, F10                              |
| RNF03 y RNF04  | Módulos y separación                            | Reglas 5 y 6                          |
| RNF05          | Responsive desde 6 pulgadas                     | Regla 8, F37, F38                     |
| CU01           | Reservar, sin disponibilidad y turno ocupado    | F24 a F27                             |
| CU02           | Gestionar disponibilidad                        | F21, F22                              |
| CU03           | Cancelar y liberar el turno                     | F29                                   |
| Página 21      | Formato de errores                              | F05 y cada formulario                 |
| Página 22      | Respuesta 429                                   | F05, F10, F11, F27                    |
| Página 30      | README de entrega                               | F41                                   |
| Página 30      | Funcionalidad: llamadas reales                  | F05 y etapas 1 y 2, comprobado en F39 |
| Actor Paciente | Consultar turnos activos                        | F28                                   |
| Página 23      | Respetar los mockups en escritorio              | F36                                   |
| Adicional      | Historial del paciente                          | F30                                   |
| Página 30      | Calidad: Scream Architecture y buenas prácticas | Reglas 5 y 6, F40                     |
| Página 30      | Errores y validaciones en la UI                 | F05, formularios, F35                 |
| Página 30      | Uso de librerías                                | Reglas 4 y 9                          |

| Mockup                           | Página | Tareas         |
| -------------------------------- | ------ | -------------- |
| Admin: login                     | 23     | F10            |
| Admin: página principal          | 23     | F33, F34       |
| Admin: listado de médicos        | 24     | F17, F20, F23  |
| Admin: crear médico              | 24     | F18, F19       |
| Admin: disponibilidad horaria    | 25     | F21, F22       |
| Admin: listado de especialidades | 25     | F13, F16       |
| Admin: crear especialidad        | 26     | F14, F15       |
| Admin: búsqueda avanzada         | 27     | F31, F32       |
| Paciente: login                  | 28     | F11            |
| Paciente: turno                  | 28     | F24 a F27      |
| Paciente: soporte móvil          | 29     | F24 a F27, F37 |

## Particularidades del backend

Usar la rama `development` de `BraianMedrano/dsw2026-tpi`. F01 las desarrolla en `docs/api-contract.md`.

- `pageIndex` empieza en 0; `pageSize` va de 1 a 100.
- Omitir `name` si está vacío; con menos de 3 caracteres responde 400.
- El JWT no trae DNI: se guarda desde el login y se envía donde el contrato lo pide.
- El paciente recibe 403 en especialidades y médicos: la reserva usa `GET /api/availability-slots`.
- `DELETE` y logout responden el texto `ok`, no JSON.
- Las horas de los turnos pueden llegar como `HH:mm:ss`.
- Un 401 en login significa credenciales inválidas, no sesión vencida.
- La disponibilidad cubre el resto del mes actual, sin parámetro de mes.
- Nada marca hoy `ATTENDED` ni `NO_SHOW`.

## Decisiones a validar con el equipo

Son supuestos de este borrador:

1. **Mockups:** se omiten datos sin respaldo en el backend, como estado de médicos y especialidades, reseñas, consultorio e indicadores como "más demandada".
2. **Búsqueda:** el filtro de paciente es solo por DNI, porque `fullName` puede llegar vacío.
3. **Bajas:** el backend permite eliminar una especialidad con médicos activos y un médico con turnos. Las tareas no agregan bloqueos en el frontend.
4. **Estados:** no se agrega un flujo para marcar turnos como atendidos, porque el enunciado no lo pide en sus requisitos funcionales.
5. **Historial (F30):** no aparece en el enunciado, que pide turnos activos. Se conserva porque está en el tablero y el backend ya lo implementa; si falta tiempo, es la primera tarea que se puede quitar.
