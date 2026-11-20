import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/hook/useAuth';
import { getInitials } from '../../shared/helpers/getInitials';

function PatientLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Los datos del usuario logueado salen de la sesión (useAuth), no se
  // escriben a mano en el layout.
  const { signOut, email } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const getNavLinkClass = ({ isActive }) =>
    `px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
      isActive
        ? 'bg-med-primary-900 text-white'
        : 'text-med-text-sub hover:bg-med-primary-50 hover:text-med-primary-900'
    }`;

  return (
    <div className="min-h-screen bg-med-bg flex flex-col">
      {/* Header Responsivo */}
      <header className="bg-white shadow-xs border-b border-med-border sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo y Enlaces Desktop */}
          <div className="flex items-center gap-6 sm:gap-8">
            <NavLink to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-med-primary-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-med-primary-900 tracking-tight">
                Portal Salud
              </span>
            </NavLink>

            {/* Enlaces de Navegación Desktop */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" end className={getNavLinkClass}>
                Reservar Turno
              </NavLink>
              <NavLink to="/appointments" className={getNavLinkClass}>
                Mis Turnos
              </NavLink>
            </nav>
          </div>

          {/* Acciones Derecha Desktop / Mobile Avatar */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Avatar Paciente */}
            <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-med-border">
              <div className="w-8 h-8 rounded-full bg-med-primary-100 text-med-primary-900 font-bold text-xs flex items-center justify-center border border-med-primary-200">
                {getInitials(email)}
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold text-med-text-main">
                {email}
              </span>
            </div>

            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex text-xs font-semibold text-med-text-sub hover:text-red-600 px-2.5 py-1.5 rounded-lg border border-med-border hover:bg-red-50/40 transition"
            >
              Salir
            </button>

            {/* Botón hamburguesa móvil */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="patient-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border border-med-border text-med-text-sub hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-med-primary-600"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desplegable móvil */}
        <div
          id="patient-mobile-menu"
          hidden={!mobileMenuOpen}
          className="md:hidden border-t border-med-border px-4 py-3 bg-white space-y-2"
        >
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                isActive
                  ? 'bg-med-primary-900 text-white'
                  : 'text-med-text-sub hover:bg-med-primary-50'
              }`
            }
          >
            Reservar Turno
          </NavLink>
          <NavLink
            to="/appointments"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-semibold transition ${
                isActive
                  ? 'bg-med-primary-900 text-white'
                  : 'text-med-text-sub hover:bg-med-primary-50'
              }`
            }
          >
            Mis Turnos
          </NavLink>
          <div className="pt-2 border-t border-med-border-subtle flex items-center justify-between">
            <span className="text-xs font-medium text-med-text-sub">
              Paciente: {email}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-red-600"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default PatientLayout;
