import { instance } from '../../shared/api/axiosInstance';

export async function createSpecialty(values) {
  await instance.post('api/specialties', values);
}
