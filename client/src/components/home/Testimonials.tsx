import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Janet Wanjiku",
    role: "Farmer, Lari",
    image: "/assets/testimonial-1.jpg",
    content: "Since joining VunaHub, I've been able to focus more on farming and less on finding buyers. The platform connects me directly to traders and manages all the logistics. My income has increased by 30% in just six months!"
  },
  {
    id: 2,
    name: "George Omondi",
    role: "Transporter, Kiambu",
    image: "/assets/testimonial-2.jpg",
    content: "The VunaHub system makes my job as a driver much easier. I get clear collection routes, notifications about pickups, and confirmation from farmers. It's reduced my fuel costs and increased the number of collections I can make each day."
  },
  {
    id: 3,
    name: "Mary Njenga",
    role: "Trader, Nairobi",
    image: "/assets/testimonial-3.jpg",
    content: "I run a produce shop in Nairobi, and VunaHub has transformed my business. I can browse available produce directly from farmers, place orders, and have everything delivered on schedule. The quality is consistent, and my customers are very happy."
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <div className="w-24 h-1 bg-vunahub-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Real stories from the farmers, transporters, and traders using VunaHub across Kenya.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="vunahub-card p-8 md:p-12"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-white shadow-lg flex-shrink-0">
                  <img 
                    src={testimonials[activeIndex].image || "https://via.placeholder.com/150"} 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <svg className="text-vunahub-200 w-16 h-16 mb-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"></path>
                  </svg>
                  
                  <p className="text-lg md:text-xl text-gray-700 mb-6">{testimonials[activeIndex].content}</p>
                  
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{testimonials[activeIndex].name}</h4>
                    <p className="text-vunahub-600">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-vunahub-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-8">
            <button
              onClick={prevTestimonial}
              className="bg-white rounded-full shadow-md p-2 text-gray-700 hover:bg-vunahub-50 hover:text-vunahub-600 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-8">
            <button
              onClick={nextTestimonial}
              className="bg-white rounded-full shadow-md p-2 text-gray-700 hover:bg-vunahub-50 hover:text-vunahub-600 transition-colors"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;