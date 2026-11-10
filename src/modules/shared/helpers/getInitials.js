// Devuelve las dos primeras letras del texto en mayúsculas, para el círculo
// del avatar en los layouts. Ej.: 'admin@ejemplo.com' → 'AD'.
// Si no hay texto, devuelve una cadena vacía.
export function getInitials(text) {
  if (!text) {
    return '';
  }

  return text.slice(0, 2).toUpperCase();
}
