import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// Importing Components
import CustomNav from './components/CustomNav';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';

//Background Options
import WaveBackground from './components/WaveBackground';
import NetworkBackground from './components/NetworkBackground';

// Importing Main CSS
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPosition, setTransitionPosition] = useState({ x: 0, y: 0 });

  // Detect user's theme preference and listen for changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial theme based on user's system preference
    setIsDarkMode(mediaQuery.matches);

    // Function to handle user's system theme change
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    // Add listener for user's system theme change
    mediaQuery.addEventListener('change', handleThemeChange);

    // Clean up listener when component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  // Toggle theme mode when button is clicked
  const toggleMode = (position = null) => {
    // If position is provided, use it, otherwise default to top right
    const transitionPos = position || { x: window.innerWidth - 60, y: 20 };
    setTransitionPosition(transitionPos);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsDarkMode(prevMode => !prevMode);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 400);
  };

  return (
    <div className={`Portfolio ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {isTransitioning && (
        <div
          className={`theme-transition ${isDarkMode ? 'to-light' : 'to-dark'}`}
          style={{
            top: `${transitionPosition.y}px`,
            left: `${transitionPosition.x}px`,
            right: 'auto'
          }}
        />
      )}

      {/* Wave Background for light mode */}
      {!isDarkMode && <WaveBackground isDarkMode={isDarkMode} />}

      {/* Network Background for dark mode */}
      {isDarkMode && <NetworkBackground isDarkMode={isDarkMode} />}

      <CustomNav isDarkMode={isDarkMode} toggleMode={toggleMode} />

      {/* Hero Section - Fixed position */}
      <section id="home">
        <HeroSection isDarkMode={isDarkMode} />
      </section>
      
      <div className="hero-spacer" />
      <div className={`scroll-progress-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`} />

      <div className="main-content">
        <Container>
          <section id="about" className="section-padding">
            <div className="section-content">
              <h1>About</h1>
              <p>Learn more about me, my background, and what drives my passion for development.</p>
              <div style={{ height: "30vh" }} />
            </div>
          </section>

          <section id="skills" className="section-padding">
            <div className="section-content">
              <h1>Skills</h1>
              <SkillsSection isDarkMode={isDarkMode} />
            </div>
          </section>

          <section id="projects" className="section-padding">
            <div className="section-content">
              <h1>Projects</h1>
              <ProjectsSection isDarkMode={isDarkMode} />
              <div style={{ height: "30vh" }} />
            </div>
          </section>

          <section id="experience" className="section-padding">
            <div className="section-content">
              <h1>Experience</h1>
              <ExperienceSection isDarkMode={isDarkMode} />
              <div style={{ height: "30vh" }} />
            </div>
          </section>

          <section id="education" className="section-padding">
            <div className="section-content">
              <h1>Education</h1>
              <ExperienceSection isDarkMode={isDarkMode} />
              <div style={{ height: "30vh" }} />
            </div>
          </section>

          <section id="contact" className="section-padding">
            <div className="section-content">
              <h1>Contact</h1>
              <p>Get in touch with me for opportunities and collaborations.</p>
              <div style={{ height: "30vh" }} />
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}

export default App;