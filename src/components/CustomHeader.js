import React, { useState, useEffect, useRef } from 'react';
import '../cssFiles/CustomHeader.css';
import logoPic from '../ReqdImgs/KimayaGaikwad3.png';

const Header = ({ isDarkMode, toggleMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const toggleButtonRef = useRef(null);

  // Handle scroll event for header background
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Custom toggle function that passes the button's position to App.js
  const handleToggleMode = (e) => {
    // Get the position of the clicked button (could be desktop or mobile toggle)
    const toggleButton = e.currentTarget;
    const rect = toggleButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 - 10;
    const centerY = rect.top + rect.height / 2 - 10;
    
    // Call the parent component's toggle function with position
    toggleMode({ x: centerX, y: centerY });
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className='logo'>
          <img src={logoPic} alt="Kimaya Gaikwad" className="logoPic" />
        </div>

        {/* Mobile menu button */}
        <div 
          className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`} 
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Mobile mode toggle (always visible) */}
        <button
          className="ModeToggle mobile-mode-toggle"
          onClick={handleToggleMode}
          aria-label="Toggle Mode"
          ref={toggleButtonRef}
        ></button>

        <nav className={`navigation ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" className={`namdhinggo-medium ${activeSection === 'home' ? 'active' : ''}`}>Home</a></li>
            <li><a href="#about" className={`namdhinggo-medium ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
            <li><a href="#skills" className={`namdhinggo-medium ${activeSection === 'skills' ? 'active' : ''}`}>Skills</a></li>
            <li><a href="#projects" className={`namdhinggo-medium ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
            <li><a href="#experience" className={`namdhinggo-medium ${activeSection === 'experience' ? 'active' : ''}`}>Experience</a></li>
            <li><a href="#contact" className={`namdhinggo-medium ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
          
            {/* ModeToggle as a List Item (for desktop) */}
            <li className="mode-toggle-item">
              <button
                className="ModeToggle"
                onClick={handleToggleMode}
                aria-label="Toggle Mode"
              ></button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;