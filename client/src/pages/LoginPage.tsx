import { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { isAuthenticated, getUserRole, redirectToRoleDashboard } from '@/utils/auth';

const LoginPage = () => {
  const { userType = 'farmer' } = useParams<{ userType?: 'farmer' | 'trader' | 'driver' | 'admin' }>();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      const role = getUserRole();
      if (role) {
        navigate(redirectToRoleDashboard(role));
      }
    }
  }, [navigate]);

  const userTypeTitle = {
    farmer: 'Farmer',
    trader: 'Trader',
    driver: 'Driver',
    admin: 'Admin',
  }[userType] || 'User';

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="max-w-md mx-auto vunahub-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{userTypeTitle} Login</h1>
            <p className="text-gray-600">
              Welcome back! Please enter your credentials to continue.
            </p>
          </div>

          <LoginForm userType={userType} />

          <div className="mt-8 pt-6 border-t text-center text-gray-600">
            <p>
              Don't have an account?{' '}
              {userType === 'farmer' || userType === 'trader' ? (
                <Link to="/register" className="text-vunahub-600 hover:underline font-medium">
                  Register now
                </Link>
              ) : (
                <span>Please contact the administrator</span>
              )}
            </p>
          </div>

          <div className="mt-6 text-center">
            <div className="flex justify-center space-x-4 text-sm">
              <Link to="/login/farmer" className={`${userType === 'farmer' ? 'text-vunahub-600 font-medium' : 'text-gray-600 hover:text-vunahub-600'}`}>
                Farmer Login
              </Link>
              <Link to="/login/trader" className={`${userType === 'trader' ? 'text-vunahub-600 font-medium' : 'text-gray-600 hover:text-vunahub-600'}`}>
                Trader Login
              </Link>
              <Link to="/login/driver" className={`${userType === 'driver' ? 'text-vunahub-600 font-medium' : 'text-gray-600 hover:text-vunahub-600'}`}>
                Driver Login
              </Link>
              <Link to="/login/admin" className={`${userType === 'admin' ? 'text-vunahub-600 font-medium' : 'text-gray-600 hover:text-vunahub-600'}`}>
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default LoginPage;