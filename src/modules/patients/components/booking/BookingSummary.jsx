import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/Button';
import { formatTime } from '../../../shared/helpers/formatDate';
import { formatLongDate } from './dates';

// Resumen del horario elegido y botón para confirmar.
// Por ahora "Confirmar Turno" solo muestra el aviso: el motivo llega con F26 y
// el registro real del turno con F27.
export default function BookingSummary({ doctorName, specialtyName, slot }) {
  const navigate = useNavigate();
  const [confirmedModal, setConfirmedModal] = useState(false);

  return (
    <>
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-med-primary-200/60 bg-med-primary-50 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="border-l-4 border-med-primary-900 pl-3.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-med-text-sub">
            Resumen de Selección
          </span>
          {slot ? (
            <>
              <p className="mt-0.5 text-base font-bold text-med-primary-900 sm:text-lg">
                {formatLongDate(slot.date)}, {formatTime(slot.startTime)} HS
              </p>
              <p className="mt-0.5 text-xs text-med-text-sub">
                {doctorName} • Duración: 30 min
              </p>
            </>
          ) : (
            <p className="mt-0.5 text-sm text-med-text-sub">
              Elegí un horario disponible para continuar.
            </p>
          )}
        </div>

        <Button
          type="button"
          disabled={!slot}
          onClick={() => setConfirmedModal(true)}
          className="shrink-0 px-6 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirmar Turno ✓
        </Button>
      </div>

      {confirmedModal && slot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl sm:p-8">
            <h3 className="text-xl font-bold text-med-primary-900">
              Turno seleccionado
            </h3>
            <p className="mt-2 text-sm text-med-text-sub">
              {doctorName} ({specialtyName}) — {formatLongDate(slot.date)} a las{' '}
              {formatTime(slot.startTime)} hs.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                className="w-full"
                onClick={() => navigate('/appointments')}
              >
                Ver Mis Turnos
              </Button>
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setConfirmedModal(false)}
              >
                Volver
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
