import React from 'react';
import '../cssFiles/ExperienceSection.css';

const ExperienceSection = ({ isDarkMode }) => {
  const experiences = [
    {
      id: 1,
      position: 'Assistant Manager',
      company: 'Thomas Cook India Limited',
      duration: '2021 - 2023',
      location: 'Mumbai, Maharashtra',
      achievements: [
        'Spearheaded the maintenance and development of 5+ new projects and integrations related to Forex, Hotels, Visa Products, ensuring seamless operations and enhancing market competitiveness.',
        'Led the end-to-end implementation of the ForexMate Product from inception, overseeing the creation and deployment of all components and features.',
        'Executed duties as the Release Manager, overseeing successful production releases every week and ensuring seamless deployment processes.',
        'Enhanced the performance of the Flights module by approximately 60%, implementing optimizations and integrating 2 new airline vendors.',
        'Developed an intuitive Admin portal, incorporating Role-Based Access Control (RBAC), streamlining the sales and Administration workflow.',
        'Built innovative Holiday and Dynamic Holiday Packaging modules in close collaboration with key stakeholders.',
        'Actively participated in technological upgrade projects centered on Spring Boot, Java 11, Tomcat 10.1.x, and ReactJS.'
      ]
    }
  ];

  return (
    <div className="experience-section">
      <div className="experience-container">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-card">
            <div className={`experience-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <div className="experience-content">
                <div className="experience-header">
                  <h2 className="position">{exp.position}</h2>
                  <h3 className="company">{exp.company}</h3>
                  <div className="experience-meta">
                    <span className="duration">{exp.duration}</span>
                    <span className="location">{exp.location}</span>
                  </div>
                </div>
                <div className="achievements">
                  <ul>
                    {exp.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;