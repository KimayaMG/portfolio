import React, { useState } from 'react';
import '../cssFiles/EducationSection.css';


const EducationSection = ({ isDarkMode }) => {
    const [expandedCards, setExpandedCards] = useState({});

    const toggleAchievements = (id) => {
        setExpandedCards(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const education = [
        {
            id: 1,
            degree: "Master Of Computer Applications",
            institution: "Veermata Jijabai Technological Institute, Mumbai",
            year: "2021",
            grade: "63.30%",
            achievements: [
                'Department Head of MCA Department, VJTI TECHNOVANZA - 2019',
                'Event Executive of I-Code, VJTI TECHNOVANZA - 2019',
                'Event Co-ordinator of SHERLOCKED, VJTI TECHNOVANZA - 2019',
                'Participated in CODEICON Hackathon by General Mills - One among the 4 Finalists based on Machine Learning, Big Data Analysis and Natural Language Processing',
                'Participated in GOOGLE HASHCODE, 2019',
                'Event Head of SHERLOCKED, VJTI TECHNOVANZA - 2018',
                'Participated in ULTIMATE CODER (I-CODE) and CWAY (I-CODE), TECHNOVANZA 2018, VJTI'
            ]
        },
        {
            id: 2,
            degree: "Bachelor Of Science (Information Technology)",
            institution: "Mulund College Of Commerce, Mumbai",
            year: "2018",
            grade: "60.90%",
            achievements: [
                'Event Head of QUIZMANIA, MCC TECHNOBEAT VERSION i.16 - 2016',
                'Member of Public Relations Department, MCC TECHNOBEAT - 2016',
                'Hosted and organized SALUTO, 2016, MCC',
                'Campaigned for GENDER EQUALITY, 2015 – 2016',
                'Won the MISS ALOHA TITLE, 2015 for the Best Personality in MCC',
                'Winner of various Extempore, Debate, Singing, Poetry Writing, Rifle Shooting competitions'
            ]
        }
    ];


    return (
        <div className="education-section">
            <div className="education-container">
                {education.map((edu) => (
                    <div key={edu.id} className="education-card">
                        <div className={`education-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
                            <div className="education-content">
                                <div className="education-header">
                                    <h2 className="degree">{edu.degree}</h2>
                                    <h3 className="company">{edu.institution}</h3>
                                    <div className="education-meta">
                                        <span className="year">{edu.year}</span>
                                        <span className="grade">{edu.grade}</span>
                                    </div>
                                </div>
                                <div className="achievements">
                                    <button
                                        className={`achievements-toggle ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
                                        onClick={() => toggleAchievements(edu.id)}
                                    >
                                        <span>Achievements</span>
                                        <div className="arrow-container">
                                            <span className={`arrow ${expandedCards[edu.id] ? 'expanded' : ''}`}></span>
                                        </div>
                                    </button>
                                    <div className={`achievements-list ${expandedCards[edu.id] ? 'expanded' : ''}`}>
                                        <ul>
                                            {edu.achievements.map((achievement, index) => (
                                                <li key={index}>{achievement}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationSection;