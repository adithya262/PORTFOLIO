import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Adjust loading time as needed

    const rotationInterval = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 10) % 360);
    }, 50); // Rotate every 50ms

    return () => {
      clearTimeout(timer);
      clearInterval(rotationInterval);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-bg-primary-dark transition-opacity duration-700">
      <motion.div
        className="w-24 h-24 rounded-full border-4 border-t-4 border-neon-blue-accent border-t-white animate-spin-slow flex items-center justify-center shadow-lg"
        style={{ rotate: rotation }}
      >
        {/* Optional: Add a subtle inner glow or icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full opacity-30 blur-md"></div>
      </motion.div>
    </div>
  );
};

export default Preloader; 