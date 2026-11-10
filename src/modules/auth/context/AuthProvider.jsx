import { createContext, useState } from 'react';
import { loginAdmin } from '../services/adminLogin';
import { loginPatient } from '../services/patientLogin';
import { logout } from '../services/logout';

const AuthContext = createContext();

// Claves de la sesión en localStorage. Guardarlas ahí hace que la sesión
// sobreviva a recargar la página.
// El JWT no trae el DNI del paciente, por eso se guarda desde el login.
const SESSION_KEYS = ['token', 'role', 'dni'];

const readSession = () => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  dni: localStorage.getItem('dni'),
});

// Guarda el valor, o borra la clave si no hay valor. Así nunca queda
// guardado el texto "undefined" o "null" en localStorage.
const storeOrRemove = (key, value) => {
  if (value) localStorage.setItem(key, value);
  else localStorage.removeItem(key);
};

function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const saveSession = ({ token, role = null, dni = null }) => {
    storeOrRemove('token', token);
    storeOrRemove('role', role);
    storeOrRemove('dni', dni);

    setSession({ token, role, dni });
  };

  // Los errores de login no se capturan acá: los muestra cada página con
  // getApiError (credenciales inválidas, demasiados intentos, etc.).
  const signInAdmin = async (email, password) => {
    const { token, role } = await loginAdmin(email, password);

    saveSession({ token, role });
  };

  const signInPatient = async (email, dni) => {
    const { token, role } = await loginPatient(email, dni);

    saveSession({ token, role, dni: String(dni) });
  };

  // Avisa al backend para que revoque el token, pero limpia la sesión local
  // aunque esa petición falle (por ejemplo, si el token ya venció).
  const signOut = async () => {
    try {
      await logout();
    } catch {
      // Sin acción: la sesión local se limpia igual.
    } finally {
      SESSION_KEYS.forEach((key) => localStorage.removeItem(key));
      setSession({ token: null, role: null, dni: null });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(session.token),
        role: session.role,
        dni: session.dni,
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
