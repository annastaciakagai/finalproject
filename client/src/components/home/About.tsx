import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About VunaHub</h2>
          <div className="w-24 h-1 bg-vunahub-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Empowering Kenya's agricultural ecosystem through technology and community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <img 
              src="/assets/about-image.png" 
              alt="Kenyan farmers with crops" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>
          
          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision for Kenya's Agriculture</h3>
            <p className="text-gray-700 mb-6">
              Inspired by KTDA's tea model in Lari, Kiambu, VunaHub is revolutionizing how agricultural products move from farm to market. We're building a tech-enabled ecosystem that benefits all stakeholders - farmers get fair prices, transporters optimize routes, and traders access quality produce consistently.
            </p>
            <p className="text-gray-700 mb-6">
              Our platform connects the key players in the agricultural value chain, creating efficiency, transparency, and growth opportunities for rural communities across Kenya.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {[
                { title: "Community First", description: "Building solutions that strengthen local agricultural communities" },
                { title: "Technology Driven", description: "Using digital tools to solve traditional farming challenges" },
                { title: "Fair Value", description: "Ensuring farmers receive equitable compensation for their hard work" },
                { title: "Sustainable Growth", description: "Creating an agricultural model that can scale across Africa" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="vunahub-card p-6"
                >
                  <h4 className="text-lg font-semibold text-vunahub-600 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;