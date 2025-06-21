import React, { useState, useEffect } from 'react';

const TerminalIntro = ({ onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const fullText = "_SYSTEM_ONLINE_ | INITIALIZING_NEURAL_NETWORK_INTERFACE...";

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + fullText[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // Animation complete, call onComplete callback after a brief pause
      const delay = setTimeout(() => {
        if (onComplete) onComplete();
      }, 1000); // Small delay before disappearing
      return () => clearTimeout(delay);
    }
  }, [charIndex, fullText, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-base font-mono text-lg md:text-xl lg:text-2xl px-4">
      <div className="text-center w-full max-w-2xl">
        <p className="text-white">
          <span className="text-neon-cyan">{currentText}</span><span className="animate-pulse">_</span>
        </p>
      </div>
    </div>
  );
};

export default TerminalIntro; 