import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

// Importing Components
import CustomNav from './components/CustomNav';
import HeroSection from './components/HeroSection';

//Background Options
import WaveBackground from './components/WaveBackground';
import NetworkBackground from './components/NetworkBackground';

// Importing Main CSS
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPosition, setTransitionPosition] = useState({ x: 0, y: 0 });
  const [shouldHideHero, setShouldHideHero] = useState(false);

  // Detect user's theme preference and listening for changes (Live changes will be loaded)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Setting initial theme based on user's system preference
    setIsDarkMode(mediaQuery.matches);

    // Function to handle user's system theme change
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    // Listen for hero completion status
    const handleHeroChange = (event) => {
      // Update shouldHideHero state based on hero status
      if (event.detail && event.detail.shouldHideHero !== undefined) {
        setShouldHideHero(event.detail.shouldHideHero);
      }
    };

    window.addEventListener('heroStateChange', handleHeroChange);

    // Adding listener for user's system theme change
    mediaQuery.addEventListener('change', handleThemeChange);

    // Cleaning up listener when component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
      window.removeEventListener('heroStateChange', handleHeroChange);
    };
  }, []);

  // Setting the mode when toggle button is clicked
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
        ></div>
      )}

      {/* Wave Background */}
      {!isDarkMode && <WaveBackground isDarkMode={isDarkMode} />}

      {/* Network Background */}
      {isDarkMode && <NetworkBackground isDarkMode={isDarkMode} />}

      <CustomNav isDarkMode={isDarkMode} toggleMode={toggleMode} />

      {/* HeroSection - Fixed position */}
      <HeroSection isDarkMode={isDarkMode} />
      <div className="hero-spacer" />
      <div className={`scroll-progress-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`} />

      <div className="main-content">
        <Container>
          {/* Content sections with proper spacing - Fixed overlapping issue */}
          {/*<section id="home" className="section-padding" style={{ marginTop: shouldHideHero ? '20vh' : '270vh' }}> */}
          {/*<section id="home" className="section-padding"> */}
          <section id="home" className="section-padding">
            <div className="section-content">
              <h1>Home</h1>
              <p>Welcome to my portfolio! This is the home section with proper spacing.</p>
              <div style={{ height: "30vh" }}></div>
            </div>
          </section>

          <section id="about" className="section-padding">
            <div className="section-content">
              <h1>About</h1>
              <p>Learn more about me, my background, and what drives my passion for development.</p>
              <div style={{ height: "30vh" }}></div> {/* Reduced spacer */}
            </div>
          </section>

          <section id="skills" className="section-padding">
            <div className="section-content">
              <h1>Skills</h1>
              <p>Discover the technologies, frameworks, and tools I work with.</p>
              <div style={{ height: "30vh" }}></div> {/* Reduced spacer */}
            </div>
          </section>

          <section id="projects" className="section-padding">
            <div className="section-content">
              <h1>Projects</h1>
              <p>Explore my portfolio of projects and applications I've built.</p>
              <div style={{ height: "30vh" }}></div> {/* Reduced spacer */}
            </div>
          </section>

          <section id="experience" className="section-padding">
            <div className="section-content">
              <h1>Experience</h1>
              <p>My professional journey and career highlights.</p>
              <div style={{ height: "30vh" }}></div> {/* Reduced spacer */}
            </div>
          </section>

          <section id="contact" className="section-padding">
            <div className="section-content">
              <h1>Contact</h1>
              <p>Get in touch with me for opportunities and collaborations.</p>
              <div style={{ height: "30vh" }}></div> {/* Reduced spacer */}
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
}

export default App;