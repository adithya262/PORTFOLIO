import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code, BrainCircuit, FlaskConical, Stethoscope } from 'lucide-react';

const WhatIfBox = () => {
  const [hoveredIdea, setHoveredIdea] = useState(null);

  const ideas = [
    {
      id: 'ai-life-organizer',
      question: 'What if I built an AI that organizes your life in real time?',
      sketch: 'Leveraging natural language processing and calendar integrations to proactively manage schedules, tasks, and communications, adapting to user behavior.',
      icon: BrainCircuit
    },
    {
      id: 'hospital-queue-predictor',
      question: 'What if hospital queues could predict waiting time with LSTMs?',
      sketch: 'Implementing Long Short-Term Memory networks to analyze patient flow data and provide accurate, real-time waiting time predictions for optimized resource allocation.',
      icon: Stethoscope
    },
    {
      id: 'sustainable-fashion-ai',
      question: 'What if AI could help create a fully sustainable fashion supply chain?',
      sketch: 'Developing an AI-powered platform to track materials from source to consumer, optimize production, and minimize waste through predictive analytics and blockchain.',
      icon: Code
    },
    {
      id: 'interactive-dream-recorder',
      question: 'What if we could record and interact with our dreams?',
      sketch: 'Building a neuro-feedback system combined with advanced graphics to visualize and allow interaction within dream states, enhancing creativity and self-awareness.',
      icon: FlaskConical
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.01, boxShadow: "0 0 30px rgba(0, 246, 255, 0.4)", transition: { duration: 0.3 } },
  };

  const ideaItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.03, boxShadow: "0 0 15px rgba(0, 246, 255, 0.3)", transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="p-6 rounded-xl relative overflow-hidden bg-dark-accent/50 mb-16"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.5 }}
      style={{
        boxShadow: `0 0 10px rgba(0, 246, 255, 0.3)` // Subtle glow by default
      }}
    >
      <h3 className="text-2xl font-sora font-bold mb-6 flex items-center gap-2 mt-0">
        <Lightbulb className="text-neon-cyan" size={28} /> What If I Built It?
      </h3>
      
      <div className="space-y-4 mb-6">
        {ideas.map((idea) => (
          <motion.div
            key={idea.id}
            className="bg-dark-base/30 rounded-lg p-4 cursor-pointer relative overflow-hidden"
            initial="initial"
            animate="animate"
            whileHover="hover"
            onHoverStart={() => setHoveredIdea(idea.id)}
            onHoverEnd={() => setHoveredIdea(null)}
            variants={ideaItemVariants}
          >
            <AnimatePresence mode="wait">
              {hoveredIdea === idea.id ? (
                <motion.p
                  key="sketch"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-300 text-sm italic"
                >
                  {idea.sketch}
                </motion.p>
              ) : (
                <motion.p
                  key="question"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-medium text-white flex items-center gap-2"
                >
                  {idea.icon && <idea.icon size={20} className="text-neon-pink" />}
                  {idea.question}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Button Row */}
      {/* Removed buttons as requested */}
    </motion.div>
  );
};

export default WhatIfBox; 