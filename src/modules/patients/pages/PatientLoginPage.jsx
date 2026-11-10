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
    <div className="flex min-h-screen flex-col bg-med-bg">
      {/* Barra superior con la marca, como en el mockup (sin enlaces: no hay
          páginas de inicio, soporte ni ayuda). */}
      <header className="border-b border-med-border bg-med-card px-4 py-4 sm:px-8">
        <p className="text-xl font-bold text-med-primary-700">MedPortal</p>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-med-border bg-med-card p-6 shadow-lg sm:p-10">
          <div className="mb-6 text-center">
            <p className="text-2xl font-bold text-med-primary-700">MedPortal</p>
            <h1 className="mt-3 text-2xl font-semibold text-med-text-main">
              Acceso al Paciente
            </h1>
            <p className="mt-2 text-sm text-med-text-sub">
              Ingresá tu correo y tu DNI para continuar.
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
              placeholder="ejemplo@correo.com"
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
              label="DNI / Número de Identificación"
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
              className="mt-1 min-h-11 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ingresando…' : 'Ingresar al Portal Médico →'}
            </Button>
          </form>

          <div className="mt-6 border-t border-med-border pt-4 text-center">
            <Link
              to="/admin/login"
              className="text-sm font-medium text-med-primary-700 hover:underline"
            >
              ¿Sos personal administrativo? Ingresá acá
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientLoginPage;
