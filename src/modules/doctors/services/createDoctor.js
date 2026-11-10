import { instance } from '../../shared/api/axiosInstance';

// POST /api/doctors con { name, licenseNumber, specialtyId }.
export async function createDoctor(values) {
  const { data } = await instance.post('api/doctors', values);

  return data;
}
