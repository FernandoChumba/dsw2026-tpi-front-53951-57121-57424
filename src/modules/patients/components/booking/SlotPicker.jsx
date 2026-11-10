import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import Card from '../../../shared/components/Card';

// Calendario de horarios, resumen y confirmación de la reserva.
// Los días y horarios son datos de ejemplo: F25 los reemplaza por los bloques
// reales del médico, F26 agrega el motivo y F27 registra el turno.
export default function SlotPicker({ doctorName, specialtyName }) {
  const navigate = useNavigate();

  // Días de la semana disponible
  const weekDays = [
    { dayName: 'LUN', dateNumber: '22', fullDate: 'Lunes 22 de Mayo de 2024' },
    { dayName: 'MAR', dateNumber: '23', fullDate: 'Martes 23 de Mayo de 2024' },
    {
      dayName: 'MIE',
      dateNumber: '24',
      fullDate: 'Miércoles 24 de Mayo de 2024',
    },
    { dayName: 'JUE', dateNumber: '25', fullDate: 'Jueves 25 de Mayo de 2024' },
    {
      dayName: 'VIE',
      dateNumber: '26',
      fullDate: 'Viernes 26 de Mayo de 2024',
    },
  ];

  // Horarios por día
  const slotsByDay = {
    22: ['08:00', '08:30', '09:00', '09:30', '10:00', '11:30'],
    23: ['08:00', '09:00', '10:30', '11:00', '12:30'],
    24: ['08:30', '09:30', '11:00', '11:30'],
    25: [], // Sin turnos disponibles
    26: ['08:00', '08:30', '09:00', '14:00', '14:30'],
  };

  // Día y slot horario seleccionado
  const [selectedDayNumber, setSelectedDayNumber] = useState('22');
  const [selectedSlot, setSelectedSlot] = useState('09:30');
  const [confirmedModal, setConfirmedModal] = useState(false);

  const selectedDayObj =
    weekDays.find((d) => d.dateNumber === selectedDayNumber) || weekDays[0];

  const handleSelectSlot = (dayNum, slot) => {
    setSelectedDayNumber(dayNum);
    setSelectedSlot(slot);
  };

  const handleConfirmAppointment = () => {
    setConfirmedModal(true);
  };

  return (
    <>
      {/* 3. Selector Semanal de Disponibilidad */}
      <Card className="p-5 sm:p-6 border-med-border">
        {/* Cabecera del calendario de semana */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-med-border-subtle">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-1 rounded-md border border-med-border hover:bg-gray-50 text-med-text-sub transition"
            >
              ‹
            </button>
            <span className="font-bold text-sm sm:text-base text-med-primary-900">
              Lunes 22 - Viernes 26, Mayo
            </span>
            <button
              type="button"
              className="p-1 rounded-md border border-med-border hover:bg-gray-50 text-med-text-sub transition"
            >
              ›
            </button>
          </div>

          {/* Leyenda */}
          <div className="flex items-center gap-4 text-xs text-med-text-sub">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-med-primary-900" />
              Disponible
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Seleccionado
            </span>
          </div>
        </div>

        {/* --- A) VISTA DESKTOP: Grid semanal de 5 columnas (visible en sm+) --- */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-3 pt-5">
          {weekDays.map((day) => {
            const slots = slotsByDay[day.dateNumber] || [];

            return (
              <div
                key={day.dateNumber}
                className="flex flex-col items-center gap-3"
              >
                {/* Cabecera del día */}
                <div className="text-center">
                  <span className="text-[11px] font-bold text-med-text-sub uppercase">
                    {day.dayName}
                  </span>
                  <p className="text-xl font-bold text-med-primary-900 leading-tight">
                    {day.dateNumber}
                  </p>
                </div>

                {/* Slots del día */}
                <div className="w-full flex flex-col gap-2">
                  {slots.length > 0 ? (
                    slots.map((slot) => {
                      const isSelected =
                        selectedDayNumber === day.dateNumber &&
                        selectedSlot === slot;

                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => handleSelectSlot(day.dateNumber, slot)}
                          className={`w-full py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-center ${
                            isSelected
                              ? 'bg-emerald-400 text-white border-emerald-400 shadow-sm'
                              : 'bg-white border-med-border text-med-primary-900 hover:border-med-primary-600 hover:bg-med-primary-50/50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })
                  ) : (
                    <div className="h-44 flex items-center justify-center text-center p-2">
                      <p className="text-xs text-med-text-muted leading-relaxed">
                        No hay turnos disponibles para este día.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- B) VISTA MOBILE: Selector de días horizontal + Horarios en bloques (visible en mobile) --- */}
        <div className="block sm:hidden pt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-med-text-main">
                Próximos Turnos
              </span>
              <span className="text-xs font-semibold text-med-primary-700">
                Ver más ›
              </span>
            </div>

            {/* Días en fila desplazable */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {weekDays.map((day) => {
                const isActive = selectedDayNumber === day.dateNumber;

                return (
                  <button
                    key={day.dateNumber}
                    type="button"
                    onClick={() => {
                      setSelectedDayNumber(day.dateNumber);
                      const availableSlots = slotsByDay[day.dateNumber] || [];

                      if (
                        availableSlots.length > 0 &&
                        !availableSlots.includes(selectedSlot)
                      ) {
                        setSelectedSlot(availableSlots[0]);
                      }
                    }}
                    className={`flex-1 min-w-[68px] py-2.5 px-2 rounded-xl text-center border transition-all ${
                      isActive
                        ? 'bg-med-primary-900 text-white border-med-primary-900 shadow-sm'
                        : 'bg-white border-med-border text-med-text-main hover:bg-gray-50'
                    }`}
                  >
                    <span
                      className={`block text-[10px] font-bold uppercase ${
                        isActive ? 'text-white/80' : 'text-med-text-sub'
                      }`}
                    >
                      {day.dayName}
                    </span>
                    <span className="block text-base font-extrabold my-0.5">
                      {day.dateNumber}
                    </span>
                    <span
                      className={`block text-[10px] uppercase ${
                        isActive ? 'text-white/80' : 'text-med-text-muted'
                      }`}
                    >
                      MAY
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Horarios disponibles para el día seleccionado en mobile */}
          <div>
            <span className="block text-xs font-bold text-med-text-sub mb-2.5">
              Horarios disponibles (Bloques de 30 min)
            </span>

            {slotsByDay[selectedDayNumber]?.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {slotsByDay[selectedDayNumber].map((slot) => {
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleSelectSlot(selectedDayNumber, slot)}
                      className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                        isSelected
                          ? 'border-2 border-med-primary-900 bg-white text-med-primary-900 font-bold shadow-xs'
                          : 'bg-white border-med-border text-med-text-main hover:bg-gray-50'
                      }`}
                    >
                      {slot} AM
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-6 bg-gray-50 border border-med-border rounded-xl text-center">
                <p className="text-xs text-med-text-muted">
                  No hay turnos disponibles para este día seleccionado.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 4. Banner / Resumen de Selección y Confirmación */}
      <div className="bg-med-primary-50 border border-med-primary-200/60 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Detalle del Turno */}
        <div className="border-l-4 border-med-primary-900 pl-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-med-text-sub">
            Resumen de Selección
          </span>
          <p className="text-base sm:text-lg font-bold text-med-primary-900 mt-0.5 flex items-center gap-2">
            <span>📅</span>
            <span>
              {selectedDayObj.fullDate}, {selectedSlot} HS
            </span>
          </p>
          <p className="text-xs text-med-text-sub mt-0.5">Duración: 30 min</p>
        </div>

        {/* Botón de Confirmación */}
        <Button
          type="button"
          onClick={handleConfirmAppointment}
          className="flex items-center justify-center gap-2 bg-med-primary-900 hover:bg-med-primary-800 text-white font-medium py-3 px-6 rounded-xl shadow-md text-sm shrink-0"
        >
          <span>Confirmar Turno</span>
          <svg
            className="w-5 h-5 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
      </div>

      {/* Modal de Confirmación Exitosa */}
      {confirmedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center animate-in fade-in zoom-in duration-150">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-xl font-bold text-med-primary-900">
              ¡Turno Confirmado con Éxito!
            </h3>
            <p className="text-xs text-med-text-sub mt-2 leading-relaxed">
              Tu turno con el{' '}
              <strong className="text-med-text-main">{doctorName}</strong> ha
              sido reservado para el{' '}
              <strong className="text-med-text-main">
                {selectedDayObj.fullDate} a las {selectedSlot} hs
              </strong>
              .
            </p>

            <div className="mt-5 p-3.5 bg-med-primary-50 border border-med-primary-200/60 rounded-xl text-xs text-med-primary-900 text-left space-y-1">
              <p>
                <strong>Especialidad:</strong> {specialtyName}
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                className="w-full text-xs py-2.5"
                onClick={() => navigate('/appointments')}
              >
                Ver Mis Turnos
              </Button>
              <Button
                variant="secondary"
                className="w-full text-xs py-2.5"
                onClick={() => setConfirmedModal(false)}
              >
                Reservar Otro
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
