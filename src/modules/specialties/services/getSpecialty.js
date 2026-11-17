import { instance } from '../../shared/api/axiosInstance';

export async function getSpecialty(id, signal) {
  const { data } = await instance.get(
    `api/specialties/${encodeURIComponent(id)}`,
    { signal }
  );

  return data;
}
