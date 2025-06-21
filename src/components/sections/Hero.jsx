import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-scroll';
import LightSweep from '../ui/LightSweep';
import ParticleDrift from '../ui/ParticleDrift';
import avatar from '../../assets/avatar.jpg.jpeg';

const Hero = ({ children }) => {
  const heroRef = useRef(null);

  // Logic for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const xPos = event.clientX - rect.left - rect.width / 2;
    const yPos = event.clientY - rect.top - rect.height / 2;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <section id="hero" ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 text-center overflow-hidden">
        {/* Background Effects */}
        <ParticleDrift />
        <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-bg-primary-dark via-bg-primary-dark/80 to-bg-primary-dark" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-10">
          
          {/* Avatar */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.1, y: -5 }}
            style={{ 
              perspective: 1000,
              rotateX,
              rotateY
            }}
            className="w-52 h-52 rounded-full overflow-hidden border-4 border-neon-cyan/30 shadow-xl shadow-neon-cyan/20"
          >
            <img 
              src={avatar} 
              alt="Avatar" 
              className="w-full h-full object-cover scale-125"
              style={{ filter: 'brightness(90%)' }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col items-center gap-3"
          >
            <LightSweep>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-sora font-extrabold text-white">
                Prasanna Aditya P
              </h1>
            </LightSweep>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-sora font-semibold text-cyan-300 mt-2">
              AI/ML Architect • Full-Stack Engineer
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mt-4">
              Innovating at the intersection of AI, Engineering, and the Physical World to build intelligent and impactful solutions.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6 pt-4"
          >
            <motion.a
              href="#projects"
              className="flex items-center gap-2 btn-secondary neon-glow-btn px-8 py-4 rounded-lg border border-neon-cyan/60 bg-dark-accent/60 text-white font-semibold shadow-md hover:bg-neon-cyan/10 hover:text-neon-cyan transition-all duration-200 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none text-lg"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px 4px #00f6ff55' }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <ArrowRight size={20} />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 btn-secondary neon-glow-btn px-8 py-4 rounded-lg border border-transparent bg-transparent text-slate-300 font-semibold hover:text-neon-cyan transition-all duration-200 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume <Download size={20} />
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <Link
          to="skills"
          smooth={true}
          duration={800}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 1.5,
              ease: 'easeInOut',
              delay: 1.2,
            }}
            className="text-white/70 hover:text-neon-cyan transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </motion.div>
        </Link>
      </section>
      <div className="pt-16">
        {children}
      </div>
    </>
  );
};

export default Hero;
