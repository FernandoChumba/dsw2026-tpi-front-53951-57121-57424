import { useEffect, useState } from 'react';
import { getApiError } from '../../shared/helpers/apiError';
import { getAvailableSlots } from '../services/getAvailableSlots';

// Arma la lista de especialidades a partir de los bloques, sin repetidas.
function getSpecialties(slots) {
  const specialties = [];

  for (const slot of slots) {
    const alreadyAdded = specialties.some(
      (specialty) => specialty.id === slot.specialty.specialtyId
    );

    if (!alreadyAdded) {
      specialties.push({
        id: slot.specialty.specialtyId,
        name: slot.specialty.name,
      });
    }
  }

  return specialties;
}

// Arma la lista de médicos de una especialidad, sin repetidos.
function getDoctors(slots, specialtyId) {
  const doctors = [];

  for (const slot of slots) {
    if (slot.specialty.specialtyId !== specialtyId) continue;

    const alreadyAdded = doctors.some(
      (doctor) => doctor.id === slot.doctor.doctorId
    );

    if (!alreadyAdded) {
      doctors.push({ id: slot.doctor.doctorId, name: slot.doctor.name });
    }
  }

  return doctors;
}

// Estado de la reserva: los bloques libres y la especialidad y el médico
// elegidos. Las especialidades y los médicos salen de los mismos bloques, así
// el paciente solo ve opciones que tienen turnos disponibles.
export default function useAvailableSlots() {
  const [slots, setSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [specialtyId, setSpecialtyId] = useState('');
  const [doctorId, setDoctorId] = useState('');

  useEffect(() => {
    // Si el usuario sale de la página antes de que llegue la respuesta, se
    // descarta (mismo criterio que useDoctors).
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError('');

      try {
        const data = await getAvailableSlots();

        if (!ignore) setSlots(data);
      } catch (requestError) {
        if (!ignore) setError(getApiError(requestError).message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    load();

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const specialties = getSpecialties(slots);
  const doctors = getDoctors(slots, specialtyId);
  const selectedDoctor = doctors.find((doctor) => doctor.id === doctorId);
  const selectedSpecialty = specialties.find(
    (specialty) => specialty.id === specialtyId
  );
  // Bloques del médico elegido (los usa el calendario).
  const doctorSlots = slots.filter((slot) => slot.doctor.doctorId === doctorId);

  // Al cambiar de especialidad se limpia el médico: el anterior puede no
  // pertenecer a la nueva especialidad.
  const changeSpecialty = (id) => {
    setSpecialtyId(id);
    setDoctorId('');
  };

  const reload = () => setReloadKey((key) => key + 1);

  return {
    specialties,
    doctors,
    specialtyId,
    doctorId,
    selectedSpecialty,
    selectedDoctor,
    doctorSlots,
    isLoading,
    error,
    hasSlots: slots.length > 0,
    changeSpecialty,
    changeDoctor: setDoctorId,
    reload,
  };
}
