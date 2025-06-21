import React, { useState, useRef, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import LightSweep from '../ui/LightSweep';
import { Github, ExternalLink } from 'lucide-react';
import ProjectModal from '../ui/ProjectModal';

const projectsData = [
  {
    id: 1,
    title: "Water Quality Monitoring (IoT + ML)",
    category: "IoT & Machine Learning",
    technologies: ["IoT", "Python", "LSTM", "ESP8266"],
    description: "An end-to-end IoT system that provides real-time water quality analysis using a custom sensor array and a cloud-based monitoring dashboard.",
    longDescription: "This project integrates an ESP8266 microcontroller with pH, TDS, turbidity, and temperature sensors to continuously collect critical water quality data. The data is transmitted over Wi-tFi to a cloud platform, where it's visualized on a live dashboard. An LSTM-based machine learning model is deployed for real-time anomaly detection, optimized with early stopping and evaluated using RMSE/MAE to ensure high accuracy and proactive issue alerting.",
    liveLink: "#",
    githubLink: "#",
    icon: "💧",
    color: "neon-cyan"
  },
  {
    id: 2,
    title: "Image Captioning Platform",
    category: "Deep Learning",
    technologies: ["DenseNet", "Docker", "TensorFlow"],
    description: "A deep learning platform that automatically generates descriptive captions for images using a state-of-the-art encoder-decoder architecture.",
    longDescription: "This platform implements a powerful DenseNet encoder to extract rich visual features from images, paired with an attention-based decoder for generating fluent, context-aware text captions. The model's performance was refined using Self-Critical Sequence Training (SCST) and benchmarked against BLEU, METEOR, and CIDEr metrics. For deployment, the model was containerized with Docker and served via an optimized TensorFlow runtime for fast and efficient inference.",
    liveLink: "#",
    githubLink: "#",
    icon: "📝",
    color: "neon-pink"
  },
  {
    id: 3,
    title: "ROS Self-Driving Sim (YOLOv5)",
    category: "Robotics & CV",
    technologies: ["ROS", "Gazebo", "YOLOv5", "Python"],
    description: "An autonomous driving simulation developed in ROS and Gazebo, featuring real-time object detection powered by YOLOv5.",
    longDescription: "This project showcases a complete autonomous driving pipeline within a simulated environment. Using the Robot Operating System (ROS) and Gazebo, the simulation integrates a YOLOv5 model for high-performance, real-time object detection. Custom ROS topics were configured for robust sensor fusion, allowing the virtual vehicle to perceive its environment and navigate safely based on the detected objects.",
    liveLink: "#",
    githubLink: "#",
    icon: "🚗",
    color: "neon-blue"
  },
];

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const resetTimeout = useRef(null);

  const handleCardClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  const handleParallax = useCallback((e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    setParallax({ x, y });
    setHoveredProject(id);
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => {
      setParallax({ x: 0, y: 0 });
      setHoveredProject(null);
    }, 1200);
  }, [resetTimeout]);

  const resetParallax = () => {
    setParallax({ x: 0, y: 0 });
    setHoveredProject(null);
    if (resetTimeout.current) clearTimeout(resetTimeout.current);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const projectCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const contentOpacityVariants = {
    frontVisible: { opacity: 1 },
    frontHidden: { opacity: 0 },
    backVisible: { opacity: 1 },
    backHidden: { opacity: 0 },
  };

  return (
    <motion.section
      id="projects"
      className="flex flex-col items-center py-8 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Section Title with Animated Glow */}
      <div className="relative mb-10 w-full flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 32, backgroundPosition: '0% 50%' }}
          animate={{ opacity: 1, y: 0, backgroundPosition: '100% 50%' }}
          transition={{ duration: 0.9, ease: 'easeOut', backgroundPosition: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'linear' } }}
          className="text-4xl md:text-5xl font-lexend font-extrabold text-center bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent select-none"
          style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Projects
        </motion.h2>
      </div>

      {/* Cards Grid - Minimal, Professional Layout */}
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-stretch">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              className="project-card-minimal font-sora relative overflow-hidden group"
              custom={index}
              variants={projectCardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 },
              }}
              style={
                hoveredProject === project.id
                  ? {
                      transform: `rotateY(${parallax.x}deg) rotateX(${-parallax.y}deg) scale(1.05) translateY(-8px)`
                    }
                  : { transform: 'rotateY(0deg) rotateX(0deg) scale(1) translateY(0)' }
              }
              onMouseMove={e => handleParallax(e, project.id)}
              onMouseLeave={resetParallax}
              onClick={() => handleCardClick(project)}
            >
              {/* Animated Gradient Border */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-[1.25rem] border-2 border-transparent group-hover:animate-gradient-border z-10"
                style={{
                  background:
                    'linear-gradient(120deg, rgba(0,246,255,0.15), rgba(99,102,241,0.12), rgba(0,246,255,0.15))',
                  opacity: 0.7,
                  maskImage: 'linear-gradient(white, white)',
                }}
                initial={{ opacity: 0 }}
                animate={hoveredProject === project.id ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <div className="w-full h-full flex flex-col justify-center items-center relative z-20">
                {/* Project Icon with Pulse */}
                <motion.div
                  className="text-5xl mb-4 select-none"
                  whileHover={{ scale: 1.12, filter: 'brightness(1.1)' }}
                  animate={{
                    scale: [1, 1.06, 1],
                    filter: [
                      'brightness(1)',
                      'brightness(1.1)',
                      'brightness(1)'
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                >
                  {project.icon}
                </motion.div>
                <AnimatePresence mode="wait">
                  {hoveredProject === project.id ? (
                    <motion.div
                      key="back"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-center items-center w-full"
                    >
                      <p className="text-gray-200 text-base leading-relaxed mb-6 text-center max-w-xs">
                        {project.description}
                      </p>
                      <div className="flex gap-4 justify-center mb-4">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-base flex items-center gap-2"
                          onClick={e => e.stopPropagation()}
                        >
                          View Project <ExternalLink size={18} />
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-base flex items-center gap-2"
                          onClick={e => e.stopPropagation()}
                        >
                          GitHub <Github size={18} />
                        </a>
                      </div>
                      <p className="text-gray-400 text-base text-center">Hover out to return...</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="front"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.25 }}
                      className="flex-1 flex flex-col justify-center items-center w-full"
                    >
                      <h3 className="text-xl font-bold font-sora text-cyan-300 mb-4 leading-tight text-center whitespace-pre-line">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap justify-center mb-6">
                        {project.technologies.map(tag => (
                          <motion.span
                            key={tag}
                            className="pill-tag-minimal"
                            whileHover={{ scale: 1.12, backgroundColor: 'rgba(0,246,255,0.16)' }}
                            transition={{ duration: 0.2 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <p className="text-gray-200 text-base text-center">Hover to reveal details...</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showModal && selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          isOpen={showModal}
        />
      )}
    </motion.section>
  );
};

export default Projects; 