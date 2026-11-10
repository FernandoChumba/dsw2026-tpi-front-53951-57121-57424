import { instance } from '../../shared/api/axiosInstance';

export async function updateDoctor(id, values) {
  const { data } = await instance.put(
    `api/doctors/${encodeURIComponent(id)}`,
    values
  );

  return data;
}
