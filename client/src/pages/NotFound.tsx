import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-16 md:py-24 text-center"
      >
        <div className="max-w-md mx-auto">
          <h1 className="text-9xl font-bold text-vunahub-600 mb-4">404</h1>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
          
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button
            asChild
            className="bg-vunahub-600 hover:bg-vunahub-700 text-white rounded-full px-6 py-3"
          >
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default NotFound;