export const FIELD_LIMITS = {
  dni: 8,
  email: 150,
  adminEmail: 256,
  name: 100,
  description: 100,
  licenseNumber: 20,
  reason: 500,
  search: 100,
};

export const NAME_PATTERN = {
  value: /^[\p{L}\s.'-]+$/u,
  message: 'Usá solo letras, espacios, puntos y guiones.',
};

export function digitsOnly(field) {
  return {
    ...field,
    onChange: (event) => {
      event.target.value = event.target.value.replace(/\D/g, '');

      return field.onChange(event);
    },
  };
}
