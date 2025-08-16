import React from 'react';
import '../cssFiles/ProjectsSection.css';

//Importing Images
import VocaScroll from '../ReqdImgs/VocaScroll.png';
import GenAIHealthCareAssistant from '../ReqdImgs/GenAIHealthCareAssistant.png';
import WIP from '../ReqdImgs/WIP2.png';

const ProjectsSection = ({ isDarkMode }) => {
    const projects = [
        {
            id: 1,
            name: 'VocaScroll',
            description: 'VocaScroll is a comprehensive Chrome extension that brings voice-controlled navigation to your browsing experience. With AI-powered command processing and continuous listening capabilities, it enhances web accessibility and provides hands-free control over scrolling, video playback, tab management, and more.',
            image: VocaScroll,
            link: 'https://github.com/KimayaMG/VocaScroll'
        },
        {
            id: 2,
            name: 'GenAI HealthCare Assistant',
            description: 'A conversational health companion that translates everyday symptom descriptions into evidence‑based explanations and recommends credible, nearby providers — all with empathy and responsible disclaimers.',
            image: GenAIHealthCareAssistant,
            link: 'https://medium.com/@siddheshnikam8/building-a-symptom-aware-genai-assistant-that-recommends-local-care-b60c04ca9aa4'
        },
        {
            id: 3,
            name: 'Exma',
            description: 'An AI Powered, spring boot based, secure Expense Management System that allows users to manage their expenses efficiently. It provides features like expense tracking, budget management, and financial reporting.',
            image: WIP,
            link: ''
        }
    ];

    return (
    <div className="project-section">
      <div className="project-container">
        {projects.map((project) => (
          <div key={project.id} className="projectTile" onClick={project.link ? () => window.open(project.link, '_blank') : null}>
            <div className={`wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <img src={project.image} className="image" alt={project.name} />
            </div>
            <div className="projectDescription">{project.description}</div>
            <div className="projectName">{project.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;