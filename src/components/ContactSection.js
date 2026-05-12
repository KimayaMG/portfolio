import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../cssFiles/ContactSection.css';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const ContactSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    time: '',
    subject: '',
    message: '',
    company: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Protection states
  const [formStartTime] = useState(Date.now());
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //Check
    if (formData.company) {
      return;
    }
    const timeTaken = (Date.now() - formStartTime) / 1000;
    if (timeTaken < 3) {
      return;
    }
    //Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < 15000) {
      alert("Please wait before sending another message.");
      return;
    }
    setLastSubmitTime(now);
    //Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    const templateParams = {
      name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'kimaya.mangesh@gmail.com',
      time: new Date().toLocaleString()
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', time: '', company: '' });
        setTimeout(() => setStatus(''), 4000);
      })
      .catch(() => {
        setStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={`contact-section ${modeClass}`}>
      <form onSubmit={handleSubmit} className="contact-form">

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          style={{ display: 'none' }}
          autoComplete="off"
        />

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className={modeClass}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="your.email@example.com"
              className={modeClass}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Subject"
            className={modeClass}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message here..."
            rows="8"
            className={modeClass}
          />
        </div>

        <button
          type="submit"
          className={`submit-button ${modeClass}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <div className="status-message success">
            ✅ Message sent successfully!
          </div>
        )}
        {status === 'error' && (
          <div className="status-message error">
            ❌ Something went wrong. Check entered Email ID, and please try again.
          </div>
        )}
      </form>

      <div className="contact-info">
        <div className="contact-links">
          <a
            href="https://linkedin.com/in/kimaya-gaikwad"
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-link ${modeClass}`}
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/KimayaMG"
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-link ${modeClass}`}
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.instagram.com/exuberant_daydreamer/"
            target="_blank"
            rel="noopener noreferrer"
            className={`contact-link ${modeClass}`}
            aria-label="Instagram"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="mailto:kimaya.mangesh@gmail.com"
            className={`contact-link ${modeClass}`}
            aria-label="Email"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>

        <div className="info-item">
          <FontAwesomeIcon icon={faLocationDot} className="info-icon" />
          <span className="info-text">
            <label> Mumbai, Maharashtra, India </label>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;