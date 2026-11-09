import { instance } from '../../shared/api/axiosInstance';

// POST /api/auth/patient/login → { token, role: 'PACIENTE' }.
// El primer login crea al paciente. El DNI viaja como texto.
export async function loginPatient(email, dni) {
  const response = await instance.post('api/auth/patient/login', {
    email,
    dni: String(dni),
  });

  return response.data;
}
