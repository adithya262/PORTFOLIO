import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Contact from './components/sections/Contact';
import ScrollToTopButton from './components/ui/ScrollToTopButton';
import LightSweep from './components/ui/LightSweep';
import BreadcrumbTrail from './components/ui/BreadcrumbTrail';
import ParticleDrift from './components/ui/ParticleDrift';
import FreelanceAvailability from './components/sections/FreelanceAvailability';
import WhatIfBox from './components/sections/WhatIfBox';
import DevCircuitBox from './components/sections/DevCircuitBox';

function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'timeline', name: 'Experience' },
    { id: 'contact', name: 'Contact' },
  ];

  useEffect(() => {
    let scrollTimeout;
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      let activeSectionId = 'hero';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            activeSectionId = section.id;
            break;
          }
        }
      }
      setCurrentSection(activeSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [sections, isScrolling]);

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  return (
    <Router>
      <Layout currentSection={currentSection}>
        <motion.div
          key="main-content"
          initial="initial"
          animate="animate"
          variants={pageVariants}
          className="relative"
        >
          {/* Particle Drift Background */}
          <ParticleDrift />

          {/* Light Sweep Effect */}
          <LightSweep />
          
          {/* Main content sections */}
          <Hero>
            <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start grid-rows-auto">
              <div className="flex flex-col gap-y-4 h-full">
                <Skills />
                <WhatIfBox className="mt-0"/>
              </div>
              <div className="flex flex-col gap-y-8 h-full">
                <FreelanceAvailability className="mt-0"/> 
                <DevCircuitBox className="mt-0"/>
              </div>
            </div>
          </Hero>

          <Projects />
          <Timeline />
          <Contact />
        </motion.div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />

        {/* Breadcrumb Trail */}
        <BreadcrumbTrail items={sections} currentSection={currentSection} />
      </Layout>
    </Router>
  );
}

export default App;
