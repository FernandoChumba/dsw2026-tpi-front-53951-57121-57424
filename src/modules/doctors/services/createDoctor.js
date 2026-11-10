import { instance } from '../../shared/api/axiosInstance';

export async function createDoctor(values) {
  const { data } = await instance.post('api/doctors', values);

  return data;
}

export async function getDoctorSpecialties(signal) {
  const pageSize = 100;
  const fetchPage = async (pageIndex) => {
    const { data } = await instance.get('api/specialties', {
      params: { pageIndex, pageSize },
      signal,
    });

    return data;
  };
  const firstPage = await fetchPage(0);
  const remainingPages = Math.max(0, Math.ceil(firstPage.total / pageSize) - 1);
  const pages = await Promise.all(
    Array.from({ length: remainingPages }, (_, index) => fetchPage(index + 1))
  );

  return [firstPage, ...pages].flatMap(({ data }) => data);
}
