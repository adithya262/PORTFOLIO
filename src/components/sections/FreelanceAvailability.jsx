import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lightbulb, Code, Smartphone, Palette, Cloud, Atom } from 'lucide-react';

const FreelanceAvailability = () => {
  const [selectedService, setSelectedService] = useState('Full Stack');
  const [toggle, setToggle] = useState(false);

  const services = [
    { name: 'Full Stack', icon: Code },
    { name: 'AI Model', icon: Atom },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02, boxShadow: "0 0 30px rgba(0, 246, 255, 0.4)", transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, boxShadow: "0 0 20px rgba(0, 246, 255, 0.6)", transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="p-6 rounded-xl relative overflow-hidden bg-dark-accent/50"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 30px rgba(0, 246, 255, 0.4)", // Adjusted to match Skills box glow
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true, amount: 0.5 }}
      style={{
        boxShadow: `0 0 10px rgba(0, 246, 255, 0.3)` // Subtle glow by default
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-sora font-bold text-white flex items-center">
          <Lightbulb size={22} className="mr-3 text-neon-yellow" />
          What do you need help with?
        </h3>
      </div>
      
      {/* Toggle Switch between Full Stack and AI Model */}
      <div className="flex justify-center mb-6">
        <div className="relative flex w-64 h-12 bg-dark-base/60 rounded-full border border-cyan-700/40 shadow-none overflow-hidden">
          <button
            type="button"
            onClick={() => setSelectedService('Full Stack')}
            className={`flex-1 z-10 font-semibold text-base transition-all duration-200 rounded-full
              ${selectedService === 'Full Stack' ? 'text-white' : 'text-gray-300'}`}
          >
            Full Stack
          </button>
          <button
            type="button"
            onClick={() => setSelectedService('AI Model')}
            className={`flex-1 z-10 font-semibold text-base transition-all duration-200 rounded-full
              ${selectedService === 'AI Model' ? 'text-white' : 'text-gray-300'}`}
          >
            AI Model
          </button>
          {/* Sliding background */}
          <span
            className={`absolute top-1 left-1 w-[48%] h-10 rounded-full bg-gradient-to-r from-cyan-700/70 to-indigo-700/70 shadow-none transition-all duration-300
              ${selectedService === 'AI Model' ? 'translate-x-[104%]' : 'translate-x-0'}`}
            style={{ zIndex: 1 }}
          />
        </div>
      </div>

      {selectedService && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-lg text-gray-300 mb-6 flex items-center gap-2"
        >
          <Mail className="text-neon-cyan" size={24} /> Cool! I'm ready to help with {selectedService} Apps.
        </motion.p>
      )}

      <div className="flex gap-4">
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-cyan-700/80 text-white font-bold shadow-none hover:bg-cyan-800/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-700/20 text-base"
        >
          Let's Build Together
        </button>
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-gray-700/80 text-white font-bold shadow-none hover:bg-gray-800/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-700/10 text-base"
        >
          View Portfolio
        </button>
      </div>
    </motion.div>
  );
};

export default FreelanceAvailability; 