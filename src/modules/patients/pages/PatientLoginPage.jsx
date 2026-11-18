import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import FormMessage from '../../shared/components/FormMessage';
import Input from '../../shared/components/Input';
import useAuth from '../../auth/hook/useAuth';
import { getApiError } from '../../shared/helpers/apiError';

// Formato de correo simple: algo@algo.algo
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// El backend acepta DNI de 7 u 8 dígitos, solo números.
const DNI_PATTERN = /^\d{7,8}$/;

// Login del paciente: no hay contraseña, se ingresa con correo y DNI.
// Si el paciente no existe, el backend lo registra en el mismo login
// (alta automática), así que no hace falta una pantalla de registro.
function PatientLoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  // Evita el doble envío: el ref cambia al instante, isSubmitting recién se
  // actualiza en el próximo render.
  const pending = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', dni: '' } });

  const navigate = useNavigate();
  const { signInPatient } = useAuth();

  const onValid = async ({ email, dni }) => {
    if (pending.current) return;

    pending.current = true;
    setErrorMessage('');

    try {
      // signInPatient guarda token, rol, DNI y correo en la sesión.
      await signInPatient(email.trim(), dni.trim());
      navigate('/');
    } catch (error) {
      const apiError = getApiError(error);

      // 401: el correo ya está registrado con otro DNI. El mensaje general de
      // getApiError habla de "contraseña", que en este login no existe.
      // Otros errores (por ejemplo 429, demasiados intentos) usan el mensaje
      // general.
      if (apiError.code === 'AUTHENTICATION_FAILED') {
        setErrorMessage('El DNI no coincide con el del correo ingresado.');
      } else {
        setErrorMessage(apiError.message);
      }
    } finally {
      pending.current = false;
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-med-primary-950 px-4 py-8">
      <div className="mb-8 flex flex-col items-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-med-card shadow-lg">
          <svg
            className="h-8 w-8 text-med-primary-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <p className="text-3xl font-semibold tracking-tight text-med-card">
          MedPortal
        </p>
      </div>

      <div className="w-full max-w-md rounded-2xl bg-med-card p-6 shadow-2xl sm:p-10">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-med-primary-900">
            Portal del Paciente
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-med-text-sub">
            Iniciá sesión para reservar y consultar tus turnos médicos.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-4"
        >
          <Input
            label="Correo Electrónico"
            type="email"
            autoComplete="email"
            placeholder="paciente@ejemplo.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Ingresá tu correo electrónico.',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Ingresá un correo electrónico válido.',
              },
            })}
          />

          {/* type="text" con inputMode numérico: muestra el teclado de
              números en el celular sin perder los ceros a la izquierda. */}
          <Input
            label="DNI"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Número de documento"
            error={errors.dni?.message}
            {...register('dni', {
              required: 'Ingresá tu DNI.',
              pattern: {
                value: DNI_PATTERN,
                message: 'El DNI debe tener 7 u 8 números, sin puntos.',
              },
            })}
          />

          {errorMessage && (
            <FormMessage type="error">{errorMessage}</FormMessage>
          )}

          <Button
            type="submit"
            className="mt-2 min-h-11 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ingresando…' : 'Ingresar Paciente'}
          </Button>
        </form>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/admin/login"
          className="text-xs text-med-primary-200 transition hover:text-med-card"
        >
          ¿Sos personal administrativo o médico? Ingresá acá →
        </Link>
      </div>
    </div>
  );
}

export default PatientLoginPage;
