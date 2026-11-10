import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AuthProvider } from './modules/auth/context/AuthProvider';
import ProtectedRoute from './modules/auth/components/ProtectedRoute';

// Auth Module
import AdminLoginPage from './modules/auth/pages/AdminLoginPage';

// Patients Module
import PatientLoginPage from './modules/patients/pages/PatientLoginPage';
import PatientLayout from './modules/patients/components/PatientLayout';
import PatientHome from './modules/patients/pages/PatientHome';
import AppointmentsPage from './modules/patients/pages/AppointmentsPage';

// Dashboard Module
import DashboardLayout from './modules/dashboard/components/DashboardLayout';
import OverviewPage from './modules/dashboard/pages/OverviewPage';

// Domain Modules (Screaming Architecture)
import DoctorsPage from './modules/doctors/pages/DoctorsPage';
import DoctorFormPage from './modules/doctors/pages/DoctorFormPage';
import DoctorAvailabilityPage from './modules/doctors/pages/DoctorAvailabilityPage';
import SpecialtiesPage from './modules/specialties/pages/SpecialtiesPage';
import SpecialtyFormPage from './modules/specialties/pages/SpecialtyFormPage';
import AppointmentsSearchPage from './modules/appointments/pages/AppointmentsSearchPage';

// Mapa completo de rutas de la aplicación. Las tareas siguientes completan
// las páginas, no agregan rutas nuevas.
const routes = [
  // Rutas públicas
  {
    path: '/login',
    element: <PatientLoginPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />,
  },

  // Rutas privadas de pacientes (reserva y "Mis turnos")
  {
    path: '/',
    element: (
      <ProtectedRoute redirectTo="/login">
        <PatientLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <PatientHome />,
      },
      {
        path: 'appointments',
        element: <AppointmentsPage />,
      },
    ],
  },

  // Rutas privadas de administración
  {
    path: '/admin',
    element: (
      <ProtectedRoute redirectTo="/admin/login">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/home" replace />,
      },
      {
        path: 'home',
        element: <OverviewPage />,
      },
      // Especialidades
      {
        path: 'specialties',
        element: <SpecialtiesPage />,
      },
      {
        path: 'specialties/new',
        element: <SpecialtyFormPage />,
      },
      {
        path: 'specialties/:id/edit',
        element: <SpecialtyFormPage />,
      },
      // Médicos
      {
        path: 'doctors',
        element: <DoctorsPage />,
      },
      {
        path: 'doctors/new',
        element: <DoctorFormPage />,
      },
      {
        path: 'doctors/:id/edit',
        element: <DoctorFormPage />,
      },
      {
        path: 'doctors/availability',
        element: <DoctorAvailabilityPage />,
      },
      // Búsqueda avanzada de turnos
      {
        path: 'appointments',
        element: <AppointmentsSearchPage />,
      },
    ],
  },

  // Redirección para cualquier otra URL
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

// El router se crea una sola vez, fuera del componente. Si se creara dentro
// de App, se volvería a crear en cada render y se perdería el estado de la
// navegación.
const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
