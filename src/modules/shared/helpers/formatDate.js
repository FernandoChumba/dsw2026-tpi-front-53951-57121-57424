const formatter = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});

export function formatDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return '';

  const date = new Date(value + 'T00:00:00Z');

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value)
    return '';

  return formatter.format(date);
}

export function formatTime(value) {
  if (
    typeof value !== 'string' ||
    !/^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(value)
  )
    return '';

  return value.slice(0, 5);
}
