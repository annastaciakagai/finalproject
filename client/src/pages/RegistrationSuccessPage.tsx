import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

interface LocationState {
  userType?: 'farmer' | 'trader';
}

const RegistrationSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType = 'farmer' } = (location.state as LocationState) || {};

  // If user directly navigates to this page without state, redirect to home
  useEffect(() => {
    if (!location.state) {
      navigate('/');
    }
  }, [location.state, navigate]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="max-w-md mx-auto vunahub-card p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for joining VunaHub as a {userType}. Your account has been created successfully.
          </p>
          
          <p className="text-gray-600 mb-6">
            {userType === 'farmer'
              ? 'You can now start listing your produce, connect with traders, and track your collections.'
              : 'You can now browse available produce, place orders, and connect with farmers across Kenya.'}
          </p>
          
          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-vunahub-600 hover:bg-vunahub-700 text-white rounded-full py-5"
            >
              <Link to={`/login/${userType}`}>Log In Now</Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="w-full border-vunahub-600 text-vunahub-600 hover:bg-vunahub-50 rounded-full py-5"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default RegistrationSuccessPage;