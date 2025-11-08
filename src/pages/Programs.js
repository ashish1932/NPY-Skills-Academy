import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import './Programs.css';

const Programs = () => {
  const location = useLocation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    // Handle section navigation based on pathname
    const pathSegments = location.pathname.split('/');
    const section = pathSegments[pathSegments.length - 1];

    // Map URL segments to actual IDs
    const sectionMapping = {
      'corporate': 'corporate-training-programs',
      'educational': 'training-for-educational-institutions',
      'certification': 'train-the-trainer-certification'
    };

    const targetId = sectionMapping[section] || section;

    if (targetId && targetId !== 'programs') {
      const element = document.getElementById(targetId);
      if (element) {
        // Add a small delay to ensure the page has rendered
        setTimeout(() => {
          scrollToElement(element);
        }, 100);
      }
    } else if (section === 'programs') {
      // When navigating directly to /programs, scroll to show the title
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [location]);

  // Helper function to scroll to element with header offset
  const scrollToElement = (element) => {
    const headerHeight = 90; // Account for header height + some padding
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  const programs = [
    {
      title: 'Corporate Training Programs',
      subtitle: 'Empowering Professionals. Enhancing Performance.',
      description: 'Our Corporate Training Programs are tailored to help professionals and organizations thrive in dynamic business environments. We offer customized modules focusing on leadership development, communication, team building, emotional intelligence, conflict resolution, and change management. Through hands-on activities and real-time simulations, we enable employees to align personal growth with organizational goals—boosting productivity, collaboration, and leadership capabilities across all levels.',
      features: [
        'Outbound Training (OBT)',
        'Leadership Skills',
        'Team Building',
        'Communication Skills',
        'Professional Selling Skills',
        'Time Management',
        'Interpersonal Relationship Skills',
        'Presentation Skills',
        'Change Management',
        'Stress Management',
        'Work-Life Balance',
        'Conflict Management',
        'Creativity & Innovation Designing'
      ],
      image: '/images/corporate.jpg'
    },
    {
      title: 'Training for Educational Institutions',
      subtitle: 'Equipping Educators. Enabling Students.',
      description: 'We collaborate with schools, colleges, and universities to deliver engaging training programs that uplift both educators and learners. Our sessions for faculty emphasize classroom engagement, facilitation skills, NEP-aligned methodologies, and student mentoring, while student programs are centered on career readiness, soft skills, personality development, and confidence building. These programs are designed to bridge the gap between academic learning and real-world expectations.',
      staffPrograms: [
        'Outbound Training (OBT) – Leadership, Team Dynamics, Trust, Communication, Coordination & Collaboration',
        'Gamification',
        'Self-Improvement Through KAIZEN'
      ],
      studentPrograms: [
        'Outbound Training (OBT)',
        'Road Map to Success',
        'SMART Formula for Success',
        'HOPE Changes Everything',
        'Leadership Skills',
        'Jon Interview Skills',
        'Attitude Building',
        'Self-Control & Stress Mgt.',
        'Time Management',
        'Presentation Skills',
        'Rules for Successful Life'
      ],
      image: '/images/education.jpg'
    },
    {
      title: 'Train the Trainer Certification',
      subtitle: 'Inspire as You Facilitate. Grow as You Train.',
      description: 'Our flagship Train the Trainer (TTT) programs are for aspiring and existing trainers, faculty, and facilitators who want to enhance their training delivery and impact. These immersive, certification-based workshops focus on adult learning principles, facilitation techniques, instructional design, audience engagement, and assessment strategies. Whether you\'re beginning your journey as a trainer or looking to refine your craft, our TTT program equips you to train with confidence, clarity, and authenticity',
      certifications: [
        'Outbound Trainer Certification',
        'Corporate Trainer Certification',
        'Soft Skills Trainer Certification',
        'Gamification Certification'
      ],
      image: '/images/certification.jpg'
    }
  ];

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
    <div className="programs">
      <motion.section
        ref={heroRef}
        className="contact-hero"
        variants={heroVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        aria-labelledby="programs-hero-heading"
      >
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 id="programs-hero-heading" className="hero-title">
              Our Programs
            </h1>
            <p className="hero-subtitle">
              Discover comprehensive learning experiences designed for individuals and organizations at NPY Skills Academy.
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
                <path d="M12 14L16 10H8L12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="programs-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              id={program.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}
              className="program-detail"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              tabIndex={0}
              role="region"
              aria-labelledby={`program-${index}-heading`}
            >
              <div className="program-image">
                <motion.img
                  src={program.image}
                  alt={program.title}
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              <div className="program-info">
                <motion.h2
                  id={`program-${index}-heading`}
                  whileHover={{ color: "#667eea" }}
                  transition={{ duration: 0.2 }}
                >
                  {program.title}
                </motion.h2>
                {program.subtitle && <h3 className="program-subtitle">{program.subtitle}</h3>}
                <p className="program-description">{program.description}</p>
                {program.certifications && (
                  <>
                    <ul className="program-features">
                      {program.certifications.map((certification, idx) => (
                        <motion.li
                          key={idx}
                          whileHover={{ scale: 1.05, x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {certification}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
                {program.staffPrograms && (
                  <>
                    <h3>STAFF:</h3>
                    <ul className="program-features">
                      {program.staffPrograms.map((program, idx) => (
                        <motion.li
                          key={idx}
                          whileHover={{ scale: 1.05, x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {program}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
                {program.studentPrograms && (
                  <>
                    <h3>STUDENTS:</h3>
                    <ul className="program-features">
                      {program.studentPrograms.map((program, idx) => (
                        <motion.li
                          key={idx}
                          whileHover={{ scale: 1.05, x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {program}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
                {!program.certifications && !program.staffPrograms && !program.studentPrograms && program.features && (
                  <>
                    <h3>Key Features:</h3>
                    <ul className="program-features">
                      {program.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          whileHover={{ scale: 1.05, x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </>
                )}
                <motion.a
                  href="/contact"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More & Enroll
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="why-choose-us"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.h2
            variants={cardVariants}
            whileHover={{ color: "#667eea" }}
            transition={{ duration: 0.2 }}
          >
            Why Choose NPY Skills Academy?
          </motion.h2>
          <div className="benefits-grid">
            <motion.div
              className="benefit-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>Experiential Learning</h3>
              <p>Our programs combine hands-on activities with theoretical knowledge for lasting impact.</p>
            </motion.div>
            <motion.div
              className="benefit-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>Expert Faculty</h3>
              <p>Learn from industry experts and certified trainers with decades of experience.</p>
            </motion.div>
            <motion.div
              className="benefit-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>Customized Solutions</h3>
              <p>We tailor our programs to meet your specific organizational or individual needs.</p>
            </motion.div>
            <motion.div
              className="benefit-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>Proven Results</h3>
              <p>Over 95% satisfaction rate with measurable improvements in performance and skills.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Programs;