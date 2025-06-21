import React, { useState } from 'react';
import { Mail, Linkedin, Instagram, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showMessage, setShowMessage] = useState(false);

  const handleEasterEggClick = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000); // Message will disappear after 4 seconds
  };

  return (
    <footer className="relative bottom-0 left-0 w-full bg-bg-primary-dark text-white/70 py-6 z-40">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4 relative">
        {/* Copyright */}
        <div 
          className="mb-4 md:mb-0 text-sm font-inter text-cyan-400/80 cursor-pointer"
          onClick={handleEasterEggClick}
        >
          &copy; {currentYear} Prasanna Aditya P
        </div>

        {/* Easter Egg Message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: -40, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg shadow-lg shadow-pink-500/20"
            >
              <p className="text-lg font-semibold text-pink-300">I love you Rakshu baby ❤️</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Social Icons */}
        <div className="flex space-x-6">
          <a href="mailto:prasannaaditya2603@gmail.com" className="text-white/70 hover:text-neon-purple transition-colors duration-300 group">
            <Mail size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
          </a>
          <a href="https://www.linkedin.com/in/prasanna-aditya-prabakaran-az26112003/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-neon-purple transition-colors duration-300 group">
            <Linkedin size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
          </a>
          <a href="https://www.instagram.com/_aditya_2603/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-neon-purple transition-colors duration-300 group">
            <Instagram size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
          </a>
          <a href="https://github.com/adithya262" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-neon-purple transition-colors duration-300 group">
            <Github size={20} className="group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 