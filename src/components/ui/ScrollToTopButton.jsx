import React, { useEffect, useState } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuart',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const buttonVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      y: 20
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(0, 246, 255, 0.7)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
        >
          <motion.button
            onClick={scrollToTop}
            className="bg-gradient-to-br from-purple-600 to-blue-500 text-white p-3 rounded-full shadow-lg 
                     hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-opacity-50"
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            aria-label="Scroll to top"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <FiArrowUp className="text-xl" />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton; 