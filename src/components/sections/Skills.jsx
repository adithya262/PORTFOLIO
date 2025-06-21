import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaAws,
  FaDocker,
  FaCss3Alt,
  FaHtml5,
} from 'react-icons/fa';
import {
  DiJsBadge,
  DiRedis,
  DiGit,
  DiDatabase,
} from 'react-icons/di';
import {
  SiTypescript,
  SiTailwindcss,
  SiTensorflow,
  SiPytorch,
  SiExpress,
  SiMongodb,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiJquery,
  SiSass,
  SiWebpack,
  SiVite,
  SiD3Dotjs,
  SiFigma,
  SiAdobecreativecloud,
  SiAdobexd,
  SiBlender,
  SiR,
  SiKeras,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiCelery,
  SiJira,
  SiFirebase,
  SiHuggingface,
  SiOpenai,
  SiFramer,
} from 'react-icons/si';

const skillsData = [
  // Languages
  { name: 'Python', category: 'Languages', icon: FaPython, color: 'neon-cyan', proficiency: 90 },
  { name: 'SQL', category: 'Languages', icon: DiDatabase, color: 'neon-blue', proficiency: 85 },
  { name: 'R', category: 'Languages', icon: SiR, color: 'neon-pink', proficiency: 80 },
  { name: 'JavaScript', category: 'Languages', icon: DiJsBadge, color: 'neon-cyan', proficiency: 95 },
  { name: 'TypeScript', category: 'Languages', icon: SiTypescript, color: 'neon-cyan', proficiency: 85 },
  
  // ML
  { name: 'TensorFlow', category: 'ML', icon: SiTensorflow, color: 'neon-blue', proficiency: 85 },
  { name: 'Keras', category: 'ML', icon: SiKeras, color: 'neon-pink', proficiency: 80 },
  { name: 'Scikitlearn', category: 'ML', icon: SiScikitlearn, color: 'neon-cyan', proficiency: 90 },
  { name: 'Pandas', category: 'ML', icon: SiPandas, color: 'neon-blue', proficiency: 95 },
  { name: 'NumPy', category: 'ML', icon: SiNumpy, color: 'neon-pink', proficiency: 90 },
  { name: 'XGBoost', category: 'ML', icon: null, color: 'neon-cyan', proficiency: 85 },
  { name: 'LightGBM', category: 'ML', icon: null, color: 'neon-blue', proficiency: 80 },

  // Concepts
  { name: 'Hyperparameter Tuning', category: 'Concepts', icon: null, color: 'neon-pink', proficiency: 85 },
  { name: 'Regularization', category: 'Concepts', icon: null, color: 'neon-cyan', proficiency: 90 },
  { name: 'PCA', category: 'Concepts', icon: null, color: 'neon-blue', proficiency: 85 },

  // Evaluation
  { name: 'F1 Score', category: 'Evaluation', icon: null, color: 'neon-pink', proficiency: 90 },
  { name: 'Confusion Matrix', category: 'Evaluation', icon: null, color: 'neon-cyan', proficiency: 95 },
  { name: 'BLEU Score', category: 'Evaluation', icon: null, color: 'neon-blue', proficiency: 85 },
  { name: 'METEOR Score', category: 'Evaluation', icon: null, color: 'neon-pink', proficiency: 80 },

  // Time-Series
  { name: 'ARIMA', category: 'Time-Series', icon: null, color: 'neon-cyan', proficiency: 85 },
  { name: 'LSTM', category: 'Time-Series', icon: null, color: 'neon-blue', proficiency: 80 },

  // Dev Tools
  { name: 'Git', category: 'Dev Tools', icon: FaGitAlt, color: 'neon-pink', proficiency: 90 },
  { name: 'Docker', category: 'Dev Tools', icon: FaDocker, color: 'neon-cyan', proficiency: 85 },
  { name: 'Celery', category: 'Dev Tools', icon: SiCelery, color: 'neon-blue', proficiency: 80 },
  { name: 'Jira', category: 'Dev Tools', icon: SiJira, color: 'neon-pink', proficiency: 90 },

  // Cloud/GEN AI
  { name: 'Firebase', category: 'Cloud/GEN AI', icon: SiFirebase, color: 'neon-cyan', proficiency: 85 },
  { name: 'Hugging Face', category: 'Cloud/GEN AI', icon: SiHuggingface, color: 'neon-blue', proficiency: 80 },
  { name: 'OpenAI API', category: 'Cloud/GEN AI', icon: SiOpenai, color: 'neon-pink', proficiency: 85 },
  { name: 'Azure (basic)', category: 'Cloud/GEN AI', icon: null, color: 'neon-cyan', proficiency: 70 },

  // Technologies used in this website
  { name: 'React', category: 'Web Dev', icon: FaReact, color: 'neon-blue', proficiency: 90 },
  { name: 'Tailwind CSS', category: 'Web Dev', icon: SiTailwindcss, color: 'neon-pink', proficiency: 95 },
  { name: 'Framer Motion', category: 'Web Dev', icon: SiFramer, color: 'neon-cyan', proficiency: 85 },
  { name: 'Vite', category: 'Web Dev', icon: SiVite, color: 'neon-blue', proficiency: 90 },
  { name: 'react-scroll', category: 'Web Dev', icon: null, color: 'neon-pink', proficiency: 85 },
  { name: 'lucide-react', category: 'Web Dev', icon: null, color: 'neon-cyan', proficiency: 90 },
];

