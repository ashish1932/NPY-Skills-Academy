import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Contact.css';

/**
 * Contact Page Component - Enterprise-grade contact page for NPY Skills Academy
 * Features: Modular architecture, advanced form handling, comprehensive validation,
 * enhanced UX patterns, WCAG 2.1 AA+ accessibility, and professional animations
 *
 * Architecture:
 * - ContactHero: Hero section with compelling CTA
 * - ContactForm: Advanced form with real-time validation
 * - ContactInfo: Professional contact information display
 * - ContactMap: Interactive location map
 */

// Custom hook for form management
const useContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    program: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validationRules = useMemo(() => ({
    name: {
      required: true,
      minLength: 2,
      pattern: /^[a-zA-Z\s]+$/,
      message: 'Please enter a valid name (letters only, minimum 2 characters)'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    phone: {
      pattern: /^[+]?[1-9][\d]{0,15}$/,
      message: 'Please enter a valid phone number'
    },
    message: {
      required: true,
      minLength: 10,
      message: 'Message must be at least 10 characters long'
    }
  }), []);

  const validateField = useCallback((name, value) => {
    const rule = validationRules[name];
    if (!rule) return '';

    if (rule.required && !value.trim()) {
      return `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }

    if (rule.minLength && value.trim().length < rule.minLength) {
      return rule.message;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return rule.message;
    }

    return '';
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField, validationRules]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Send data to backend API
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus({ type: 'success', message: data.message || 'Thank you! Your message has been sent successfully. We\'ll respond within 24 hours.' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        program: '',
        message: ''
      });
      setTouched({});
      setErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Sorry, there was an error sending your message. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit,
    setSubmitStatus
  };
};

// Animation variants
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// ContactHero Component
const ContactHero = () => (
  <motion.section
    className="contact-hero"
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
    aria-labelledby="contact-hero-title"
  >
    <div className="hero-container">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 id="contact-hero-title" className="hero-title">
          Get In Touch With Us
        </h1>
        <p className="hero-subtitle">
          Ready to transform your career or organization? Let's discuss how NPY Skills Academy
          can help you achieve your goals through our comprehensive training programs.
        </p>
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Students Trained</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support</span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="hero-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8L10.5 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </div>
  </motion.section>
);

// ContactForm Component
const ContactForm = ({ formState }) => {
  const {
    formData,
    errors,
    touched,
    isSubmitting,
    submitStatus,
    handleChange,
    handleBlur,
    handleSubmit
  } = formState;

  const programOptions = [
    { value: '', label: 'Select a program of interest' },
    { value: 'corporate', label: 'Corporate Training' },
    { value: 'education', label: 'Training for Educational Institutions' },
    { value: 'certification', label: 'Train the Trainer Certification' },
    { value: 'consulting', label: 'Consulting Services' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <motion.div
      className="contact-form-section"
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="form-header">
        <h2 className="form-title">Send us a Message</h2>
        <p className="form-description">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      <AnimatePresence>
        {submitStatus && (
          <motion.div
            className={`form-status ${submitStatus.type}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="polite"
          >
            <div className="status-icon">
              {submitStatus.type === 'success' ? '✓' : '⚠'}
            </div>
            <p>{submitStatus.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        <div className="form-grid">
          <motion.div
            className="form-group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="name" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.name && touched.name ? 'error' : ''} ${!errors.name && touched.name ? 'success' : ''}`}
              placeholder="Enter your full name"
              required
              aria-describedby={errors.name && touched.name ? "name-error" : undefined}
              aria-invalid={errors.name && touched.name ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.name && touched.name && (
                <motion.span
                  id="name-error"
                  className="form-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                >
                  {errors.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="form-group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="email" className="form-label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.email && touched.email ? 'error' : ''} ${!errors.email && touched.email ? 'success' : ''}`}
              placeholder="your.email@example.com"
              required
              aria-describedby={errors.email && touched.email ? "email-error" : undefined}
              aria-invalid={errors.email && touched.email ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.email && touched.email && (
                <motion.span
                  id="email-error"
                  className="form-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                >
                  {errors.email}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="form-group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${errors.phone && touched.phone ? 'error' : ''} ${!errors.phone && touched.phone && formData.phone ? 'success' : ''}`}
              placeholder="+91 98765 43210"
              aria-describedby={errors.phone && touched.phone ? "phone-error" : undefined}
              aria-invalid={errors.phone && touched.phone ? "true" : "false"}
            />
            <AnimatePresence>
              {errors.phone && touched.phone && (
                <motion.span
                  id="phone-error"
                  className="form-error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  role="alert"
                >
                  {errors.phone}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="form-group"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="organization" className="form-label">
              Organization
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-input"
              placeholder="Company or Institution name"
            />
          </motion.div>

          <motion.div
            className="form-group full-width"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="program" className="form-label">
              Program of Interest
            </label>
            <select
              id="program"
              name="program"
              value={formData.program}
              onChange={handleChange}
              onBlur={handleBlur}
              className="form-select"
            >
              {programOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div
            className="form-group full-width"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="message" className="form-label">
              Message <span className="required">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-textarea ${errors.message && touched.message ? 'error' : ''} ${!errors.message && touched.message ? 'success' : ''}`}
              placeholder="Tell us about your training needs, questions, or how we can help you..."
              rows="6"
              required
              aria-describedby={errors.message && touched.message ? "message-error" : undefined}
              aria-invalid={errors.message && touched.message ? "true" : "false"}
            />
            <div className="textarea-footer">
              <span className="char-count">
                {formData.message.length}/500
              </span>
              <AnimatePresence>
                {errors.message && touched.message && (
                  <motion.span
                    id="message-error"
                    className="form-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    role="alert"
                  >
                    {errors.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.button
          type="submit"
          className="form-submit-btn"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          aria-describedby={isSubmitting ? "submitting-status" : undefined}
        >
          <AnimatePresence mode="wait">
            {isSubmitting ? (
              <motion.span
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="btn-content"
              >
                <motion.div
                  className="loading-spinner"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Sending Message...
              </motion.span>
            ) : (
              <motion.span
                key="submit"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="btn-content"
              >
                Send Message
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <p className="form-privacy">
          By submitting this form, you agree to our privacy policy.
          We respect your privacy and will never share your information.
        </p>
      </form>
    </motion.div>
  );
};

// ContactInfo Component
const ContactInfo = () => {
  const contactItems = [
    {
      icon: 'location',
      title: 'Visit Us',
      content: 'No. 48/25, 1st Main, Marenahalli, Vijaynagar, Bangalore - 560040, Karnataka, India',
      link: null,
      ariaLabel: 'Our physical address'
    },
    {
      icon: 'phone',
      title: 'Call Us',
      content: '+91 98765 43210',
      link: 'tel:+919876543210',
      ariaLabel: 'Call NPY Skills Academy'
    },
    {
      icon: 'email',
      title: 'Email Us',
      content: 'npyskillsacademy@gmail.com',
      link: 'mailto:npyskillsacademy@gmail.com',
      ariaLabel: 'Email NPY Skills Academy'
    },
    {
      icon: 'clock',
      title: 'Business Hours',
      content: 'Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed',
      link: null,
      ariaLabel: 'Our business hours'
    }
  ];

  const getIcon = (iconName) => {
    const icons = {
      location: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      phone: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C15.32 20.4 9.6 15.68 9 10.08C9 9.48 9.48 9 10.08 9H13.08C13.48 9 13.82 9.26 13.92 9.64C14.12 10.42 14.52 11.16 15.08 11.72C15.64 12.28 16.38 12.68 17.16 12.88C17.54 12.98 17.8 13.32 17.8 13.72V16.92C17.8 17.32 17.44 17.68 17.04 17.68C16.64 17.68 16.28 17.32 16.28 16.92V15.72C16.28 15.32 15.92 14.96 15.52 14.96C15.12 14.96 14.76 15.32 14.76 15.72V16.92C14.76 18.12 15.72 19.08 16.92 19.08C18.12 19.08 19.08 18.12 19.08 16.92V13.72C19.08 12.52 18.12 11.56 16.92 11.56C15.72 11.56 14.76 12.52 14.76 13.72V14.92C14.76 15.32 14.4 15.68 14 15.68C13.6 15.68 13.24 15.32 13.24 14.92V13.72C13.24 11.92 14.72 10.44 16.52 10.44C18.32 10.44 19.8 11.92 19.8 13.72V16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      email: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      clock: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    };
    return icons[iconName] || null;
  };

  return (
    <motion.div
      className="contact-info-section"
      variants={cardVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="info-header">
        <h2 className="info-title">Get In Touch</h2>
        <p className="info-description">
          Multiple ways to reach us. We're here to help you succeed.
        </p>
      </div>

      <div className="contact-items">
        {contactItems.map((item, index) => (
          <motion.div
            key={item.icon}
            className="contact-item"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 10, transition: { type: "spring", stiffness: 300 } }}
          >
            <div className="item-icon" aria-hidden="true">
              {getIcon(item.icon)}
            </div>
            <div className="item-content">
              <h3 className="item-title">{item.title}</h3>
              {item.link ? (
                <a
                  href={item.link}
                  className="item-link"
                  aria-label={item.ariaLabel}
                >
                  {item.content}
                </a>
              ) : (
                <div className="item-text" aria-label={item.ariaLabel}>
                  {item.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < item.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ContactMap Component
const ContactMap = () => (
  <motion.div
    className="contact-map-section"
    variants={cardVariants}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="map-header">
      <h2 className="map-title">Find Our Location</h2>
      <p className="map-description">
        Located in the heart of Vijaynagar, easily accessible by metro and road.
      </p>
    </div>

    <div className="map-container">
      <motion.iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167e1b7d4b0f%3A0x4b5c6e3f8d9e2a1b!2sNo.%2048%2F25%2C%201st%20Main%2C%20Marenahalli%2C%20Vijaynagar%2C%20Bengaluru%2C%20Karnataka%20560040!5e0!3m2!1sen!2sin!4v1634567890123!5m2!1sen!2sin"
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: '12px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="NPY Skills Academy Location"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      />
    </div>

    <div className="map-details">
      <div className="detail-item">
        <strong>Address:</strong> No. 48/25, 1st Main, Marenahalli, Vijaynagar
      </div>
      <div className="detail-item">
        <strong>City:</strong> Bangalore - 560040, Karnataka, India
      </div>
      <div className="detail-item">
        <strong>Landmark:</strong> Near Vijaynagar Metro Station
      </div>
      <div className="detail-item">
        <strong>Parking:</strong> Available on premises
      </div>
    </div>
  </motion.div>
);

// Main Contact Component
const Contact = () => {
  const formState = useContactForm();

  return (
    <motion.div
      className="contact-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      role="main"
      aria-label="Contact NPY Skills Academy"
    >
      <ContactHero />

      <motion.section
        className="contact-main"
        variants={sectionVariants}
      >
        <div className="container">
          <div className="contact-layout">
            <ContactForm formState={formState} />
          </div>

          <motion.div
            className="contact-info-layout"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <ContactInfo />
            <ContactMap />
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Contact;