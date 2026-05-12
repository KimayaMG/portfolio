import React, { useState, useEffect, useMemo } from 'react';
import '../cssFiles/CustomNav.css';

const CustomNav = ({ isDarkMode, toggleMode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [navExpanded, setNavExpanded] = useState(false);

  // Nav items with their corresponding icons - wrapped in useMemo
  const navItems = useMemo(() => [
    { id: 'home', icon: 'fa-home' },
    // { id: 'about', icon: 'fa-user' },
    { id: 'skills', icon: 'fa-code' },
    { id: 'projects', icon: 'fa-folder' },
    { id: 'experience', icon: 'fa-briefcase' },
    { id: 'education', icon: 'fa-graduation-cap' },
    { id: 'contact', icon: 'fa-envelope' }
  ], []);

  // FIX 1: Improved scroll detection using closest-to-center logic
  useEffect(() => {
    const handleScroll = () => {
      // FIX 2: If near top of page, force 'home' as active
      if (window.scrollY < 80) {
        setActiveSection('home');
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let closestSection = null;
      let closestDistance = Infinity;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);

          // Only consider sections that are at least partially visible
          if (rect.bottom > 0 && rect.top < window.innerHeight && distance < closestDistance) {
            closestDistance = distance;
            closestSection = item.id;
          }
        }
      }

      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set correct initial state
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  const toggleNav = () => {
    setNavExpanded(prev => !prev);
  };

  // Custom toggle function that passes the button's position to App.js
  const handleToggleMode = (e) => {
    const toggleButton = e.currentTarget;
    const rect = toggleButton.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2 - 10;
    const centerY = rect.top + rect.height / 2 - 10;
    toggleMode({ x: centerX, y: centerY });
  };

  // FIX 3: Close mobile nav when a link is clicked
  const handleNavLinkClick = () => {
    if (navExpanded) setNavExpanded(false);
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
              onClick={handleNavLinkClick}
            >
              <i className={`fas ${item.icon}`}></i>
            </a>
          ))}
        </div>

        {/* Sun / Moon Mode Toggle Button */}
        <div className="mode-toggle-container">
          <button
            className="ModeToggle"
            onClick={handleToggleMode}
            aria-label="Toggle Mode"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          ></button>
        </div>
      </nav>

      {/* FIX 4: Overlay - React handles show/hide, no CSS display:none conflict */}
      {navExpanded && (
        <div className="nav-overlay" onClick={toggleNav}></div>
      )}
    </>
  );
};

export default CustomNav;