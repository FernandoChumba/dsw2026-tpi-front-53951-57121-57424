import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';

// Protege las rutas privadas en dos pasos:
// 1. Sesión: si no hay sesión iniciada, manda al login.
// 2. Rol: si la ruta pide un rol (por ejemplo, 'ADMINISTRADOR') y el usuario
//    tiene otro, también manda al login. Así un paciente logueado no puede
//    entrar a /admin escribiendo la URL a mano.
//
// El rol del usuario viene del login (useAuth lo lee de la sesión).
// Esta protección es solo de la interfaz: el backend vuelve a validar el token
// y el rol en cada petición, así que aunque alguien saltee esta pantalla, la
// API igual le responde 401 o 403.
//
// children es el layout que se protege (DashboardLayout o PatientLayout).
function ProtectedRoute({ children, role, redirectTo = '/login' }) {
  const { isAuthenticated, role: userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}

export default ProtectedRoute;
