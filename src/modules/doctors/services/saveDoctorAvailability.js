import { instance } from '../../shared/api/axiosInstance';

export async function saveDoctorAvailability(payload, hasAvailability) {
  const method = hasAvailability ? 'put' : 'post';
  const response = await instance[method]('api/availabilities', payload);

  return response.data;
}
