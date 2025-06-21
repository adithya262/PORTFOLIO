import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { CarFront, Code, Rocket, Wrench, Flag, GitBranch, PlayCircle } from 'lucide-react';

const DevCircuitBox = () => {
  const [hoveredSector, setHoveredSector] = useState(null);
  const pathRef = useRef(null);

  const getPointOnPath = (progress) => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      return pathRef.current.getPointAtLength(progress * pathLength);
    }
    return { x: 0, y: 0 };
  };

  const sectors = [
    { id: 'start', title: 'Start Line', icon: Flag, description: 'Project kickoff & planning.', color: 'text-neon-green', progress: 0 },
    { id: 'build', title: 'Build Phase', icon: Wrench, description: 'Core development & feature implementation.', color: 'text-neon-cyan', progress: 0.25 },
    { id: 'pitstop', title: 'Refinement Pit', icon: Code, description: 'Code review, testing & optimization.', color: 'text-neon-blue', progress: 0.5 },
    { id: 'deploy', title: 'Deployment Sprint', icon: Rocket, description: 'Launching to production.', color: 'text-neon-pink', progress: 0.75 },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.01, boxShadow: "0 0 30px rgba(0, 246, 255, 0.4)", transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="p-6 rounded-xl relative overflow-hidden bg-dark-accent/50 backdrop-blur-md"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.5 }}
      style={{
        boxShadow: `0 0 10px rgba(0, 246, 255, 0.3)`
      }}
    >
      {/* Title and Subtitle */}
      <h3 className="text-2xl font-sora font-bold mb-2 flex items-center gap-2 mt-0">
        <CarFront className="text-neon-pink" size={28} /> Dev Circuit
      </h3>
      <p className="text-gray-400 text-sm italic mb-6">🏎️ Precision. Speed. Strategy — All in Code.</p>

      {/* SVG Race Circuit */}
      <div className="relative w-full h-80 mb-6 flex items-center justify-center">
        <svg
          className="w-full h-full"
          viewBox="60 100 650 620"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Track Path */}
          <path
            ref={pathRef}
            id="dev-circuit-track"
            d="M 104,653 C 104,653 84,629 79,596 C 79,596 74,554 75,532 C 75,532 77,475 85,450 C 85,450 93,414 109,387 L 130,353 C 130,353 134,338 148,344 C 148,344 164,348 189,348 L 339,344 C 339,344 350,344 369,337 C 369,337 382,333 398,333 L 464,330 C 464,330 470,332 485,322 L 501,308 C 501,308 510,296 508,291 C 508,291 509,284 507,278 L 486,237 C 486,237 482,228 483,219 C 483,219 483,211 486,209 L 578,122 C 578,122 589,111 595,111 C 595,111 605,109 604,121 C 604,121 603,158 606,172 L 610,190 C 610,190 612,202 621,200 C 621,200 629,200 629,190 L 628,162 C 628,162 625,148 642,147 L 670,146 C 670,146 681,145 679,160 L 671,194 C 671,194 651,262 609,309 C 609,309 552,355 502,366 C 502,366 485,372 445,373 L 349,375 C 349,375 345,380 346,385 L 345,394 C 345,394 336,395 333,395 L 310,395 L 300,390 C 300,390 291,382 281,384 L 221,384 L 180,386 C 180,386 161,385 154,402 C 154,402 143,423 134,477 L 140,483 C 140,483 143,485 144,493 L 145,552 C 145,552 145,560 133,576 C 133,576 124,587 130,610 C 130,610 138,636 162,654 C 162,654 180,670 191,674 C 191,674 205,680 204,693 C 204,693 204,703 190,703 L 116,695 C 116,695 102,695 106,682 C 106,682 115,666 104,653 Z"
            stroke="url(#neon-gradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="10 5"
            className="opacity-70"
          />

          {/* Neon Gradient Definition */}
          <defs>
            <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F6FF" />
              <stop offset="25%" stopColor="#0066FF" />
              <stop offset="50%" stopColor="#FF4AE4" />
              <stop offset="75%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#00F6FF" />
            </linearGradient>
          </defs>

          {/* Sector Markers */}
          {sectors.map((sector, index) => {
            const Icon = sector.icon;
            const point = getPointOnPath(sector.progress);

            return (
              <AnimatePresence key={sector.id}>
                <motion.g
                  className="cursor-pointer"
                  onHoverStart={() => setHoveredSector(sector.id)}
                  onHoverEnd={() => setHoveredSector(null)}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: hoveredSector === sector.id ? 1 : 0.7, scale: hoveredSector === sector.id ? 1.2 : 1 }}
                  transition={{ duration: 0.2 }}
                  transform={`translate(${point.x}, ${point.y})`} 
                >
                  <circle r="12" fill="rgba(0, 246, 255, 0.2)" stroke="#00F6FF" strokeWidth="2" />
                  {Icon && <Icon size={16} className={`${sector.color} absolute`} style={{ transform: 'translate(-8px, -8px)'}} />}
                  {hoveredSector === sector.id && (
                    <motion.foreignObject
                      width="120"
                      height="60"
                      x="-60"
                      y="-70"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-dark-base border border-gray-700/50 rounded-md px-2 py-1 text-xs text-gray-300 text-center whitespace-nowrap">
                        <p className="font-bold">{sector.title}</p>
                        <p>{sector.description}</p>
                      </div>
                    </motion.foreignObject>
                  )}
                </motion.g>
              </AnimatePresence>
            );
          })}
        </svg>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <motion.a
          href="https://github.com/your-repo-link"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary neon-glow-btn flex items-center gap-2"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 246, 255, 0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          <GitBranch size={16} /> View Repo
        </motion.a>
        <motion.a
          href="#live-demo"
          className="btn-secondary flex items-center gap-2"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 246, 255, 0.6)" }}
          whileTap={{ scale: 0.95 }}
        >
          <PlayCircle size={16} /> Live Demo
        </motion.a>
      </div>
    </motion.div>
  );
};

export default DevCircuitBox; 