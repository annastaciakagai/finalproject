import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-vunahub-600 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-6"
          >
            Join the VunaHub Community Today
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl text-vunahub-100 mb-10"
          >
            Whether you're a farmer, transporter, or trader, VunaHub connects you to a thriving agricultural ecosystem. Get started today and grow with us.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              className="bg-white text-vunahub-600 hover:bg-vunahub-50 rounded-full py-6 px-8 text-lg"
            >
              <Link to="/register">Register Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-vunahub-500 rounded-full py-6 px-8 text-lg"
            >
              <Link to="/login">Login</Link>
            </Button>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-vunahub-100 mt-8"
          >
            Need help getting started? <Link to="/contact" className="underline hover:text-white">Contact our support team</Link>
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;