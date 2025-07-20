import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegistrationSuccessPage from './pages/RegistrationSuccessPage';
import NotFound from './pages/NotFound';

// Dashboard Pages
import DriverDashboardPage from './pages/dashboards/DriverDashboardPage';
import AdminDashboardPage from './pages/dashboards/AdminDashboardPage';

// Auth protection
import { isAuthenticated, getUserRole } from './utils/auth';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
  const isAuth = isAuthenticated();
  const userRole = getUserRole();
  
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole && allowedRoles.includes(userRole)) {
    return children;
  }
  
  return <Navigate to="/" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/:userType" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registration-success" element={<RegistrationSuccessPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route 
            path="/driver-dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DriverDashboardPage />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/admin-dashboard/*" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;