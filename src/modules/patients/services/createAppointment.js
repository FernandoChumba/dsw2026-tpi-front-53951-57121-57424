import { instance } from '../../shared/api/axiosInstance';

export async function createAppointment({
  doctorId,
  availabilitySlotId,
  dni,
  reason,
}) {
  return instance.post('api/appointments', {
    doctorId,
    availabilitySlotId,
    patient: { dni },
    reason,
  });
}
