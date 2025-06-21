import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const LightSweep = ({ children }) => {
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { threshold: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        x: ['-100%', '100%'],
        opacity: [0, 0.8, 0],
        transition: {
          duration: 1.5,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }
      });
    }
  }, [isInView, controls]);

  return (
    <div ref={elementRef} className="relative inline-block overflow-hidden">
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 246, 255, 0.2), transparent)',
          filter: 'blur(8px)',
        }}
        animate={controls}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 246, 255, 0.4), transparent)',
          filter: 'blur(4px)',
        }}
        animate={controls}
        transition={{ delay: 0.1 }}
      />
    </div>
  );
};

export default LightSweep; 