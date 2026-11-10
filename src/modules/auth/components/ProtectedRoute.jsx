import { Navigate } from 'react-router-dom';
import useAuth from '../hook/useAuth';
import { ROLES } from '../constants/roles';

// Pantalla de inicio de cada rol: a dónde se manda a un usuario logueado que
// intenta entrar a una ruta que no es de su rol.
const HOME_BY_ROLE = {
  [ROLES.ADMIN]: '/admin/home',
  [ROLES.PATIENT]: '/',
};

// Protege las rutas privadas en dos pasos:
// 1. Sesión: si no hay sesión iniciada, manda al login del área (redirectTo).
// 2. Rol: si la ruta pide un rol y el usuario tiene otro, lo manda a su propio
//    inicio. Así un paciente que escribe /admin/... vuelve a /, y un
//    administrador que escribe / vuelve a /admin/home.
//    Si el rol guardado no es ninguno de los conocidos, va al login.
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
    const home = HOME_BY_ROLE[userRole] ?? redirectTo;

    return <Navigate to={home} replace />;
  }

  return children;
}

export default ProtectedRoute;
