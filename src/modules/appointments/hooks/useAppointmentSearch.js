import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { getDoctors } from '../../doctors/services/getDoctors';
import { getSpecialties } from '../../specialties/services/getSpecialties';
import { getApiError } from '../../shared/helpers/apiError';
import { searchAppointments } from '../services/searchAppointments';

const EMPTY_FILTERS = { dni: '', specialtyId: '', doctorId: '', date: '' };

async function getAllPages(getPage) {
  const items = [];
  let pageIndex = 0;
  let page;

  do {
    page = await getPage({ pageIndex, pageSize: 100 });
    items.push(...page.data);
    pageIndex += 1;
  } while (page.data.length > 0 && items.length < page.total);

  return items;
}

export default function useAppointmentSearch() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm({ defaultValues: EMPTY_FILTERS });
  const specialtyId = useWatch({ control, name: 'specialtyId' });
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState('');
  const [optionsKey, setOptionsKey] = useState(0);
  const [query, setQuery] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function loadOptions() {
      setOptionsLoading(true);
      setOptionsError('');
      try {
        const [specialtyList, doctorList] = await Promise.all([
          getAllPages(getSpecialties),
          getAllPages(getDoctors),
        ]);

        if (!ignore) {
          setSpecialties(specialtyList);
          setDoctors(doctorList);
        }
      } catch (requestError) {
        if (!ignore) setOptionsError(getApiError(requestError).message);
      } finally {
        if (!ignore) setOptionsLoading(false);
      }
    }
    loadOptions();

    return () => {
      ignore = true;
    };
  }, [optionsKey]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setIsLoading(true);
      setError('');
      try {
        const result = await searchAppointments(query);

        if (!ignore) setAppointments(result.data);
      } catch (requestError) {
        if (!ignore) setError(getApiError(requestError).message);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }
    load();

    return () => {
      ignore = true;
    };
  }, [query]);

  function changeSpecialty(event) {
    const selected = doctors.find(
      (doctor) => doctor.id === getValues('doctorId')
    );

    if (
      selected &&
      event.target.value &&
      selected.specialty?.id !== event.target.value
    ) {
      setValue('doctorId', '');
    }
  }

  const apply = handleSubmit((values) => {
    const entries = Object.entries(values).map(([key, value]) => [
      key,
      String(value ?? '').trim(),
    ]);

    setQuery(Object.fromEntries(entries.filter(([, value]) => value)));
  });

  function clear() {
    reset(EMPTY_FILTERS);
    setQuery({});
  }

  return {
    register,
    errors,
    apply,
    clear,
    changeSpecialty,
    specialties,
    doctors: specialtyId
      ? doctors.filter((doctor) => doctor.specialty?.id === specialtyId)
      : doctors,
    optionsLoading,
    optionsError,
    retryOptions: () => setOptionsKey((key) => key + 1),
    appointments,
    isLoading,
    error,
    retry: () => setQuery((current) => ({ ...current })),
  };
}
