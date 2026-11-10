import { instance } from '../../shared/api/axiosInstance';

export async function getDoctorAvailability(id, signal) {
  const { data } = await instance.get(
    `api/doctors/${encodeURIComponent(id)}/availabilities`,
    { signal }
  );

  return data;
}
