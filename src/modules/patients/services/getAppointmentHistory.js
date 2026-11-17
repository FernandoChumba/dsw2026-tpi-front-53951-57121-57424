import { instance } from '../../shared/api/axiosInstance';

export async function getAppointmentHistory({
  dni,
  pageIndex,
  pageSize,
  signal,
}) {
  const response = await instance.get('api/appointments/patient/history', {
    params: { dni, pageIndex, pageSize },
    signal,
  });

  return response.data;
}
