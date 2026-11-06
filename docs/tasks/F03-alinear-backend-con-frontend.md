# F03 · Base — Arreglos del backend para el frontend

| Campo            | Valor                                                         |
| ---------------- | ------------------------------------------------------------- |
| Responsable      | Braian                                                        |
| Revisión         | Fernando                                                      |
| Etapa            | 0. Base                                                       |
| Depende de       | Ninguna                                                       |
| Repositorio      | backend (`BraianMedrano/dsw2026-tpi`, PR hacia `development`) |
| Rama             | `fix/f03-alinear-backend-con-frontend`                        |
| Tarjeta anterior | Nueva                                                         |

> Leer antes `docs/tasks/README.md`. Si hace falta un archivo fuera de esta lista o una decisión no escrita acá, detenerse y consultar al responsable: no ampliar el alcance.

## Objetivo

Corregir en el backend lo que hoy impide o complica la integración con el frontend.

## Referencias

- RNF06
- Enunciado v1.7, páginas 15-16 y 20-21
- Página 23: "Será necesario adaptar los endpoints"

## Contrato API

- `POST` y `PUT /api/doctors`: aceptar `specialtyId` en lugar de `specialityId`.
- Agregar `GET /api/doctors/{id}` (Administrador), con la misma forma que un elemento del listado.
- `GET /api/appointments/search`: agregar `date`, `startTime` y `endTime` a cada resultado, sin quitar campos.
- CORS: ejecutar `UseCors` antes de autenticación y autorización, y permitir `http://localhost:5173` en Development.

## Archivos permitidos

- `Dsw2026Tpi.Application/Dtos/DoctorModel.cs`
- `Dsw2026Tpi.Application/Dtos/AppointmentModel.cs`
- `Dsw2026Tpi.Application/Services/DoctorService.cs`
- `Dsw2026Tpi.Application/Services/AppointmentService.cs`
- `Dsw2026Tpi.Api/Controllers/DoctorController.cs`
- `Dsw2026Tpi.Api/Program.cs`
- `Dsw2026Tpi.Api/appsettings.Development.json`
- `Dsw2026Tpi.Tests/**`
- `README.md`

## Reutilizar

- Patrones existentes de `SpecialtiesController` para `GET {id}`.
- Middleware global de errores existente.

## Fuera de alcance

- Cambiar otros contratos o reglas de negocio.
- Endpoints para marcar `ATTENDED` o `NO_SHOW`.
- Migraciones de base de datos.

## Criterios de aceptación

- [ ] Crear un médico con `specialtyId` responde 201, y con `specialityId` ya no se acepta.
- [ ] `GET /api/doctors/{id}` responde 200, 404 si no existe y 403 para un paciente.
- [ ] Cada resultado de la búsqueda incluye fecha y horarios.
- [ ] Un preflight desde `http://localhost:5173` recibe los encabezados CORS.
- [ ] La clave JWT de desarrollo sale de `appsettings.Development.json`, pasa a User Secrets y se genera una nueva.
- [ ] La documentación de ejecución local explica cómo configurar la clave.

## Verificación

- `dotnet test` pasa completo.
- Cada regla nueva tiene una prueba de integración.
- Ejecutar `dotnet test` y registrar el resultado en el PR.
