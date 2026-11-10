import { instance } from '../../shared/api/axiosInstance';

export async function deleteDoctor(id) {
  await instance.delete(`api/doctors/${encodeURIComponent(id)}`, {
    responseType: 'text',
  });
}
