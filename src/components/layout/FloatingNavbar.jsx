import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Home, User, Code, MessageSquare, Briefcase, FileText, LayoutDashboard, Info, Mail, Terminal, Send, Github, Linkedin, CodeSquare, Diamond } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

const navItems = [
  { id: "skills", name: "Skills", icon: User, link: "#skills" },
  { id: "projects", name: "Projects", icon: LayoutDashboard, link: "#projects" },
  { id: "contact", name: "Contact", icon: Send, link: "#contact" },
];

const socialLinks = [
  { name: "GitHub", icon: Github, link: "https://github.com/adithya262" },
  { name: "LinkedIn", icon: Linkedin, link: "https://www.linkedin.com/in/prasanna-aditya-prabakaran-az26112003/" },
  { name: "LeetCode", icon: SiLeetcode, link: "https://leetcode.com/u/VbQySvE0ZD/" },
]

const FloatingNavbar = ({ currentSection }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    // Show on scroll up, hide on scroll down
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-bg-primary-dark/70 backdrop-blur-lg 
                     shadow-lg shadow-neon-cyan/10 border-b border-neon-cyan/10 
                     flex items-center justify-between px-6 h-20"
        >
          {/* Top Glow */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse" />

          {/* Left Side: Name/Logo */}
          <a href="#hero" className="flex items-center gap-2 group cursor-pointer">
            <Diamond className="w-5 h-5 text-neon-cyan group-hover:animate-pulse" />
            <span className="text-xl font-sora font-semibold text-slate-50 group-hover:text-neon-cyan transition-colors">
              Prasanna's Portfolio
            </span>
          </a>

          {/* Center: Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.link}
                className="relative text-slate-300 hover:text-neon-cyan font-medium transition-colors text-lg"
              >
                {item.name}
                {currentSection === item.id && (
                  <motion.div
                    className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-neon-cyan"
                    layoutId="underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
          </div>
          
          {/* Right Side: Social Links */}
          <div className="flex items-center gap-5">
             {socialLinks.map((item) => (
              <motion.a 
                key={item.name} 
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-neon-cyan"
                aria-label={item.name}
                whileHover={{ scale: 1.2, y: -2, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <item.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default FloatingNavbar; 