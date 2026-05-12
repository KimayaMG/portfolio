import React from 'react';
import '../cssFiles/SkillsSection.css';

import javaLogo from '../ReqdImgs/JavaLogo.png';
import mysqlLogo from '../ReqdImgs/MySQLLogo.png';
import HibernateLogo from '../ReqdImgs/HibernateLogo.svg';
import HTML5Logo from '../ReqdImgs/HTML5Logo.png';
import CSS3Logo from '../ReqdImgs/CSS3Logo.png';
import JavaScriptLogo from '../ReqdImgs/JavaScriptLogo.png';
import ReactJSLogo from '../ReqdImgs/ReactJSLogo.svg';
import GitLogo from '../ReqdImgs/GitLogo.png';
import RESTAPILogo from '../ReqdImgs/RESTAPILogo.png';
import PostmanLogo from '../ReqdImgs/PostmanLogo.png';
import ReleaseManagementLogo from '../ReqdImgs/ReleaseManagementLogo.png';
import OpenCMSLogo from '../ReqdImgs/OpenCMSLogo.svg';

const SkillsSection = ({ isDarkMode }) => {
  const skills = [
    { id: 1,  name: 'Java',               skillLogo: javaLogo },
    { id: 2,  name: 'MySQL',              skillLogo: mysqlLogo },
    { id: 3,  name: 'HTML5',              skillLogo: HTML5Logo },
    { id: 4,  name: 'Hibernate',          skillLogo: HibernateLogo },
    { id: 5,  name: 'CSS3',               skillLogo: CSS3Logo },
    { id: 6,  name: 'JavaScript',         skillLogo: JavaScriptLogo },
    { id: 7,  name: 'React',              skillLogo: ReactJSLogo },
    { id: 8,  name: 'Git',                skillLogo: GitLogo },
    { id: 9,  name: 'REST API',           skillLogo: RESTAPILogo },
    { id: 10, name: 'Postman',            skillLogo: PostmanLogo },
    { id: 11, name: 'Release Management', skillLogo: ReleaseManagementLogo },
    { id: 12, name: 'OpenCMS',            skillLogo: OpenCMSLogo },
  ];

  return (
    <div className="skills-section">
      <div className="skills-container">
        {skills.map((skill) => (
          <div key={skill.id} className="tile">
            <div className={`wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <img src={skill.skillLogo} className="bgImage" alt={skill.name} />
            </div>
            <img src={skill.skillLogo} className="poppedUpSkillLogo" alt={skill.name} />
            <div className="skillName">{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;