import React, { useState, useEffect } from 'react';
import '../cssFiles/CustomHeader.css';
import logoPic from '../ReqdImgs/KimayaGaikwad3.png';

const Header = ({ isDarkMode, toggleMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
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

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className='logo'>
          <img src={logoPic} alt="Kimaya Gaikwad" className="logoPic" />
        </div>

        {/* Mobile menu button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`navigation ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home" className="namdhinggo-medium">Home</a></li>
            <li><a href="#about" className="namdhinggo-medium">About</a></li>
            <li><a href="#skills" className="namdhinggo-medium">Skills</a></li>
            <li><a href="#projects" className="namdhinggo-medium">Projects</a></li>
            <li><a href="#experience" className="namdhinggo-medium">Experience</a></li>
            <li><a href="#contact" className="namdhinggo-medium">Contact</a></li>
            
            {/* ModeToggle as a List Item */}
            <li className="mode-toggle-item">
              <button
                className="ModeToggle"
                onClick={toggleMode}
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
