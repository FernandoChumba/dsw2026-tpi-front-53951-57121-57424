import { instance } from '../../shared/api/axiosInstance';

// POST /api/auth/logout: el backend revoca el token actual (responde "ok").
export async function logout() {
  await instance.post('api/auth/logout');
}
