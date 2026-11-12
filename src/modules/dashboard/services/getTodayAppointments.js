import { instance } from '../../shared/api/axiosInstance';

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return year + '-' + month + '-' + day;
}

export async function getTodayAppointments() {
  const response = await instance.get('api/appointments', {
    params: { date: getTodayDate() },
  });

  if (!Array.isArray(response.data)) {
    throw new Error(
      'La API devolvio los turnos de hoy con un formato inesperado.'
    );
  }

  return response.data;
}
