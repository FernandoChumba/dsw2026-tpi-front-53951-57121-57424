# Desarrollo local

## Requisitos

- Node.js 20.19 o posterior.
- .NET SDK instalado para la versión objetivo del backend.

## Backend

Cloná el repositorio backend y, desde su raíz, configurá la clave JWT de desarrollo siguiendo su README:

```powershell
dotnet user-secrets set "Jwt:Key" "$(openssl rand -base64 48)" --project Dsw2026Tpi.Api
```

Configurá el administrador inicial con User Secrets. Reemplazá los valores entre < > por credenciales locales propias:

```powershell
dotnet user-secrets set "InitialAdministrator:Email" "<correo-admin-local>" --project Dsw2026Tpi.Api
dotnet user-secrets set "InitialAdministrator:Password" "<clave-admin-local>" --project Dsw2026Tpi.Api
dotnet run --project Dsw2026Tpi.Api
```

El backend usa SQLite y aplica las migraciones al iniciar en Development. No copies credenciales reales a archivos versionados.

## Frontend

Desde la raíz del repositorio frontend, instalá las dependencias y prepará la configuración a partir de la plantilla antes de iniciar Vite. El comando `cp` funciona en Git Bash y PowerShell.

```powershell
npm ci
cp .env.example .env.development
npm run dev
```

La plantilla `.env.example` contiene la URL predeterminada del backend. El repositorio también incluye `.env.development` con ese mismo valor público.

```env
VITE_BACKEND_URL=http://localhost:5278
```

Para usar otra instancia del backend, cambiá `VITE_BACKEND_URL` en `.env.development` por la URL que indique su terminal al iniciar. Por ejemplo, si el backend escucha en `http://localhost:5280`, usá esa dirección. Reiniciá `npm run dev` después de cambiarla.

Vite usa esta variable como destino de su proxy de desarrollo. Las peticiones del navegador van a `/api` en el mismo origen del frontend y Vite las reenvía al backend configurado. Si falta la variable, el proxy utiliza `http://localhost:5278`.

El script `npm run seed:dev` lee `.env.development` mediante Node y usa la misma URL que Vite.

Los archivos de configuración del frontend contienen valores públicos. La clave JWT y las credenciales del administrador se configuran en el backend mediante User Secrets, como se explica arriba. Las variables `SEED_ADMIN_EMAIL` y `SEED_ADMIN_PASSWORD` se definen en la terminal para ejecutar el seed.

## Cargar datos de prueba

En la misma terminal, definí las credenciales del administrador local configuradas en el backend:

```powershell
$env:SEED_ADMIN_EMAIL = "<correo-admin-local>"
$env:SEED_ADMIN_PASSWORD = "<clave-admin-local>"
npm run seed:dev
```

El seed crea o reutiliza una especialidad y un médico identificados para F04, crea disponibilidad si el médico no tiene una cargada en el mes actual, inicia sesión con un paciente ficticio y reserva el primer bloque futuro disponible. Si ya existe esa reserva, no crea otra. Si el backend no ofrece bloques para el resto del mes, lo informa y termina sin crear una cita.

Las credenciales del administrador deben coincidir con las configuradas en User Secrets. El script no muestra ni guarda la contraseña ni los tokens.
