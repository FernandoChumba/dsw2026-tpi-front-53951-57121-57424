import axios from 'axios';
import { clearSession, getToken } from '../helpers/session';

// Todas las peticiones usan rutas relativas ('/api/...'). En desarrollo, el
// proxy de Vite (vite.config.js) las reenvía al backend definido en
// VITE_BACKEND_URL; así el navegador no hace peticiones a otro origen y se
// evitan los errores de CORS.
// baseURL '/' hace que 'api/x' se resuelva como '/api/x' desde cualquier página
// (sin ella, en '/admin/login' terminaría en '/admin/api/x').
// No se usa withCredentials: la sesión viaja en el encabezado Authorization,
// no en cookies.
const instance = axios.create({
  baseURL: '/',
});

// Antes de cada petición: si hay sesión, se agrega el token JWT.
instance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Los endpoints de login del backend son 'api/auth/admin/login' y
// 'api/auth/patient/login': cualquier ruta 'auth/.../login' cuenta como login.
const isLoginRequest = (config) =>
  /(^|\/)auth\/(.+\/)?login$/.test(config?.url ?? '');

// Login al que se vuelve según el área en la que está el usuario.
const getLoginPath = () =>
  window.location.pathname.startsWith('/admin') ? '/admin/login' : '/login';

// Después de cada respuesta con error.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Un 401 en login significa credenciales inválidas: lo resuelve el
    // formulario. En cualquier otra ruta significa que la sesión ya no es
    // válida (por ejemplo, el token venció): se borra la sesión y se vuelve
    // al login del área. El front no decodifica el JWT para saber si venció:
    // quien valida el token es siempre el backend.
    if (status === 401 && !isLoginRequest(error.config)) {
      clearSession();

      const loginPath = getLoginPath();

      if (window.location.pathname !== loginPath) {
        window.location.href = loginPath;
      }
    }

    return Promise.reject(error);
  }
);

export { instance };
