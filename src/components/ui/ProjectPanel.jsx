import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Dummy project data for demonstration
const projectData = {
  'AI/ML': {
    title: 'AI/ML Projects',
    intro: 'Leveraging machine learning for intelligent solutions, from predictive models to computer vision applications.',
    projects: [
      {
        name: 'Neural Network for Image Recognition',
        description: 'Developed a robust neural network achieving 95% accuracy on complex datasets.',
        techStack: ['Python', 'TensorFlow', 'Keras'],
        cta: 'View Details',
        link: '#',
      },
      {
        name: 'Predictive Analytics Model',
        description: 'Implemented a predictive model for market trends with high accuracy.',
        techStack: ['Python', 'Scikit-learn', 'Pandas'],
        cta: 'View Details',
        link: '#',
      },
      {
        name: 'Natural Language Processing Engine',
        description: 'Built an NLP engine for sentiment analysis and text summarization.',
        techStack: ['Python', 'NLTK', 'SpaCy'],
        cta: 'View Details',
        link: '#',
      },
    ],
  },
  'IoT Systems': {
    title: 'IoT Systems Projects',
    intro: 'Connecting the physical and digital worlds with intelligent embedded systems.',
    projects: [
      {
        name: 'Smart Home Automation',
        description: 'Designed and built a smart home system using Raspberry Pi and sensors.',
        techStack: ['C++', 'Raspberry Pi', 'MQTT'],
        cta: 'View Details',
        link: '#',
      },
      {
        name: 'Environmental Monitoring System',
        description: 'Deployed sensors for real-time environmental data collection and analysis.',
        techStack: ['Arduino', 'Node-RED', 'Python'],
        cta: 'View Details',
        link: '#',
      },
    ],
  },
  'Web Development': {
    title: 'Web Development Projects',
    intro: 'Building robust and scalable web applications with modern frontend and backend technologies.',
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce site with secure authentication and payment integration.',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
        cta: 'View Details',
        link: '#',
      },
      {
        name: 'Portfolio Website (V2)',
        description: 'Interactive and visually stunning personal portfolio.',
        techStack: ['React', 'Tailwind CSS', 'Framer Motion'],
        cta: 'View Details',
        link: '#',
      },
    ],
  },
  'Automation Tools': {
    title: 'Automation Tools & Scripts',
    intro: 'Streamlining workflows and enhancing efficiency with custom automation solutions.',
    projects: [
      {
        name: 'Data Processing Pipeline',
        description: 'Automated data ingestion and transformation for large datasets.',
        techStack: ['Python', 'Airflow', 'SQL'],
        cta: 'View Details',
        link: '#',
      },
      {
        name: 'CI/CD Automation Script',
        description: 'Script to automate deployment processes, reducing manual errors.',
        techStack: ['Bash', 'Jenkins', 'Docker'],
        cta: 'View Details',
        link: '#',
      },
    ],
  },
  'Research & Simulation': {
    title: 'Research & Simulation Projects',
    intro: 'Exploring complex systems and predicting behaviors through scientific research and simulations.',
    projects: [
      {
        name: 'Hydrological Prediction Model',
        description: 'Developed a model to predict water levels and flow using historical data.',
        techStack: ['Python', 'NumPy', 'SciPy'],
        cta: 'View Details',
        link: '#',
      },
      {
        name: 'Physics-Based Simulation Engine',
        description: 'Built a custom simulation engine for real-time physics interactions.',
        techStack: ['C++', 'OpenGL', 'Unity (optional)'],
        cta: 'View Details',
        link: '#',
      },
    ],
  },
};

const ProjectPanel = ({ isOpen, onClose, category }) => {
  const data = projectData[category];

  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          ></motion.div>

          {/* Panel */}
          <motion.div
            className="relative bg-dark-base/80 border border-neon-cyan/20 rounded-xl shadow-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-neon-cyan transition-colors duration-200 text-2xl"
            >
              &times;
            </button>

            <h2 className="text-3xl font-sora font-bold text-neon-turquoise mb-6">
              {data.title}
            </h2>

            <p className="text-white/80 font-inter space-y-4 flex-grow mb-4">
              {data.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-dark-accent/50 p-4 rounded-lg border border-neon-cyan/10"
                >
                  <h3 className="text-xl font-sora text-neon-cyan mb-2">{project.name}</h3>
                  <p className="text-sm text-white/70 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.techStack.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-neon-blue/20 text-neon-blue text-xs px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    className="inline-block mt-2 text-neon-turquoise hover:text-neon-cyan 
                               transition-colors duration-200 text-sm"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {project.cta} &rarr;
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectPanel; 