// Filter out skills without icons and duplicate for seamless marquee effect
const skillsWithIcons = skillsData.filter(skill => skill.icon !== null);
const duplicatedSkills = [...skillsWithIcons, ...skillsWithIcons];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      }
    },
  };

  const getGlowColor = (color) => {
    switch (color) {
      case 'neon-cyan': return 'rgba(0, 246, 255, 0.7)';
      case 'neon-blue': return 'rgba(0, 102, 255, 0.7)';
      case 'neon-pink': return 'rgba(255, 74, 228, 0.7)';
      case 'neon-green': return 'rgba(0, 255, 127, 0.7)';
      case 'neon-orange': return 'rgba(255, 165, 0, 0.7)';
      case 'neon-purple': return 'rgba(128, 0, 128, 0.7)';
      case 'neon-yellow': return 'rgba(255, 255, 0, 0.7)';
      case 'neon-red': return 'rgba(255, 0, 0, 0.7)';
      default: return 'rgba(255, 255, 255, 0.5)';
    }
  };

  return (
    <motion.section
      id="skills"
      className="relative py-16 px-4 md:px-8 rounded-2xl bg-dark-accent/40 backdrop-blur-sm border border-neon-cyan/20 shadow-lg"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Title and Description */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-sora mb-4 text-white">
          Skills & Expertise
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A comprehensive collection of technologies and tools I've mastered through years of experience
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden whitespace-nowrap py-8 border-t border-b border-gray-700/50 h-48 flex items-center">
        <motion.div 
          className="inline-block animate-marquee-slow flex items-center space-x-12 h-full"
        >
          {duplicatedSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            const glowColor = getGlowColor(skill.color);

            return (
              <motion.div
                key={`${skill.name}-${index}`}
                className="flex-shrink-0 relative"
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
                initial={{ width: 64, height: 64 }} // w-16 h-16 (64px) for icon state
                animate={{
                  width: hoveredSkill?.name === skill.name ? 160 : 64, // w-40 h-40 (160px) for expanded
                  height: hoveredSkill?.name === skill.name ? 160 : 64,
                  boxShadow: hoveredSkill?.name === skill.name ? `0 0 20px ${glowColor}` : `0 0 8px ${getGlowColor(skill.color).replace('0.7)', '0.3)')}`, // Subtle glow by default, stronger on hover
                }}
                transition={{ duration: 0.3 }}
                style={{
                  borderRadius: '0.75rem', // rounded-xl
                  background: 'rgba(29, 32, 38, 0.15)', // More transparent background
                  backdropFilter: 'blur(4px)', // backdrop-blur-sm
                  border: '1px solid rgba(107, 114, 128, 0.5)', // border border-gray-700/50
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem', // p-4
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                <AnimatePresence mode="wait">
                  {hoveredSkill?.name === skill.name ? (
                    // Detailed view on hover
                    <motion.div
                      key="details"
                      className="w-full h-full flex flex-col items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="text-neon-cyan font-medium mb-1 text-base text-center leading-tight">{skill.name}</span>
                      <span className="text-xs text-gray-400 mb-2 text-center leading-tight">{skill.category}</span>
                      <div className="text-xs text-gray-300 mb-1">
                        Proficiency: {skill.proficiency}%
                      </div>
                      <div className="w-full h-1 bg-gray-700/50 rounded-full overflow-hidden px-2">
                        <motion.div
                          className="h-full bg-neon-cyan"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    // Icon only when not hovered
                    <motion.div
                      key="icon"
                      className="flex items-center justify-center w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {IconComponent && (
                        <IconComponent
                          className={`text-4xl text-${skill.color}`}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills; 