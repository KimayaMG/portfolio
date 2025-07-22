import React, { useEffect } from 'react';
import '../cssFiles/HeroSection.css';

import PixelButton from './PixelButton';

const HeroSection = ({ isDarkMode }) => {
    // Apply the appropriate mode class to the section
    const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';
    
    return (
        <section className="hero-section">
            <div className="glass-holo-card">
                <h1 className="hero-title">Hi, I'm Kimaya Gaikwad</h1>
                <h2 className="hero-subtitle">Java Developer | React Specialist | Integration Expert</h2>
                <p className="hero-description">
                    Software Engineer with 2+ years of experience delivering enterprise solutions.
                    Specializing in Spring Boot, React, and full-stack development with proven
                    success in payment systems, travel tech, and customer-facing applications.
                </p>
                <div className="cta-container">
                    <PixelButton
                        variant="white"
                        href={process.env.PUBLIC_URL + "/KimayaGaikwad.pdf"}
                        download="KimayaGaikwad.pdf"
                        isDarkMode={isDarkMode}
                        key={`download-button-${isDarkMode ? 'dark' : 'light'}`}
                    >
                        Download Resume
                    </PixelButton>

                    <PixelButton
                        variant="white"
                        onClick={() => {
                            const contactSection = document.getElementById('contact');
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        isDarkMode={isDarkMode}
                        key={`connect-button-${isDarkMode ? 'dark' : 'light'}`}
                    >
                        Let's Connect
                    </PixelButton>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;