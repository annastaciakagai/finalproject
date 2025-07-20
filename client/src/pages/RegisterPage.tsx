import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import RegistrationForm from '@/components/auth/RegistrationForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState('farmer');

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container mx-auto px-4 py-16 md:py-24"
      >
        <div className="max-w-2xl mx-auto vunahub-card p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join VunaHub</h1>
            <p className="text-gray-600">
              Create an account to start using the VunaHub platform.
            </p>
          </div>

          <Tabs 
            defaultValue="farmer" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 rounded-full p-1">
              <TabsTrigger 
                value="farmer"
                className="rounded-full data-[state=active]:bg-vunahub-600 data-[state=active]:text-white py-3"
              >
                Register as Farmer
              </TabsTrigger>
              <TabsTrigger 
                value="trader"
                className="rounded-full data-[state=active]:bg-vunahub-600 data-[state=active]:text-white py-3"
              >
                Register as Trader
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="farmer">
              <RegistrationForm userType="farmer" />
            </TabsContent>
            
            <TabsContent value="trader">
              <RegistrationForm userType="trader" />
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t text-center text-gray-600">
            <p>
              Already have an account?{' '}
              <Link 
                to={`/login/${activeTab}`} 
                className="text-vunahub-600 hover:underline font-medium"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default RegisterPage;