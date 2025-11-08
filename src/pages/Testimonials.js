import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './Testimonials.css';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO, TechCorp Industries',
      program: 'Corporate Leadership Program',
      image: '/images/testimonial1.jpg',
      quote: 'The leadership program at NPY Skills Academy completely transformed my approach to team management. The experiential learning methods helped me understand real-world applications in ways traditional training never could.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Marketing Manager, Global Solutions',
      program: 'Life Skills Development Program',
      image: '/images/testimonial2.jpg',
      quote: 'Participating in the outdoor adventure program was life-changing. It taught me resilience, teamwork, and self-confidence that I apply every day in my personal and professional life.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'HR Director, Innovation Labs',
      program: 'Certified Leadership Trainer Program',
      image: '/images/testimonial3.jpg',
      quote: 'The certification program exceeded my expectations. The trainers are experts in their field, and the hands-on approach ensured I gained practical skills that I immediately applied in my work.'
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Entrepreneur & Coach',
      program: 'Advanced Facilitation Training',
      image: '/images/testimonial4.jpg',
      quote: 'What sets NPY Skills Academy apart is their holistic approach to development. They don\'t just teach skills; they facilitate genuine personal growth and transformation.'
    },
    {
      id: 5,
      name: 'Lisa Thompson',
      role: 'Team Lead, Creative Agency',
      program: 'Emotional Intelligence Workshop',
      image: '/images/testimonial5.jpg',
      quote: 'The emotional intelligence workshop helped me develop better relationships at work and home. The insights I gained continue to benefit me months after the program.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  // Scroll to top when testimonials page loads
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  }, []);

  // Touch and mouse drag handlers
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    // Prevent default scrolling during drag
    if (Math.abs(clientX - startX) > 10) {
      // Note: preventDefault would be called on the event in the actual handler
    }
  };

  const handleEnd = (clientX) => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX - clientX;
    const threshold = 50; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next testimonial
        nextTestimonial();
      } else {
        // Swipe right - previous testimonial
        prevTestimonial();
      }
    }
  };

  // Touch events
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    handleEnd(e.changedTouches[0].clientX);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = (e) => {
    handleEnd(e.clientX);
  };

  const handleMouseLeave = (e) => {
    if (isDragging) {
      handleEnd(e.clientX);
    }
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonial(currentTestimonial === testimonials.length - 1 ? 0 : currentTestimonial + 1);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(currentTestimonial === 0 ? testimonials.length - 1 : currentTestimonial - 1);
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
    <div className="testimonials">
      <motion.section
        ref={heroRef}
        className="contact-hero"
        variants={heroVariants}
        initial="hidden"
        animate={isHeroInView ? "visible" : "hidden"}
        aria-labelledby="testimonials-hero-heading"
      >
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 id="testimonials-hero-heading" className="hero-title">
              Testimonials
            </h1>
            <p className="hero-subtitle">
              Hear from our participants about their transformative experiences at NPY Skills Academy.
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
                <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="testimonials-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container">
          <motion.div
            className="testimonial-carousel"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            variants={cardVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="testimonial-content">
                  <blockquote>
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="testimonial-author">
                    <motion.img
                      src={testimonial.image}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      loading="lazy"
                      decoding="async"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <div className="author-info">
                      <motion.h4
                        whileHover={{ color: "#667eea" }}
                        transition={{ duration: 0.2 }}
                      >
                        {testimonial.name}
                      </motion.h4>
                      <p className="role">{testimonial.role}</p>
                      <p className="program">{testimonial.program}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.button
              className="carousel-arrow carousel-arrow-left"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#10094;
            </motion.button>
            <motion.button
              className="carousel-arrow carousel-arrow-right"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              &#10095;
            </motion.button>

            <div className="carousel-indicators" role="tablist" aria-label="Testimonial indicators">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`indicator ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  role="tab"
                  aria-selected={index === currentTestimonial}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
};

export default Testimonials;