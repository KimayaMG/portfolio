import React from 'react';
import '../cssFiles/ExperienceSection.css';

const ExperienceSection = ({ isDarkMode }) => {
    const experience = {
        title: "Assistant Manager",
        company: "Thomas Cook India Limited",
        duration: "2021 - 2023",
        location: "Mumbai, Maharashtra",
        achievements: [
            "Spearheaded the maintenance and development of 5+ new projects and integrations related to Forex Product",
            "Led the end-to-end implementation of the ForexMate Product from inception, resulting in successful launch and market penetration",
            "Executed duties as Release Manager, overseeing successful production releases every week",
            "Developed the Visa module from inception, enhancing transactional efficiency and customer satisfaction",
            "Engineered tailored solutions for 8 distinct Payment module requirements",
            "Collaborated on integration projects with 2 vendors for the Hotels Product, revamping the complete Hotel Portal",
            "Enhanced the performance of the Flights module by approximately 60% and integrated 2 new airline vendors",
            "Developed an intuitive Admin portal with Role-Based Access Control (RBAC)",
            "Played a key role in developing 2 white-labelled projects focusing on Visa and Forex modules",
            "Built innovative Holiday and Dynamic Holiday Packaging modules in collaboration with key stakeholders",
            "Participated in technological upgrade projects using Spring Boot, Java 11, Tomcat 10.1.x, and ReactJS",
            "Worked on accounts-based integration project Canvas, generating insightful reports for decision-making"
        ]
    };

    const education = [
        {
            degree: "Master Of Computer Applications",
            institution: "Veermata Jijabai Technological Institute, Mumbai",
            year: "2021",
            grade: "63.30%"
        },
        {
            degree: "Bachelor Of Science (Information Technology)",
            institution: "Mulund College Of Commerce, Mumbai",
            year: "2018",
            grade: "60.90%"
        }
    ];

    return (

        <div className={`experience-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

        </div>
    );
};

export default ExperienceSection;