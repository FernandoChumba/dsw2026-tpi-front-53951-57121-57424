import { instance } from '../../shared/api/axiosInstance';

// GET /api/availability-slots (rol Paciente).
// Devuelve, sin paginar, solo los bloques libres y futuros:
// [{ availabilitySlotId, date, startTime, endTime,
//    doctor: { doctorId, name }, specialty: { specialtyId, name } }]
// El paciente no puede usar /api/specialties ni /api/doctors (responden 403),
// por eso las especialidades y los médicos se sacan de estos bloques.
export async function getAvailableSlots() {
  const response = await instance.get('api/availability-slots');

  return response.data;
}
