import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import FormMessage from '../../shared/components/FormMessage';
import Input from '../../shared/components/Input';
import { getApiError } from '../../shared/helpers/apiError';
import useAuth from '../hook/useAuth';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// El backend exige contraseñas de al menos 8 caracteres.
const MIN_PASSWORD_LENGTH = 8;

function AdminLoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // Evita dos envíos en paralelo aunque se presione Enter varias veces.
  const pending = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const navigate = useNavigate();
  const { signInAdmin } = useAuth();

  const onValid = async ({ email, password }) => {
    if (pending.current) return;

    pending.current = true;
    setErrorMessage('');

    try {
      await signInAdmin(email.trim(), password);
      navigate('/admin/home');
    } catch (error) {
      // getApiError traduce el 401 (credenciales incorrectas) y el 429
      // (demasiados intentos) a un mensaje claro, sin detalles técnicos.
      setErrorMessage(getApiError(error).message);
    } finally {
      pending.current = false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-med-primary-950 px-4 py-8">
      {/* Marca */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-14 h-14 bg-med-card rounded-2xl flex items-center justify-center shadow-lg mb-3">
          <svg
            className="w-8 h-8 text-med-primary-900"
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
        <h1 className="text-3xl font-semibold tracking-tight text-med-card">
          MedPortal
        </h1>
      </div>

      <div className="w-full max-w-md bg-med-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-med-primary-900">
              Bienvenido de nuevo
            </h2>
            <p className="text-sm text-med-text-sub mt-1 leading-relaxed">
              Autenticate para acceder al portal de proveedores.
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col gap-4"
          >
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="admin@ejemplo.com"
              autoComplete="username"
              error={errors.email?.message}
              {...register('email', {
                required: 'Ingresá tu correo electrónico.',
                pattern: {
                  value: EMAIL_PATTERN,
                  message: 'Ingresá un correo electrónico válido.',
                },
              })}
            />

            <div className="flex flex-col gap-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                placeholder="••••••••"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Ingresá tu contraseña.',
                  minLength: {
                    value: MIN_PASSWORD_LENGTH,
                    message: `La contraseña tiene al menos ${MIN_PASSWORD_LENGTH} caracteres.`,
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="self-end text-xs font-medium text-med-primary-700 hover:text-med-primary-900"
              >
                {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              </button>
            </div>

            {errorMessage && (
              <FormMessage type="error">{errorMessage}</FormMessage>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full min-h-11"
            >
              {isSubmitting ? 'Ingresando…' : 'Iniciar sesión →'}
            </Button>
          </form>
        </div>

        {/* Aviso de acceso seguro */}
        <div className="bg-med-primary-50 border-t border-med-primary-100 p-4 sm:p-5 flex items-start gap-3">
          <svg
            className="w-5 h-5 text-med-primary-600 shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="text-xs text-med-text-sub leading-relaxed">
            <strong className="text-med-text-main font-semibold">
              Solo acceso seguro:
            </strong>{' '}
            Este sistema es para personal médico autorizado. Los intentos de
            acceso no autorizados se registran y se monitorean.
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="text-xs text-med-primary-200 hover:text-med-card transition"
        >
          ← Volver al portal de pacientes
        </Link>
      </div>
    </div>
  );
}

export default AdminLoginPage;
