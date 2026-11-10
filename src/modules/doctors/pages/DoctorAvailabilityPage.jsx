import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Card from '../../shared/components/Card';
import PageHeader from '../../shared/components/PageHeader';
import Select from '../../shared/components/Select';
import AvailabilityForm from '../components/AvailabilityForm';
import useDoctorAvailability from '../hooks/useDoctorAvailability';

export default function DoctorAvailabilityPage() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const doctorId = params.get('doctorId') ?? '';
  const { catalog, result } = useDoctorAvailability(doctorId);
  const selectedDoctor = catalog.doctors.find(({ id }) => id === doctorId);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Disponibilidad horaria"
        description="Configurá los días y horarios del profesional."
      />
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(14rem,1fr)_2fr]">
        <Card className="flex flex-col gap-4 p-4">
          <Select
            label="Profesional"
            value={selectedDoctor?.id ?? ''}
            disabled={catalog.loading || Boolean(catalog.error)}
            onChange={(event) => {
              const id = event.target.value;

              setParams(id ? { doctorId: id } : {});
            }}
          >
            <option value="">Seleccioná un médico</option>
            {catalog.doctors.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Select>
          {catalog.loading && <p role="status">Cargando médicos…</p>}
          {catalog.error && (
            <p role="alert" className="text-med-danger-text">
              {catalog.error}
            </p>
          )}
          <Link to="/admin/doctors" className="text-med-primary-700 underline">
            Volver al listado
          </Link>
        </Card>
        {selectedDoctor && !result && (
          <p role="status">Cargando disponibilidad…</p>
        )}
        {selectedDoctor && result?.error && (
          <p role="alert" className="text-med-danger-text">
            {result.error}
          </p>
        )}
        {selectedDoctor && result && !result.error && (
          <AvailabilityForm
            key={doctorId}
            initialAvailability={result.availability}
            onCancel={() => navigate('/admin/doctors')}
          />
        )}
        {!catalog.loading && !catalog.error && !selectedDoctor && (
          <p>
            {doctorId
              ? 'No se encontró el médico.'
              : 'Seleccioná un médico para ver sus horarios.'}
          </p>
        )}
      </div>
    </div>
  );
}
