import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-section min-h-screen flex items-center py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="block">Powering Africa's</span>
                <span className="text-vunahub-600">Produce Pipeline</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Tech-driven. Farmer-powered. Connecting farmers, transporters, and traders in Kenya for a more efficient agricultural ecosystem.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                className="bg-vunahub-600 hover:bg-vunahub-700 text-white rounded-full py-6 px-8 text-lg"
              >
                <Link to="/register">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-vunahub-600 text-vunahub-600 hover:bg-vunahub-50 rounded-full py-6 px-8 text-lg"
              >
                <Link to="/#how-it-works">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden lg:block"
          >
            <img 
              src="/assets/hero-image.png" 
              alt="VunaHub - Agricultural Collection and Distribution" 
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
        
        {/* Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center"
        >
          {[
            { value: "5,000+", label: "Registered Farmers" },
            { value: "200+", label: "Active Transporters" },
            { value: "50+", label: "Partner Traders" },
            { value: "10,000+", label: "Tons Delivered" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="vunahub-card py-6 px-4"
            >
              <p className="text-3xl font-bold text-vunahub-600 mb-2">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;