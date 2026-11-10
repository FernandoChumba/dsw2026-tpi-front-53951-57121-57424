// Roles que devuelve el backend en el cuerpo del login (campo "role").
// Ojo: dentro del JWT el rol tiene otro formato ('Administrador', 'Paciente'),
// por eso el front usa siempre el que viene en la respuesta del login.
export const ROLES = {
  ADMIN: 'ADMINISTRADOR',
  PATIENT: 'PACIENTE',
};
