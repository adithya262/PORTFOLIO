import React, { useState } from 'react';
import FloatingNavbar from './FloatingNavbar';
import Preloader from './Preloader';
import Footer from './Footer';
import TerminalIntro from './TerminalIntro';

const Layout = ({ children, currentSection }) => {
  const [showTerminalIntro, setShowTerminalIntro] = useState(true);

  const handleTerminalIntroComplete = () => {
    setShowTerminalIntro(false);
  };

  return (
    <div className="bg-bg-primary-dark text-white font-inter">
      {showTerminalIntro && <Preloader />}
      {showTerminalIntro && <TerminalIntro onComplete={handleTerminalIntroComplete} />}
      {!showTerminalIntro && (
        <>
          <FloatingNavbar currentSection={currentSection} />
          {children}
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout; 