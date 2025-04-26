import React, { useState, useEffect } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

// Importing Components
import CustomHeader from './components/CustomHeader.js'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  //Detect user's theme preference and listening for changes (Live changes will be loaded)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    //Setting initial theme based on user's system preference
    setIsDarkMode(mediaQuery.matches);

    //Function to handle user's system theme change
    const handleThemeChange = (e) => {
      setIsDarkMode(e.matches);
    };

    //Adding listener for user's system theme change
    mediaQuery.addEventListener('change', handleThemeChange);

    //Cleaning up listener when component unmounts
    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange);
    };
  }, []);

  //Setting the mode when toggle button is clicked
  const toggleMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`Portfolio ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      { /*<Button className="ModeToggle" onClick={toggleMode} /> */}

      <div>
      <CustomHeader isDarkMode={isDarkMode} toggleMode={toggleMode} />
      </div>

      

    </div>
  );
}

export default App;
