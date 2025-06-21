import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XCircle } from 'lucide-react';

const ProjectModal = ({ project, onClose, isOpen }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[6px] z-50 flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="bg-white/10 backdrop-blur-[16px] border border-cyan-400/20 shadow-2xl rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 scale-100 opacity-100 flex flex-col md:flex-row"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <XCircle size={28} />
        </button>

        {/* Project Image/Video */}
        <div className="md:w-1/2 p-4 flex items-center justify-center bg-white/10 rounded-l-2xl backdrop-blur-[8px]">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="max-h-full max-w-full object-contain rounded-md shadow-lg"
            />
          )}
          {/* Add video support if project.video is present */}
        </div>

        {/* Project Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-sora text-white mb-2 leading-tight drop-shadow-lg">{project.title}</h3>
            <p className="text-sm text-neon-blue-accent mb-4">{project.category}</p>
            <p className="text-gray-100 text-base leading-relaxed mb-6">{project.description}</p>

            {/* Technologies Used */}
            <div className="mb-6">
              <h4 className="text-lg font-sora text-white mb-3">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-white/20 text-cyan-200 text-xs px-3 py-1 rounded-full shadow-sm hover:bg-cyan-400/20 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-auto">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-cyan-500/80 text-white px-5 py-2 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 shadow-md"
              >
                <span>Live Demo</span>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 border border-cyan-400/40 text-cyan-100 px-5 py-2 rounded-full hover:border-cyan-200 hover:text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 shadow-md"
              >
                <span>GitHub Repo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal; 