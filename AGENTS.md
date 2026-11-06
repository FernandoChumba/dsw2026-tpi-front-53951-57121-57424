# Guía para agentes y personas

Frontend del sistema de turnos médicos del TPI 2026, conectado al backend real. Antes de escribir código, leer la tarea asignada y respetar sus límites.

## Antes de empezar

1. Leer la tarea en `docs/tasks/Fxx-*.md`. Define archivos permitidos, alcance y criterios.
2. Leer las reglas completas en [`docs/tasks/README.md`](docs/tasks/README.md).
3. Consultar [`docs/api-contract.md`](docs/api-contract.md) si la tarea usa la API.
4. Consultar [`docs/ui-guide.md`](docs/ui-guide.md) si la tarea cambia la UI.
5. Abrir el mockup que cita la tarea (ver la tabla de abajo).

**Frenar y consultar** si hace falta un archivo fuera de la lista, una decisión que la tarea no define o una dependencia que todavía no está en `development`.

## Comandos

| Acción                 | Comando                |
| ---------------------- | ---------------------- |
| Instalar dependencias  | `npm ci`               |
| Levantar en desarrollo | `npm run dev`          |
| Compilar               | `npm run build`        |
| Revisar el código      | `npm run lint`         |
| Revisar el formato     | `npm run format:check` |

Antes de pedir revisión, ejecutar `build`, `lint` y `format:check`.

## Ramas

| Rama          | Uso                                                             |
| ------------- | --------------------------------------------------------------- |
| `development` | Integración: las ramas de tarea salen de acá y vuelven por PR   |
| `main`        | Entrega: solo recibe `development` por PR, al cerrar el trabajo |

GitHub propone `main` como base, así que hay que elegir `development`: `gh pr create --base development`.

## Stack cerrado

React, React Router, React Hook Form, Axios y Tailwind. No agregar librerías sin acuerdo del equipo.

## Reglas clave

- **Trabajo:** una tarea, una rama y un PR hacia `development`. Nadie aprueba su propio PR.
- **Arquitectura:** `modules/<dominio>/{pages,components,hooks,services}`. La página usa un hook, el hook usa un service, y `axios` nunca aparece en una vista.
- **UI:** usar tokens `med-*` y componentes de `shared`. Mobile-first en cada tarea.
- **Formularios:** React Hook Form, con el error debajo de cada campo.
- **Listas:** carga, error y estado vacío, con `key` estable por ID.
- **Prohibido:** datos simulados, credenciales, tokens o requisitos que no estén en la tarea o en el enunciado.

## Dueños por carpeta

| Carpeta                                                | Dueño    | Revisa   |
| ------------------------------------------------------ | -------- | -------- |
| `src/App.jsx`, `modules/shared/api`, `shared/helpers`  | Braian   | Fernando |
| `modules/auth`                                         | Braian   | Fernando |
| `modules/patients`: reserva (`PatientHome`, `booking`) | Braian   | Fernando |
| `src/index.css`, `modules/shared/components`           | Fernando | Tobías   |
| `modules/doctors`                                      | Fernando | Tobías   |
| `modules/specialties`                                  | Tobías   | Braian   |
| `modules/appointments`, `modules/dashboard`            | Tobías   | Braian   |
| `modules/patients`: Mis turnos (`AppointmentsPage`)    | Tobías   | Braian   |

Si una tarea permite tocar un archivo de otro dueño, avisarle antes de abrir el PR.

## Mockups

Referencia visual tomada del enunciado v1.7. Las tareas citan la página del PDF.

| Página | Pantalla                  | Archivo                                             |
| ------ | ------------------------- | --------------------------------------------------- |
| 23     | Admin: login              | `docs/mockups/p23-admin-login.png`                  |
| 23     | Admin: página principal   | `docs/mockups/p23-admin-principal.png`              |
| 24     | Admin: listado de médicos | `docs/mockups/p24-admin-medicos-listado.png`        |
| 24     | Admin: crear médico       | `docs/mockups/p24-admin-medicos-crear.png`          |
| 25     | Admin: disponibilidad     | `docs/mockups/p25-admin-disponibilidad.png`         |
| 25     | Admin: especialidades     | `docs/mockups/p25-admin-especialidades-listado.png` |
| 26     | Admin: crear especialidad | `docs/mockups/p26-admin-especialidades-crear.png`   |
| 27     | Admin: búsqueda avanzada  | `docs/mockups/p27-admin-busqueda.png`               |
| 28     | Paciente: login           | `docs/mockups/p28-paciente-login.png`               |
| 28     | Paciente: turno           | `docs/mockups/p28-paciente-turno.png`               |
| 29     | Paciente: móvil           | `docs/mockups/p29-paciente-movil.png`               |
