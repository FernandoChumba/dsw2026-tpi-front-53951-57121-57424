import { instance } from '../../shared/api/axiosInstance';

// Si el backend no responde, se corta a los 5 segundos para que cerrar
// sesión no quede colgado (la sesión local se limpia igual).
const LOGOUT_TIMEOUT_MS = 5000;

// POST /api/auth/logout: el backend revoca el token actual (responde "ok").
export async function logout() {
  await instance.post('api/auth/logout', null, { timeout: LOGOUT_TIMEOUT_MS });
}
