import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import './Gallery.css';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const location = useLocation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    // Handle section navigation based on pathname
    const pathSegments = location.pathname.split('/');
    const section = pathSegments[pathSegments.length - 1];

    // Map URL segments to filter categories
    const sectionMapping = {
      'photos': 'all',
      'videos': 'videos'
    };

    const targetFilter = sectionMapping[section] || 'all';

    if (section && section !== 'gallery') {
      setActiveFilter(targetFilter);

      // Scroll to appropriate section based on filter
      if (targetFilter === 'videos') {
        const videoSection = document.querySelector('.video-gallery');
        if (videoSection) {
          // Add a small delay to ensure the page has rendered
          setTimeout(() => {
            scrollToElement(videoSection);
          }, 100);
        }
      } else if (targetFilter === 'all') {
        // Scroll to photos section (gallery-content)
        const photosSection = document.querySelector('.gallery-content');
        if (photosSection) {
          // Add a small delay to ensure the page has rendered
          setTimeout(() => {
            scrollToElement(photosSection);
          }, 100);
        }
      }
    } else if (section === 'gallery') {
      // When navigating directly to /gallery, scroll to show the title
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

  const galleryItems = [
    { id: 1, category: 'corporate', image: '/images/gallery1.jpg', title: 'Leadership Workshop', description: 'Team building session' },
    { id: 2, category: 'education', image: '/images/gallery2.jpg', title: 'Teacher Training', description: 'Professional development program' },
    { id: 3, category: 'certification', image: '/images/gallery3.jpg', title: 'Certification Ceremony', description: 'Awarding certified trainers' },
    { id: 4, category: 'corporate', image: '/images/gallery4.jpg', title: 'Strategy Session', description: 'Executive leadership program' },
    { id: 5, category: 'education', image: '/images/gallery5.jpg', title: 'Workshop Session', description: 'Interactive learning experience' },
    { id: 6, category: 'events', image: '/images/gallery6.jpg', title: 'Annual Seminar', description: 'Knowledge sharing event' },
    { id: 7, category: 'corporate', image: '/images/gallery7.jpg', title: 'Team Building', description: 'Outdoor adventure activity' },
    { id: 8, category: 'certification', image: '/images/gallery8.jpg', title: 'Advanced Training', description: 'Specialized certification program' }
  ];

  const videoItems = [
    { id: 1, title: 'Program Highlights', description: 'A glimpse into our transformative learning experiences', videoId: 'dQw4w9WgXcQ' },
    { id: 2, title: 'Success Stories', description: 'Hear from our program participants', videoId: 'dQw4w9WgXcQ' },
    { id: 3, title: 'Behind the Scenes', description: 'Meet our team and facilities', videoId: 'dQw4w9WgXcQ' }
  ];

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

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
    <div className="gallery">
      <motion.section
        ref={heroRef}
        className="contact-hero"
        variants={heroVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        aria-labelledby="gallery-hero-heading"
      >
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 id="gallery-hero-heading" className="hero-title">
              Gallery
            </h1>
            <p className="hero-subtitle">
              Explore moments from our transformative learning experiences and events at NPY Skills Academy.
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
                <path d="M4 16L8.586 11.414C8.96106 11.0391 9.46967 10.8284 10 10.8284C10.5303 10.8284 11.0389 11.0391 11.414 11.414L16 16M14 14L15.586 12.414C15.9611 12.0391 16.4697 11.8284 17 11.8284C17.5303 11.8284 18.0389 12.0391 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="gallery-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            className="gallery-filters"
            role="group"
            aria-label="Gallery filters"
            variants={cardVariants}
          >
            <motion.button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
              aria-pressed={activeFilter === 'all'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All
            </motion.button>
            <motion.button
              className={`filter-btn ${activeFilter === 'corporate' ? 'active' : ''}`}
              onClick={() => setActiveFilter('corporate')}
              aria-pressed={activeFilter === 'corporate'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Corporate
            </motion.button>
            <motion.button
              className={`filter-btn ${activeFilter === 'education' ? 'active' : ''}`}
              onClick={() => setActiveFilter('education')}
              aria-pressed={activeFilter === 'education'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Education
            </motion.button>
            <motion.button
              className={`filter-btn ${activeFilter === 'certification' ? 'active' : ''}`}
              onClick={() => setActiveFilter('certification')}
              aria-pressed={activeFilter === 'certification'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Certification
            </motion.button>
            <motion.button
              className={`filter-btn ${activeFilter === 'events' ? 'active' : ''}`}
              onClick={() => setActiveFilter('events')}
              aria-pressed={activeFilter === 'events'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Events
            </motion.button>
          </motion.div>

          <motion.div
            className="gallery-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                className="gallery-item"
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.title}`}
              >
                <motion.img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.div
                  className="gallery-overlay"
                  initial={{ y: 100, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="videos"
        className="video-gallery"
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
            Video Gallery
          </motion.h2>
          <motion.div
            className="video-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {videoItems.map(video => (
              <motion.div
                key={video.id}
                className="video-item"
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <motion.h3
                  whileHover={{ color: "#667eea" }}
                  transition={{ duration: 0.2 }}
                >
                  {video.title}
                </motion.h3>
                <p>{video.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Gallery;