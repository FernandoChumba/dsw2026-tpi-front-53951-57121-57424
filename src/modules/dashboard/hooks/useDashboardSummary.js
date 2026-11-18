import { useCallback, useEffect, useState } from 'react';
import { getDoctors } from '../../doctors/services/getDoctors';
import { getSpecialties } from '../../specialties/services/getSpecialties';
import { getApiError } from '../../shared/helpers/apiError';
import { getTodayAppointments } from '../services/getTodayAppointments';

function useDashboardSummary() {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const [doctorCountPage, doctorPreviewPage, specialtyPage, appointments] =
        await Promise.all([
          getDoctors({ pageIndex: 0, pageSize: 1 }),
          getDoctors({ pageIndex: 0, pageSize: 3 }),
          getSpecialties({ pageIndex: 0, pageSize: 1 }),
          getTodayAppointments(),
        ]);

      if (
        !Array.isArray(doctorPreviewPage.data) ||
        !Array.isArray(appointments)
      ) {
        setError('No se pudieron cargar los indicadores del panel.');

        return;
      }

      setSummary({
        doctorsCount: doctorCountPage.total,
        doctors: doctorPreviewPage.data,
        specialtiesCount: specialtyPage.total,
        confirmedAppointmentsToday: appointments.filter(
          (appointment) => appointment.status === 'BOOKED'
        ).length,
      });
    } catch (loadError) {
      setError(getApiError(loadError).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { summary, isLoading, error, reload };
}

export default useDashboardSummary;
