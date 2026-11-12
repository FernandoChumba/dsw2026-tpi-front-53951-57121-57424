import { instance } from '../../shared/api/axiosInstance';

export async function searchAppointments(filters) {
  const response = await instance.get('api/appointments/search', {
    params: { pageIndex: 0, pageSize: 10, ...filters },
  });

  return response.data;
}
