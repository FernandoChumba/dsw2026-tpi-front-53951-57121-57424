// Único lugar de la aplicación que lee y escribe la sesión en localStorage.
// AuthProvider y axiosInstance usan estas funciones en vez de tocar
// localStorage directamente, así toda la sesión se maneja en un solo archivo.
//
// Se guarda en localStorage (y no en el estado de React solamente) para que
// la sesión sobreviva a recargar la página.

// Datos de la sesión:
// - token: el JWT que devuelve el login.
// - role: el rol que devuelve el login ('ADMINISTRADOR' o 'PACIENTE').
// - dni: el JWT no trae el DNI del paciente, por eso se guarda desde el login.
// - email: se muestra en el layout como dato del usuario logueado.
const SESSION_KEYS = ['token', 'role', 'dni', 'email'];

// Guarda el valor, o borra la clave si no hay valor. Así nunca queda
// guardado el texto "undefined" o "null" en localStorage.
function storeOrRemove(key, value) {
  if (value) {
    localStorage.setItem(key, value);
  } else {
    localStorage.removeItem(key);
  }
}

// Devuelve la sesión guardada. Si no hay sesión, todos los datos son null.
export function getSession() {
  return {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    dni: localStorage.getItem('dni'),
    email: localStorage.getItem('email'),
  };
}

// Devuelve solo el token, que es lo que necesita axiosInstance.
export function getToken() {
  return localStorage.getItem('token');
}

export function saveSession({ token, role = null, dni = null, email = null }) {
  storeOrRemove('token', token);
  storeOrRemove('role', role);
  storeOrRemove('dni', dni);
  storeOrRemove('email', email);
}

// Borra todos los datos de la sesión (al cerrar sesión o si el token vence).
export function clearSession() {
  for (const key of SESSION_KEYS) {
    localStorage.removeItem(key);
  }
}
