import React, { useState, useEffect, useRef, useMemo } from 'react';
import PixelButton from './PixelButton';
import '../cssFiles/HeroSection.css';
import resumePDF from '../KimayaGaikwad.pdf';

const HeroSection = ({ isDarkMode }) => {
  const [stage, setStage] = useState(1);
  const [typewriterText, setTypewriterText] = useState('');
  const [scrollStage, setScrollStage] = useState(0);
  const [shouldHideHero, setShouldHideHero] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const heroRef = useRef(null);
  const fullText = "Hello World";

  //Adjusted section breaks for smoother transitions between animation sections
  const sectionBreaks = useMemo(() => ({
    stage0: 0,
    stage1: window.innerHeight * 0.8,
    stage2: window.innerHeight * 1.8,
    stage3: window.innerHeight * 2.8,
    hide: window.innerHeight * 3.2
  }), []);

  const descriptions = [
    "Skilled Java Developer",
    "Meticulous Release Manager",
    "Resourceful Fullstack Developer",
    "Effective Communicator",
    "Self-driven IT Professional",
    "Resilient Under Pressure"
  ];

  //Typewriter effect for "Hello World"
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypewriterText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStage(2), 500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  //For stage progression
  useEffect(() => {
    if (stage === 2) {
      setTimeout(() => setStage(3), 1500);
    }
  }, [stage]);

  //Handled Scrolling
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      //Updating scroll progress
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      document.documentElement.style.setProperty('--scroll-progress', scrollProgress);

      //Determining scroll stage based on scroll position
      let newScrollStage = 0;
      if (scrollY >= sectionBreaks.stage3) {
        newScrollStage = 3;
      } else if (scrollY >= sectionBreaks.stage2) {
        newScrollStage = 2;
      } else if (scrollY >= sectionBreaks.stage1) {
        newScrollStage = 1;
      }

      if (newScrollStage !== scrollStage) {
        setScrollStage(newScrollStage);
      }

      //Handling hero hiding with timing
      if (scrollY >= sectionBreaks.hide && !shouldHideHero && !isAnimatingOut) {
        setIsAnimatingOut(true);
        setTimeout(() => {
          setShouldHideHero(true);
          setIsAnimatingOut(false);
        }, 1500);
      } else if (scrollY < sectionBreaks.hide && shouldHideHero) {
        setShouldHideHero(false);
        setIsAnimatingOut(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    //Initial scroll position check
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [scrollStage, shouldHideHero, isAnimatingOut, sectionBreaks]);

  //Downloading Resume
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'KimayaGaikwad_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToContact = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (shouldHideHero) return null;

  return (
    <section
      ref={heroRef}
      className={`hero-section ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isAnimatingOut ? 'scrolling-out' : ''}`}
    >
      {stage === 1 && (
        <div className="typewriter-container">
          <h1 className="typewriter-text">
            {typewriterText}
            <span className="cursor">|</span>
          </h1>
        </div>
      )}

      {stage >= 2 && (
        <div className="hero-content">
          <div className={`hero-base ${scrollStage === 3 ? 'large-circle' : ''} ${isAnimatingOut ? 'expand-fade' : ''}`}>
            {scrollStage === 0 && (
              <div className="hero-text">
                <span className="hello-world">Hello World</span><span className="comma">,</span>
                <div className="name-text">I'm Kimaya Gaikwad</div>
              </div>
            )}
            {scrollStage === 1 && (
              <div className="experience-text">
                <span className="years">2+ Years</span>
                <div className="of-experience">of Experience</div>
              </div>
            )}
            {scrollStage === 2 && (
              <div className="name-only">Kimaya Gaikwad</div>
            )}
            {scrollStage === 3 && (
              <div className="final-name">Kimaya Gaikwad</div>
            )}
          </div>
          {scrollStage === 0 && (
            <div className="scroll-indicator">
              <span className="arrow"></span>
              <span className="arrow"></span>
              <span className="arrow"></span>
            </div>
          )}

          {scrollStage === 2 && (
            <div className="descriptions-container">
              {descriptions.map((desc, i) => (
                <div
                  key={i}
                  className={`description-circle circle-${i + 1}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {desc}
                </div>
              ))}
            </div>
          )}

          {scrollStage === 3 && (
            <div className="buttons-container">
              <PixelButton onClick={downloadResume} isDarkMode={isDarkMode}>Download Resume</PixelButton>
              <PixelButton onClick={scrollToContact} isDarkMode={isDarkMode}>Let's Connect</PixelButton>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroSection;