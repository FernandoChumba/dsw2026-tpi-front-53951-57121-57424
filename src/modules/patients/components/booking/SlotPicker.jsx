import { useState } from 'react';
import Card from '../../../shared/components/Card';
import { formatTime } from '../../../shared/helpers/formatDate';
import BookingSummary from './BookingSummary';
import {
  addDays,
  formatWeekLabel,
  getDayName,
  getDayNumber,
  getMonday,
  getShortMonth,
  getToday,
  getWeekDays,
} from './dates';

// Agrupa los bloques por fecha: { '2026-11-10': [bloque, bloque], ... }
function groupByDate(slots) {
  const groups = {};

  for (const slot of slots) {
    if (!groups[slot.date]) {
      groups[slot.date] = [];
    }

    groups[slot.date].push(slot);
  }

  return groups;
}

// Ordena por fecha y hora. Las dos son texto con formato fijo
// ('YYYY-MM-DD' y 'HH:mm'), así que se pueden comparar como texto.
function sortSlots(slots) {
  return [...slots].sort((a, b) =>
    (a.date + a.startTime).localeCompare(b.date + b.startTime)
  );
}

// Calendario semanal con los bloques libres del médico elegido.
// - slots: bloques del médico, tal como los devuelve el backend.
// El backend ya devuelve solo bloques libres y futuros: acá no se filtra.
export default function SlotPicker({ doctorName, specialtyName, slots }) {
  const sortedSlots = sortSlots(slots);
  const slotsByDate = groupByDate(sortedSlots);

  // Límites de la navegación: no se puede ir antes de la semana actual ni
  // después de la semana del último bloque.
  const currentMonday = getMonday(getToday());
  const lastMonday =
    sortedSlots.length > 0
      ? getMonday(sortedSlots[sortedSlots.length - 1].date)
      : currentMonday;

  // La primera semana que se muestra es la del primer bloque libre, para no
  // arrancar en una semana vacía.
  const firstMonday =
    sortedSlots.length > 0 ? getMonday(sortedSlots[0].date) : currentMonday;

  const [monday, setMonday] = useState(firstMonday);
  const [selectedSlot, setSelectedSlot] = useState(null);
  // Día abierto en la vista de celular (muestra los horarios de ese día).
  const [mobileDate, setMobileDate] = useState(
    sortedSlots.length > 0 ? sortedSlots[0].date : firstMonday
  );

  const weekDays = getWeekDays(monday);

  // Al cambiar de semana, en el celular se abre el primer día con bloques.
  function goToWeek(newMonday) {
    setMonday(newMonday);

    const newWeek = getWeekDays(newMonday);
    const firstDayWithSlots = newWeek.find((day) => slotsByDate[day]);

    setMobileDate(firstDayWithSlots ?? newMonday);
  }

  function renderSlotButton(slot, extraClass = '') {
    const isSelected =
      selectedSlot?.availabilitySlotId === slot.availabilitySlotId;

    return (
      <button
        key={slot.availabilitySlotId}
        type="button"
        aria-pressed={isSelected}
        onClick={() => setSelectedSlot(slot)}
        className={`w-full rounded-lg border px-2 py-2 text-center text-xs font-semibold transition-all ${extraClass} ${
          isSelected
            ? 'border-emerald-400 bg-emerald-400 text-white shadow-sm'
            : 'border-med-border bg-white text-med-primary-900 hover:border-med-primary-600 hover:bg-med-primary-50/50'
        }`}
      >
        {formatTime(slot.startTime)}
      </button>
    );
  }

  const mobileSlots = slotsByDate[mobileDate] ?? [];

  return (
    <>
      <Card className="p-5 sm:p-6">
        {/* Cabecera: semana y flechas */}
        <div className="flex flex-col justify-between gap-3 border-b border-med-border-subtle pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Semana anterior"
              disabled={monday <= currentMonday}
              onClick={() => goToWeek(addDays(monday, -7))}
              className="min-h-9 min-w-9 rounded-md border border-med-border text-med-text-sub transition hover:bg-med-bg disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            <span className="text-sm font-bold text-med-primary-900 sm:text-base">
              {formatWeekLabel(monday)}
            </span>
            <button
              type="button"
              aria-label="Semana siguiente"
              disabled={monday >= lastMonday}
              onClick={() => goToWeek(addDays(monday, 7))}
              className="min-h-9 min-w-9 rounded-md border border-med-border text-med-text-sub transition hover:bg-med-bg disabled:cursor-not-allowed disabled:opacity-40"
            >
              ›
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-med-text-sub">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-med-primary-900" />
              Disponible
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Seleccionado
            </span>
          </div>
        </div>

        {/* Escritorio: una columna por día */}
        <div className="hidden gap-2 pt-5 sm:grid sm:grid-cols-7">
          {weekDays.map((day) => {
            const daySlots = slotsByDate[day] ?? [];

            return (
              <div key={day} className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <span className="text-[11px] font-bold uppercase text-med-text-sub">
                    {getDayName(day)}
                  </span>
                  <p className="text-xl font-bold leading-tight text-med-primary-900">
                    {getDayNumber(day)}
                  </p>
                </div>

                <div className="flex w-full flex-col gap-2">
                  {daySlots.length > 0 ? (
                    daySlots.map((slot) => renderSlotButton(slot))
                  ) : (
                    <p className="px-1 py-6 text-center text-xs text-med-text-muted">
                      Sin disponibilidad
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Celular: fila de días y horarios del día elegido */}
        <div className="space-y-4 pt-4 sm:hidden">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {weekDays.map((day) => {
              const isActive = mobileDate === day;

              return (
                <button
                  key={day}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setMobileDate(day)}
                  className={`min-w-[64px] flex-1 rounded-xl border px-2 py-2.5 text-center transition-all ${
                    isActive
                      ? 'border-med-primary-900 bg-med-primary-900 text-white shadow-sm'
                      : 'border-med-border bg-white text-med-text-main'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase">
                    {getDayName(day)}
                  </span>
                  <span className="my-0.5 block text-base font-extrabold">
                    {getDayNumber(day)}
                  </span>
                  <span className="block text-[10px] uppercase">
                    {getShortMonth(day)}
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            <span className="mb-2.5 block text-xs font-bold text-med-text-sub">
              Horarios disponibles (Bloques de 30 min)
            </span>
            {mobileSlots.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {mobileSlots.map((slot) => renderSlotButton(slot))}
              </div>
            ) : (
              <p className="rounded-xl border border-med-border bg-med-bg p-6 text-center text-xs text-med-text-muted">
                Sin disponibilidad
              </p>
            )}
          </div>
        </div>
      </Card>

      <BookingSummary
        doctorName={doctorName}
        specialtyName={specialtyName}
        slot={selectedSlot}
      />
    </>
  );
}
