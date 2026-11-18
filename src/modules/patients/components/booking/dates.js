// Ayudas para manejar las fechas del calendario de reserva.
// Todas las fechas se manejan como texto 'YYYY-MM-DD' (el mismo formato que
// devuelve el backend) y se calculan en UTC, igual que formatDate.js. Así no
// hay corrimientos de un día por la zona horaria del navegador.

const DAY_NAMES = ['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
const DAY_NAMES_LONG = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

function toDate(isoDate) {
  return new Date(isoDate + 'T00:00:00Z');
}

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

// Fecha de hoy según el reloj del usuario, en formato 'YYYY-MM-DD'.
export function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${now.getFullYear()}-${month}-${day}`;
}

export function addDays(isoDate, days) {
  const date = toDate(isoDate);

  date.setUTCDate(date.getUTCDate() + days);

  return toIsoDate(date);
}

// Lunes de la semana de esa fecha. getUTCDay() devuelve 0 para el domingo,
// por eso el domingo retrocede 6 días.
export function getMonday(isoDate) {
  const dayOfWeek = toDate(isoDate).getUTCDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  return addDays(isoDate, -daysSinceMonday);
}

// Los días de la semana que empieza en ese lunes: 7 por defecto, 5 sin el fin de semana.
export function getWeekDays(monday, length = 7) {
  const days = [];

  for (let i = 0; i < length; i++) {
    days.push(addDays(monday, i));
  }

  return days;
}

export function isWeekend(isoDate) {
  const dayOfWeek = toDate(isoDate).getUTCDay();

  return dayOfWeek === 0 || dayOfWeek === 6;
}

// 'LUN', 'MAR', ...
export function getDayName(isoDate) {
  return DAY_NAMES[toDate(isoDate).getUTCDay()];
}

// Número de día: '2026-11-03' → '3'.
export function getDayNumber(isoDate) {
  return String(toDate(isoDate).getUTCDate());
}

// Mes abreviado en mayúsculas: 'NOV'.
export function getShortMonth(isoDate) {
  return MONTH_NAMES[toDate(isoDate).getUTCMonth()].slice(0, 3).toUpperCase();
}

// 'Lunes 3 de Noviembre de 2026'
export function formatLongDate(isoDate) {
  const date = toDate(isoDate);

  return `${DAY_NAMES_LONG[date.getUTCDay()]} ${date.getUTCDate()} de ${
    MONTH_NAMES[date.getUTCMonth()]
  } de ${date.getUTCFullYear()}`;
}

// Título de la semana: 'Lunes 3 - Viernes 7, Noviembre'.
export function formatWeekLabel(weekDays) {
  const first = toDate(weekDays[0]);
  const last = toDate(weekDays[weekDays.length - 1]);

  return `${DAY_NAMES_LONG[first.getUTCDay()]} ${first.getUTCDate()} - ${
    DAY_NAMES_LONG[last.getUTCDay()]
  } ${last.getUTCDate()}, ${MONTH_NAMES[last.getUTCMonth()]}`;
}
