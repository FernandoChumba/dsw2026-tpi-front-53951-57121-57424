import { instance } from '../../shared/api/axiosInstance';

export async function updateSpecialty(id, values) {
  await instance.put(`api/specialties/${encodeURIComponent(id)}`, values);
}
