import { instance } from '../../shared/api/axiosInstance';

export async function deleteSpecialty(id) {
  await instance.delete(`api/specialties/${encodeURIComponent(id)}`, {
    responseType: 'text',
  });
}
