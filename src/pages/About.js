import React, { useLayoutEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import './About.css';

/**
 * About Component - Displays comprehensive information about NPY Skills Academy
 * Features: Interactive sections, smooth animations, accessibility compliance, responsive design
 */
const About = () => {
   const location = useLocation();
   const [activeAccordion, setActiveAccordion] = useState(null);
   const [expandedFounderBio, setExpandedFounderBio] = useState(false);
   const [valueClickCounts, setValueClickCounts] = useState({});
   const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', message: '', rating: 0 });
   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
   const heroRef = useRef(null);
   const isHeroInView = useInView(heroRef, { once: true });
   const controls = useAnimation();

  useLayoutEffect(() => {
    // Handle hash navigation for anchor links with improved accessibility
    if (location.hash) {
      const hashId = location.hash.substring(1);
      const element = document.getElementById(hashId);
      if (element) {
        // Use setTimeout with a longer delay to ensure all components are fully rendered
        setTimeout(() => {
          // Get the actual header height dynamically
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 90; // Fallback to 90 if not found
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Focus management for accessibility after scroll completes
          setTimeout(() => {
            element.focus({ preventScroll: true });
          }, 1000);
        }, 300);
      }
    }
  }, [location.hash]);

  useLayoutEffect(() => {
    // Handle section navigation based on pathname
    const pathSegments = location.pathname.split('/');
    const section = pathSegments[pathSegments.length - 1];

    if (section && section !== 'about') {
      const element = document.getElementById(section);
      if (element) {
        // Use setTimeout with a longer delay to ensure all components are fully rendered
        setTimeout(() => {
          // Get the actual header height dynamically
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 90; // Fallback to 90 if not found
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          element.focus({ preventScroll: true });
        }, 300);
      }
    } else if (section === 'about') {
      // When navigating directly to /about, scroll to show the title
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 300);
    }
  }, [location.pathname]);


  // Toggle accordion functionality
   const toggleAccordion = (index) => {
     setActiveAccordion(activeAccordion === index ? null : index);
   };

   // Toggle founder bio expansion
   const toggleFounderBio = () => {
     setExpandedFounderBio(!expandedFounderBio);
   };

   // Handle value click counter
   const handleValueClick = (valueIndex) => {
     setValueClickCounts(prev => ({
       ...prev,
       [valueIndex]: (prev[valueIndex] || 0) + 1
     }));
   };

   // Handle feedback form input changes
   const handleFeedbackChange = (e) => {
     const { name, value } = e.target;
     setFeedbackForm(prev => ({ ...prev, [name]: value }));
   };

   // Handle feedback form submission
   const handleFeedbackSubmit = (e) => {
     e.preventDefault();
     // Here you could send the feedback to a server
     alert('Thank you for your feedback!');
     setFeedbackForm({ name: '', email: '', message: '', rating: 0 });
     setShowFeedbackForm(false);
   };

   // Handle rating change
   const handleRatingChange = (rating) => {
     setFeedbackForm(prev => ({ ...prev, rating }));
   };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="about">
      <motion.section
        ref={heroRef}
        className="contact-hero"
        variants={heroVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        aria-labelledby="about-hero-heading"
      >
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 id="about-hero-heading" className="hero-title">
              About NPY Skills Academy
            </h1>
            <p className="hero-subtitle">
              Discover our story, mission, and the passionate team behind transformative learning experiences at NPY Skills Academy.
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
                <path d="M12 2L13.09 8.26L19 9L13.09 9.74L12 16L10.91 9.74L5 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.section>

          <motion.section
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="container">
              {/* Organization Section */}
              <motion.div
                id="organization"
                className="organization-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="region"
                aria-labelledby="organization-heading"
              >
                <h2 id="organization-heading">Organization</h2>
                <div className="organization-content">
                  <p>
                    NPY Skills Academy is a premier training and development organization dedicated to transforming individuals and institutions through innovative, experiential, and results-driven learning solutions. We specialize in delivering impactful training programs for corporates, educational institutions, and aspiring trainers, with a clear focus on unlocking human potential and driving performance excellence.
                  </p>
                  <p>
                    With decades of combined experience in soft skills training, leadership development, behavioral facilitation, and Train the Trainer (TTT) certification, our team of experts brings a unique blend of academic insight and real-world application. At NPY Skills Academy, we believe that learning should not only be informative—it should be transformative.
                  </p>
                  <p>
                    Our tailored programs are designed to:
                  </p>
                  <ul>
                    <li>Enhance leadership, teamwork, communication, and interpersonal effectiveness in the corporate world.</li>
                    <li>Equip students and faculty in educational institutions with essential skills for academic and professional success.</li>
                    <li>Empower trainers and educators with advanced tools, methodologies, and facilitation techniques through our Train the Trainer Programs.</li>
                  </ul>
                  <p>
                    Rooted in authenticity, passion, and continuous improvement, we take pride in our ability to create engaging learning experiences that inspire change, build capabilities, and deliver measurable outcomes.
                  </p>
                  <p>
                    Join us on a journey where learning meets purpose, and transformation becomes tangible.
                  </p>
                </div>
              </motion.div>

              {/* Vision Section */}
              <motion.div
                id="vision"
                className="vision-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="region"
                aria-labelledby="vision-heading"
              >
                <h2 id="vision-heading">Vision Statement</h2>
                <div className="vision-content">
                  <p>
                    To be a globally recognized hub for transformational learning, empowering individuals and institutions to excel through skill development, innovative training, and human-centered growth.
                  </p>
                </div>
              </motion.div>

              {/* Mission Section */}
              <motion.div
                id="mission"
                className="mission-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="region"
                aria-labelledby="mission-heading"
              >
                <h2 id="mission-heading">Mission Statement</h2>
                <div className="mission-content">
                  <p>
                    To deliver transformative and experiential training programs that empower individuals, teams, and institutions with the skills, mindset, and strategies needed to thrive in a rapidly evolving world. We are committed to excellence, authenticity, and lifelong learning that drives meaningful change.
                  </p>
                </div>
              </motion.div>

              {/* Values Section */}
              <motion.div
                id="values"
                className="values-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="region"
                aria-labelledby="values-heading"
              >
                <h2 id="values-heading">Core Values</h2>
                <div className="values-content">
                  <ol>
                    <motion.li
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleValueClick(0)}
                      style={{ cursor: 'pointer' }}
                      title={`Clicked ${valueClickCounts[0] || 0} times`}
                    >
                      <strong>Excellence</strong> – We pursue the highest standards in all our programs and interactions.
                      {valueClickCounts[0] > 0 && <span style={{ fontSize: '0.8rem', color: '#4facfe', marginLeft: '0.5rem' }}>❤️ {valueClickCounts[0]}</span>}
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleValueClick(1)}
                      style={{ cursor: 'pointer' }}
                      title={`Clicked ${valueClickCounts[1] || 0} times`}
                    >
                      <strong>Integrity</strong> – We lead with honesty, transparency, and trust.
                      {valueClickCounts[1] > 0 && <span style={{ fontSize: '0.8rem', color: '#4facfe', marginLeft: '0.5rem' }}>❤️ {valueClickCounts[1]}</span>}
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleValueClick(2)}
                      style={{ cursor: 'pointer' }}
                      title={`Clicked ${valueClickCounts[2] || 0} times`}
                    >
                      <strong>Innovation</strong> – We embrace creativity and continuous improvement in our learning solutions.
                      {valueClickCounts[2] > 0 && <span style={{ fontSize: '0.8rem', color: '#4facfe', marginLeft: '0.5rem' }}>❤️ {valueClickCounts[2]}</span>}
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleValueClick(3)}
                      style={{ cursor: 'pointer' }}
                      title={`Clicked ${valueClickCounts[3] || 0} times`}
                    >
                      <strong>Empowerment</strong> – We believe in enabling individuals to unlock their full potential.
                      {valueClickCounts[3] > 0 && <span style={{ fontSize: '0.8rem', color: '#4facfe', marginLeft: '0.5rem' }}>❤️ {valueClickCounts[3]}</span>}
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleValueClick(4)}
                      style={{ cursor: 'pointer' }}
                      title={`Clicked ${valueClickCounts[4] || 0} times`}
                    >
                      <strong>Collaboration</strong> – We foster strong partnerships and team synergy for collective success.
                      {valueClickCounts[4] > 0 && <span style={{ fontSize: '0.8rem', color: '#4facfe', marginLeft: '0.5rem' }}>❤️ {valueClickCounts[4]}</span>}
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleValueClick(5)}
                      style={{ cursor: 'pointer' }}
                      title={`Clicked ${valueClickCounts[5] || 0} times`}
                    >
                      <strong>Authenticity</strong> – We remain true to our purpose, people, and promise.
                      {valueClickCounts[5] > 0 && <span style={{ fontSize: '0.8rem', color: '#4facfe', marginLeft: '0.5rem' }}>❤️ {valueClickCounts[5]}</span>}
                    </motion.li>
                    <motion.li
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => handleValueClick(6)}
                      style={{ cursor: 'pointer' }}
                      title={`Clicked ${valueClickCounts[6] || 0} times`}
                    >
                      <strong>Impact</strong> – We focus on creating meaningful, measurable, and lasting outcomes.
                      {valueClickCounts[6] > 0 && <span style={{ fontSize: '0.8rem', color: '#4facfe', marginLeft: '0.5rem' }}>❤️ {valueClickCounts[6]}</span>}
                    </motion.li>
                  </ol>
                </div>
              </motion.div>

              {/* Founder Section */}
              <motion.div
                id="founder"
                className="founder-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="region"
                aria-labelledby="founder-heading"
              >
                <h2 id="founder-heading">Founder & Director</h2>
                <div className="founder-content">
                  <div className="founder-profile">
                    <motion.img
                      src="/images/founder.jpg"
                      alt="Dr. Naveen P Y - Founder & Director of NPY Skills Academy"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div className="founder-info">
                      <img
                        src="/images/placeholder.jpg"
                        alt="Additional founder photo"
                        className="founder-photo-placeholder"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <motion.h3
                        whileHover={{ color: "#667eea" }}
                        transition={{ duration: 0.2 }}
                      >
                        Dr. Naveen P Y
                      </motion.h3>
                      <p className="role">Founder & Director, NPY Skills Academy</p>
                      <p className="credentials">MBA | M.Sc (Applied Psychology) | M.Phil | Ph.D | NET & SET Qualified</p>
                      <p className="certifications">Certifies Outbound, Corporate & Soft Skills Facilitator from IIPE, Canada and Lead Corp.</p>
                      <p className="title">Psychologist & Motivational Speaker</p>
                      <p>
                        Dr. Naveen P Y is a seasoned Soft Skills Trainer, Certified Outbound Trainer, and Transformational Facilitator with <span className="achievement-bold">over 20 years of experience</span> in shaping individuals across corporate, academic, and social sectors. His deep-rooted passion for personal development, combined with a research-driven approach, has impacted <span className="achievement-bold">thousands of professionals, educators, and students nationwide</span>.
                      </p>
                      <p>
                        As the visionary founder of NPY Skills Academy, Dr. Naveen has led the organization with a strong belief in experiential learning, behavioral transformation, and value-based education. His dynamic training style, empathetic leadership, and multidisciplinary expertise make him a sought-after facilitator in both corporate boardrooms and academic forums.
                      </p>
                      {!expandedFounderBio && (
                        <motion.button
                          onClick={toggleFounderBio}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            marginTop: '1rem'
                          }}
                        >
                          Read More About Dr. Naveen's Achievements
                        </motion.button>
                      )}
                      {expandedFounderBio && (
                        <>
                          <p>
                            Beyond training, Dr. Naveen is an enthusiastic actor, having featured in <span className="achievement-bold">six short films</span>, one of which won the <span className="achievement-bold">Best Short Film Award at the 2024 International Short Film Festival</span>. A committed social contributor, he has <span className="achievement-bold">donated blood 34 times</span>, echoing his lifelong commitment to service and humanity.
                          </p>
                          <motion.button
                            onClick={toggleFounderBio}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                              color: 'white',
                              border: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '20px',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              marginTop: '1rem'
                            }}
                          >
                            Show Less
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Co-Founder Section */}
              <motion.div
                id="co-founder"
                className="cofounder-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="region"
                aria-labelledby="cofounder-heading"
              >
                <h2 id="cofounder-heading">Co-Founder</h2>
                <div className="cofounder-content">
                  <div className="cofounder-profile">
                    <div className="cofounder-info">
                      <motion.p
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1, scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        Coming Soon...
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Feedback Section */}
              <motion.div
                className="feedback-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="region"
                aria-labelledby="feedback-heading"
              >
                <h2 id="feedback-heading">Share Your Feedback</h2>
                <div className="feedback-content">
                  {!showFeedbackForm ? (
                    <motion.button
                      onClick={() => setShowFeedbackForm(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                      }}
                    >
                      Give Us Your Feedback
                    </motion.button>
                  ) : (
                    <motion.form
                      onSubmit={handleFeedbackSubmit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={feedbackForm.name}
                        onChange={handleFeedbackChange}
                        required
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          fontSize: '1rem'
                        }}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={feedbackForm.email}
                        onChange={handleFeedbackChange}
                        required
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          fontSize: '1rem'
                        }}
                      />
                      <textarea
                        name="message"
                        placeholder="Your Feedback"
                        value={feedbackForm.message}
                        onChange={handleFeedbackChange}
                        required
                        rows={4}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: '1px solid #ddd',
                          fontSize: '1rem',
                          resize: 'vertical'
                        }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>Rating:</span>
                        {[1, 2, 3, 4, 5].map(star => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => handleRatingChange(star)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                              background: 'none',
                              border: 'none',
                              fontSize: '1.5rem',
                              cursor: 'pointer',
                              color: star <= feedbackForm.rating ? '#ffd700' : '#ddd'
                            }}
                          >
                            ★
                          </motion.button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}
                        >
                          Submit Feedback
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => setShowFeedbackForm(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{
                            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600'
                          }}
                        >
                          Cancel
                        </motion.button>
                      </div>
                    </motion.form>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.section>
    </div>
  );
};

export default About;