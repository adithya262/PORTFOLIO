import React from 'react';

const highlights = [
  {
    id: 1,
    title: "AI/ML Architect",
    description: "Designing and implementing scalable AI/ML solutions.",
    icon: "🧠", 
    color: "text-neon-cyan"
  },
  {
    id: 2,
    title: "IoT Systems Designer",
    description: "Crafting intelligent IoT ecosystems for smart environments.",
    icon: "🔌",
    color: "text-neon-pink"
  },
  {
    id: 3,
    title: "Full-Stack Engineer",
    description: "Building robust web applications with seamless user experiences.",
    icon: "💻",
    color: "text-neon-blue-accent"
  },
  {
    id: 4,
    title: "Hydrological Prediction",
    description: "Developing models for water resource forecasting and management.",
    icon: "💧",
    color: "text-neon-turquoise"
  },
  {
    id: 5,
    title: "AI-Driven Water Quality",
    description: "Monitoring and analysis systems for environmental health.",
    icon: "🧪",
    color: "text-neon-cyan"
  },
  {
    id: 6,
    title: "Data Visualization",
    description: "Transforming complex data into insightful and interactive visuals.",
    icon: "📊",
    color: "text-neon-pink"
  },
];

const HighlightsGrid = () => {
  return (
    <section id="highlights" className="py-20 bg-bg-primary-dark scroll-snap-align-start min-h-screen flex flex-col justify-center items-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-sora font-extrabold text-center bg-gradient-to-r from-cyan-400/90 to-indigo-400/90 bg-clip-text text-transparent mb-12">
          My Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="bg-dark-accent/50 p-6 rounded-lg border border-dark-accent-border 
                         hover:border-neon-cyan transition-all duration-300 
                         shadow-lg hover:shadow-neon-cyan/20 
                         group flex flex-col items-center text-center"
            >
              <div className={`text-6xl mb-4 ${highlight.color} group-hover:scale-110 transition-transform duration-300`}>
                {highlight.icon}
              </div>
              <h3 className="text-xl font-bold font-sora text-cyan-300 mb-2 group-hover:text-cyan-200 transition-colors duration-300">
                {highlight.title}
              </h3>
              <p className="text-gray-200 font-inter text-md">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HighlightsGrid; 