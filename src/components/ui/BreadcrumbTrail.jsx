import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BreadcrumbTrail = ({ items, currentSection }) => {
  const [visitedItems, setVisitedItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisitedItems((prev) => {
              const newItem = {
                id: entry.target.id,
                name: entry.target.dataset.name,
                timestamp: Date.now(),
              };
              return [...prev, newItem].slice(-5); // Keep last 5 items
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative">
        <motion.div 
          className="w-2 h-2 rounded-full bg-neon-cyan"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 0 rgba(0, 246, 255, 0.4)",
              "0 0 20px rgba(0, 246, 255, 0.6)",
              "0 0 0 rgba(0, 246, 255, 0.4)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="absolute bottom-full left-0 mb-4 p-4 bg-dark-accent/90 backdrop-blur-sm
                         rounded-lg border border-neon-cyan/20 shadow-lg"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                {visitedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex items-center gap-2 text-sm text-white/70"
                  >
                    <motion.span 
                      className="text-neon-cyan"
                      animate={{
                        scale: currentSection === item.id ? [1, 1.2, 1] : 1,
                        color: currentSection === item.id ? "#00f6ff" : "#00f6ff80"
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.span>
                    <span>{item.name}</span>
                    <span className="text-xs text-white/40">
                      {new Date(item.timestamp).toLocaleTimeString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BreadcrumbTrail; 