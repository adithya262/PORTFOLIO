import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import LightSweep from '../ui/LightSweep'; // Assuming LightSweep is also in ui folder
import { Briefcase, GraduationCap, Cpu } from 'lucide-react';

const timelineEvents = [
  {
    year: 'Jun 2023 - Jan 2025',
    title: 'Full-Stack Developer',
    company: 'Oxlac',
    description: 'Engineered and deployed scalable, full-stack web applications using a robust backend tech stack including Node.js, Express, PostgreSQL, and Redis.',
    details: `• Responsible for the end-to-end development of high-performance web applications.
• Designed and built resilient backend systems using Node.js, Express, PostgreSQL, and Redis for caching.
• Integrated third-party RESTful APIs and managed asynchronous background tasks with Celery.
• Containerized services using Docker for streamlined deployment and improved scalability.`,
    icon: Briefcase
  },
  {
    year: '2021 - 2025',
    title: 'B.Tech in Computer Science',
    company: 'Vellore Institute of Technology',
    description: 'Specialized in Artificial Intelligence and Robotics, graduating with a comprehensive foundation in advanced computational theories and practical engineering applications.',
    details: `• Specialized in Artificial Intelligence and Robotics, building a comprehensive foundation in advanced computational theories.
• Curriculum covered machine learning algorithms, neural networks, computer vision, and autonomous systems.
• Engaged in numerous hands-on projects, including model development, training, and robotic control system design.
• Applied theoretical knowledge to solve complex, real-world engineering problems.`,
    icon: GraduationCap
  },
  {
    year: 'Oct 2023 - Dec 2023',
    title: 'Machine Learning Intern',
    company: 'HCLTech',
    description: 'Developed and optimized a DenseNet-based image captioning model, achieving a 30% reduction in latency using Self-critical Sequence Training (SCST).',
    details: `• Engineered and fine-tuned an advanced image captioning model using a DenseNet architecture with TensorFlow and Keras.
• Implemented Self-critical Sequence Training (SCST) to directly optimize model performance based on evaluation metrics.
• Rigorously assessed model accuracy and fluency using industry-standard metrics like BLEU-4 and METEOR.
• Achieved a significant 30% reduction in model inference latency, enhancing real-time captioning capabilities.`,
    icon: Cpu
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="py-20 bg-bg-primary-dark min-h-screen flex flex-col items-center">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-extrabold font-lexend text-center mb-16 bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent select-none"
          style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Experience
        </motion.h2>
        <div className="relative wrap overflow-visible p-8 h-full flex flex-col items-center">
          <div className="border-l-2 border-white/5 absolute left-1/2 top-0 h-full transform -translate-x-1/2 z-0"></div>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ event, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const itemVariants = {
    hidden: { opacity: 0, x: isEven ? 150 : -150 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        delay: index * 0.15 + 0.3,
        ease: "easeOut"
      }
    },
  };
  const nodeVariants = {
    initial: { scale: 0.9, boxShadow: "0 0 0px #22d3ee" },
    animate: {
      scale: 1,
      boxShadow: [
        "0 2px 8px #22d3ee33",
        "0 4px 16px #818cf833",
        "0 2px 8px #22d3ee33"
      ],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    inView: {
      scale: 1.08,
      boxShadow: "0 4px 16px #22d3ee55",
      transition: { duration: 0.3, type: "spring" }
    },
  };
  const Icon = event.icon;
  return (
    <motion.div
      ref={ref}
      className={`mb-16 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={itemVariants}
    >
      <div className="order-1 w-5/12"></div>
      <motion.div
        className="z-20 flex items-center justify-center order-1 bg-transparent w-10 h-10 rounded-full border-2 border-white/10 shadow-sm"
        variants={nodeVariants}
        initial="initial"
        animate={inView ? "inView" : "initial"}
      >
        {Icon && <Icon className="w-5 h-5 text-cyan-400" strokeWidth={2.2} />}
      </motion.div>
      <motion.div
        className="order-1 w-5/12 px-5 py-5 rounded-xl bg-white/5 backdrop-blur-md border-l-4 border-cyan-400/40 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-400/60"
        whileHover={{ boxShadow: '0 8px 32px rgba(34,211,238,0.2)', borderColor: 'rgba(34,211,238,0.6)' }}
      >
        <h3 className="mb-1 font-bold text-cyan-400 text-base font-sora">{event.year}</h3>
        <h4 className="mb-2 font-semibold text-white text-lg font-sora">{event.title} <span className="font-normal text-cyan-300/90 text-base">at {event.company}</span></h4>
        <p className="text-sm leading-snug tracking-wide text-white/80 mb-2">{event.description}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 px-3 py-1.5 rounded-md bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20 hover:text-white transition-all duration-200 text-xs font-semibold focus:outline-none"
        >
          {isExpanded ? 'View Less ▲' : 'View Details ▼'}
        </button>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={isExpanded ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden mt-3 bg-white/10 p-3 rounded-md border border-cyan-400/10"
        >
          <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
            {event.details}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Timeline; 