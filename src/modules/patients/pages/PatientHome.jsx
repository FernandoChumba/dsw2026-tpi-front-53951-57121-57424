import { useState } from 'react';
import BookingFilters from '../components/booking/BookingFilters';
import DoctorSummary from '../components/booking/DoctorSummary';
import SlotPicker from '../components/booking/SlotPicker';
import useAvailableSlots from '../hooks/useAvailableSlots';

// Reserva de turno del paciente. La página solo une las partes:
// los datos y la lógica están en useAvailableSlots (página → hook → service).
function PatientHome() {
  const {
    specialties,
    doctors,
    specialtyId,
    doctorId,
    selectedSpecialty,
    selectedDoctor,
    doctorSlots,
    isLoading,
    error,
    hasSlots,
    changeSpecialty,
    changeDoctor,
    reload,
  } = useAvailableSlots();
  const [searchedDoctorId, setSearchedDoctorId] = useState('');
  const showAvailability =
    selectedDoctor && searchedDoctorId === selectedDoctor.id;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <BookingFilters
        specialties={specialties}
        doctors={doctors}
        specialtyId={specialtyId}
        doctorId={doctorId}
        isLoading={isLoading}
        error={error}
        hasSlots={hasSlots}
        onSpecialtyChange={changeSpecialty}
        onDoctorChange={changeDoctor}
        onSearch={() => setSearchedDoctorId(doctorId)}
        onRetry={reload}
      />

      {/* El resto aparece al buscar la disponibilidad del médico elegido. La key hace que
          el calendario arranque de cero al cambiar de médico, así no queda
          seleccionado un horario del médico anterior. */}
      {showAvailability && (
        <>
          <DoctorSummary
            doctor={selectedDoctor}
            specialty={selectedSpecialty}
          />
          <SlotPicker
            key={selectedDoctor.id}
            doctorName={selectedDoctor.name}
            slots={doctorSlots}
            onReload={reload}
            isLoading={isLoading || Boolean(error)}
          />
        </>
      )}
    </div>
  );
}

export default PatientHome;
