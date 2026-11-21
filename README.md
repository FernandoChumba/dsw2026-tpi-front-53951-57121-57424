# Trabajo Práctico Integrador — Frontend

## Desarrollo de Software 2026

Aplicación web para la gestión de turnos médicos. Los pacientes reservan y cancelan turnos; los administradores gestionan especialidades, médicos, disponibilidad y consultan los turnos. Consume la API del [backend del TPI](https://github.com/BraianMedrano/dsw2026-tpi) (ASP.NET Core).

## Integrantes

- Braian Medrano — Legajo 57121
- Fernando Chumba — Legajo 53951
- Tobias Juarez Julio — Legajo 57424

## Tecnologías

- React 19 con Vite 7
- React Router DOM 7
- Tailwind CSS 4
- Axios
- React Hook Form

## Requisitos

- Node.js 20.19 o posterior.
- .NET SDK para ejecutar el backend.

## Ejecución local

### 1. Backend

```bash
git clone -b development https://github.com/BraianMedrano/dsw2026-tpi.git
cd dsw2026-tpi
dotnet run --project Dsw2026Tpi.Api --launch-profile http
```

La API queda disponible en `http://localhost:5278`. En el ambiente `Development` no necesita configuración adicional: crea la base SQLite, aplica las migraciones y crea el administrador de prueba. El detalle está en el README del backend.

### 2. Frontend

En otra terminal:

```bash
git clone -b development https://github.com/FernandoChumba/dsw2026-tpi-front-53951-57121-57424.git
cd dsw2026-tpi-front-53951-57121-57424
npm ci
npm run dev
```

Abrir `http://localhost:5173`.

### Configuración

El archivo versionado `.env.development` define la URL del backend:

```env
VITE_BACKEND_URL=http://localhost:5278
```

Vite usa esa URL como destino de su proxy de desarrollo: el navegador llama a `/api` en el mismo origen del frontend y Vite reenvía las peticiones al backend, por lo que no hay problemas de CORS. Si el backend escucha en otra dirección, cambiar `VITE_BACKEND_URL` y reiniciar `npm run dev`. La plantilla `.env.example` contiene el mismo valor.

Los archivos de configuración del frontend solo contienen valores públicos.

## Usuarios de prueba

Válidos únicamente con el backend en el ambiente `Development`.

| Rol           | Pantalla       | Datos de ingreso                                                  |
| ------------- | -------------- | ----------------------------------------------------------------- |
| Administrador | `/admin/login` | Email `admin@system.com`, contraseña `Admin2026!`                 |
| Paciente      | `/login`       | Cualquier email válido y un DNI de 7 u 8 dígitos (ej. `30123456`) |

El paciente se crea automáticamente en su primer ingreso.

## Datos de prueba (opcional)

Con el backend en ejecución, `npm run seed:dev` crea una especialidad, un médico con disponibilidad en el mes actual y un turno reservado por un paciente. Necesita las credenciales del administrador en la terminal:

```bash
# Git Bash, macOS o Linux
SEED_ADMIN_EMAIL=admin@system.com SEED_ADMIN_PASSWORD='Admin2026!' npm run seed:dev
```

```powershell
# PowerShell
$env:SEED_ADMIN_EMAIL = "admin@system.com"
$env:SEED_ADMIN_PASSWORD = "Admin2026!"
npm run seed:dev
```

Si los datos ya existen, el script los reutiliza y no crea duplicados.

## Scripts

| Comando                | Descripción                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Inicia el servidor de desarrollo           |
| `npm run build`        | Genera la versión de producción en `dist/` |
| `npm run preview`      | Sirve localmente la versión de producción  |
| `npm run lint`         | Ejecuta ESLint                             |
| `npm run format`       | Formatea el código con Prettier            |
| `npm run format:check` | Verifica el formato sin modificar archivos |
| `npm run seed:dev`     | Carga datos de prueba en el backend local  |

## Funcionalidades

**Paciente**

- Reserva de turnos filtrando por especialidad, médico y fecha.
- Mis turnos: turnos activos con opción de cancelar e historial paginado.

**Administrador**

- Panel con los turnos del día.
- Alta, edición, baja y listado de especialidades y médicos.
- Carga de la disponibilidad mensual de cada médico.
- Búsqueda avanzada de turnos con filtros y detalle.

## Rutas y control de acceso

| Ruta                     | Acceso        |
| ------------------------ | ------------- |
| `/login`, `/admin/login` | Público       |
| `/`, `/appointments`     | Paciente      |
| `/admin/*`               | Administrador |

`ProtectedRoute` recibe la lista de roles permitidos (`allowedRoles`). Sin sesión redirige al login del área; con un rol no permitido redirige al inicio del rol del usuario. El rol se obtiene de `AuthProvider` mediante el hook `useAuth`.

Esta protección es de la interfaz: el backend valida el token JWT y el rol en cada petición. Si una petición responde `401`, el interceptor de Axios cierra la sesión y vuelve al login.

## Estructura del proyecto

El código se organiza por dominio dentro de `src/modules`:

```text
src/modules/
├── appointments/   Búsqueda de turnos (administrador)
├── auth/           Login de administrador, sesión, rutas protegidas
├── dashboard/      Layout y panel del administrador
├── doctors/        Médicos y disponibilidad
├── patients/       Login, reserva y turnos del paciente
├── specialties/    Especialidades
└── shared/         Componentes de UI, cliente HTTP y utilidades comunes
```

Cada módulo separa `pages/` (pantallas), `components/` (presentación), `hooks/` (estado y lógica) y `services/` (llamadas a la API). Las vistas no llaman a Axios directamente: usan hooks, que a su vez usan los servicios.

## Endpoints utilizados

Todas las rutas usan el prefijo `/api`. Salvo el login, requieren el encabezado `Authorization: Bearer <token>`.

### Autenticación

| Método | Endpoint              | Descripción                        |
| ------ | --------------------- | ---------------------------------- |
| POST   | `/auth/admin/login`   | Login de administrador             |
| POST   | `/auth/patient/login` | Login de paciente (email y DNI)    |
| POST   | `/auth/logout`        | Cierra la sesión y revoca el token |

### Especialidades (administrador)

| Método | Endpoint            | Descripción                              |
| ------ | ------------------- | ---------------------------------------- |
| GET    | `/specialties`      | Listado paginado con búsqueda por nombre |
| GET    | `/specialties/{id}` | Detalle                                  |
| POST   | `/specialties`      | Alta                                     |
| PUT    | `/specialties/{id}` | Edición                                  |
| DELETE | `/specialties/{id}` | Baja                                     |

### Médicos (administrador)

| Método | Endpoint        | Descripción                              |
| ------ | --------------- | ---------------------------------------- |
| GET    | `/doctors`      | Listado paginado con búsqueda por nombre |
| GET    | `/doctors/{id}` | Detalle                                  |
| POST   | `/doctors`      | Alta                                     |
| PUT    | `/doctors/{id}` | Edición                                  |
| DELETE | `/doctors/{id}` | Baja                                     |

### Disponibilidad

| Método | Endpoint                       | Rol           | Descripción                                |
| ------ | ------------------------------ | ------------- | ------------------------------------------ |
| GET    | `/doctors/{id}/availabilities` | Administrador | Disponibilidad del médico en el mes actual |
| POST   | `/availabilities`              | Administrador | Carga la disponibilidad mensual            |
| PUT    | `/availabilities`              | Administrador | Actualiza la disponibilidad mensual        |
| GET    | `/availability-slots`          | Paciente      | Bloques de turno disponibles para reservar |

### Turnos

| Método | Endpoint                        | Rol           | Descripción                         |
| ------ | ------------------------------- | ------------- | ----------------------------------- |
| POST   | `/appointments`                 | Paciente      | Reserva un turno                    |
| GET    | `/appointments/patient`         | Paciente      | Turnos activos del paciente         |
| GET    | `/appointments/patient/history` | Paciente      | Historial paginado del paciente     |
| DELETE | `/appointments/{id}`            | Paciente      | Cancela un turno                    |
| GET    | `/appointments`                 | Administrador | Turnos de una fecha (panel del día) |
| GET    | `/appointments/search`          | Administrador | Búsqueda paginada con filtros       |
