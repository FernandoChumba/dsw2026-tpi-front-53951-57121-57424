import { Link } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';
import FormMessage from '../../../shared/components/FormMessage';
import Modal from '../../../shared/components/Modal';
import useBookingCalendar from '../../hooks/useBookingCalendar';
import { formatTime } from '../../../shared/helpers/formatDate';
import BookingSummary from './BookingSummary';
import {
  formatWeekLabel,
  getDayName,
  getDayNumber,
  getShortMonth,
} from './dates';

export default function SlotPicker({ doctorName, slots, onReload, isLoading }) {
  const {
    weekDays,
    slotsByDate,
    showWeekend,
    mobileDate,
    mobileSlots,
    selectedSlot,
    canGoToPreviousWeek,
    canGoToNextWeek,
    goToPreviousWeek,
    goToNextWeek,
    selectDate,
    selectSlot,
    confirmBooking,
    closeConflict,
    isSubmitting,
    success,
    conflict,
    error,
    isSelectionDisabled,
    isBookingDisabled,
  } = useBookingCalendar({ slots, onReload, isLoading });

  function renderSlotButton(slot, extraClass = '') {
    const isSelected =
      selectedSlot?.availabilitySlotId === slot.availabilitySlotId;

    return (
      <button
        key={slot.availabilitySlotId}
        type="button"
        aria-pressed={isSelected}
        disabled={isSelectionDisabled}
        onClick={() => selectSlot(slot)}
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

  return (
    <>
      <Card className="p-5 sm:p-6">
        {/* Cabecera: semana y flechas */}
        <div className="flex flex-col justify-between gap-3 border-b border-med-border-subtle pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Semana anterior"
              disabled={!canGoToPreviousWeek}
              onClick={goToPreviousWeek}
              className="min-h-9 min-w-9 rounded-md border border-med-border text-med-text-sub transition hover:bg-med-bg disabled:cursor-not-allowed disabled:opacity-40"
            >
              ‹
            </button>
            <span className="text-sm font-bold text-med-primary-900 sm:text-base">
              {formatWeekLabel(weekDays)}
            </span>
            <button
              type="button"
              aria-label="Semana siguiente"
              disabled={!canGoToNextWeek}
              onClick={goToNextWeek}
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
        <div
          className={`hidden gap-2 pt-5 sm:grid ${
            showWeekend ? 'sm:grid-cols-7' : 'sm:grid-cols-5'
          }`}
        >
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
                      No hay turnos disponibles para este día.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Celular: fila de días y horarios del día elegido */}
        <div className="space-y-4 pt-4 sm:hidden">
          <span className="block text-xs font-bold text-med-primary-900">
            Próximos Turnos
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {weekDays.map((day) => {
              const isActive = mobileDate === day;

              return (
                <button
                  key={day}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectDate(day)}
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
                No hay turnos disponibles para este día.
              </p>
            )}
          </div>
        </div>
      </Card>

      <BookingSummary
        doctorName={doctorName}
        slot={selectedSlot}
        onConfirm={confirmBooking}
        isSubmitting={isSubmitting}
        disabled={isBookingDisabled}
        error={error}
      />

      <Modal
        isOpen={conflict}
        title="Horario no disponible"
        onClose={closeConflict}
      >
        <div className="flex flex-col items-start gap-4">
          <FormMessage type="error">
            Ese horario acaba de dejar de estar disponible. Elegí otro.
          </FormMessage>
          <Button onClick={closeConflict}>Actualizar horarios</Button>
        </div>
      </Modal>

      <Modal
        isOpen={success}
        title="Turno confirmado"
        onClose={() => {}}
        dismissible={false}
      >
        <div className="flex flex-col items-start gap-4">
          <FormMessage type="success">
            Tu turno se reservó con éxito.
          </FormMessage>
          <Link
            to="/appointments"
            className="font-semibold text-med-primary-900 underline"
          >
            Ir a Mis turnos
          </Link>
        </div>
      </Modal>
    </>
  );
}
