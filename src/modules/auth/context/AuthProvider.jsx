import { createContext, useState } from 'react';
import { loginAdmin } from '../services/adminLogin';
import { loginPatient } from '../services/patientLogin';
import { logout } from '../services/logout';
import {
  clearSession,
  getSession,
  saveSession,
} from '../../shared/helpers/session';

const AuthContext = createContext();

// El provider guarda la sesión en el estado de React (para que la interfaz se
// actualice al iniciar o cerrar sesión) y en localStorage mediante el helper
// session.js (para que sobreviva a recargar la página).
function AuthProvider({ children }) {
  // Al cargar la aplicación se recupera la sesión que haya quedado guardada.
  // Sin esto, al recargar la página el usuario volvería al login aunque su
  // token siga guardado.
  const [session, setSession] = useState(getSession);

  const startSession = (data) => {
    saveSession(data);
    setSession(getSession());
  };

  // Los errores de login no se capturan acá: los muestra cada página con
  // getApiError (credenciales inválidas, demasiados intentos, etc.).
  const signInAdmin = async (email, password) => {
    const { token, role } = await loginAdmin(email, password);

    startSession({ token, role, email });
  };

  const signInPatient = async (email, dni) => {
    const { token, role } = await loginPatient(email, dni);

    startSession({ token, role, dni: String(dni), email });
  };

  // Avisa al backend para que revoque el token, pero limpia la sesión local
  // aunque esa petición falle (por ejemplo, si el token ya venció).
  const signOut = async () => {
    try {
      await logout();
    } catch {
      // Sin acción: la sesión local se limpia igual.
    } finally {
      clearSession();
      setSession(getSession());
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(session.token),
        role: session.role,
        dni: session.dni,
        email: session.email,
        signInAdmin,
        signInPatient,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
