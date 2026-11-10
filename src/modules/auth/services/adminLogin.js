import { instance } from '../../shared/api/axiosInstance';

// POST /api/auth/admin/login → { token, role: 'ADMINISTRADOR' }.
// Si falla, axios lanza el error y la página lo traduce con getApiError.
export async function loginAdmin(email, password) {
  const response = await instance.post('api/auth/admin/login', {
    email,
    password,
  });

  return response.data;
}
