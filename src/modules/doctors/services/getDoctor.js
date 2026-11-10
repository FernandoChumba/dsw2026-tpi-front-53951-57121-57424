import { instance } from '../../shared/api/axiosInstance';

export async function getDoctor(id, signal) {
  const { data } = await instance.get(`api/doctors/${encodeURIComponent(id)}`, {
    signal,
  });

  return data;
}
