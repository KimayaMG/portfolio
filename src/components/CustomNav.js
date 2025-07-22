import React, { useState, useEffect, useMemo } from 'react';
import '../cssFiles/CustomNav.css';

const CustomNav = ({ isDarkMode, toggleMode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [navExpanded, setNavExpanded] = useState(false);
  
  //Nav items with their corresponding icons - wrapped in useMemo
  const navItems = useMemo(() => [
    { id: 'home', icon: 'fa-home' },
    { id: 'about', icon: 'fa-user' },
    { id: 'skills', icon: 'fa-code' },
    { id: 'projects', icon: 'fa-folder' },
    { id: 'experience', icon: 'fa-briefcase' },
    { id: 'contact', icon: 'fa-envelope' }
  ], []); //Empty dependency array means this only runs once

  //Handling scroll event to detect active section
  useEffect(() => {
    const handleScroll = () => {
      //Updating active section based on scroll position
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]); //Now navItems won't change between renders!

  //Handling mobile toggle for small screens
  const toggleNav = () => {
    setNavExpanded(!navExpanded);
  };

  //Custom toggle function that passes the button's position to App.js
  const handleToggleMode = (e) => {
    const toggleButton = e.currentTarget;
    const rect = toggleButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 - 10;
    const centerY = rect.top + rect.height / 2 - 10;
    
    //Calling the parent component's toggle function with position
    toggleMode({ x: centerX, y: centerY });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className={`mobile-nav-toggle ${navExpanded ? 'active' : ''}`} 
        onClick={toggleNav}
        aria-label="Toggle Navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Floating Navigation */}
      <nav className={`float-nav ${navExpanded ? 'expanded' : ''}`}>
        {/* Navigation Links */}
        <div className="nav-icons">
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`} 
              className={activeSection === item.id ? 'active' : ''}
              title={item.id.charAt(0).toUpperCase() + item.id.slice(1)}
            >
              <i className={`fas ${item.icon}`}></i>
            </a>
          ))}
        </div>

        {/* Sun - Moon -- Mode Toggle Button */}
        <div className="mode-toggle-container">
          <button
            className="ModeToggle"
            onClick={handleToggleMode}
            aria-label="Toggle Mode"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          ></button>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {navExpanded && (
        <div className="nav-overlay" onClick={toggleNav}></div>
      )}
    </>
  );
};

export default CustomNav;