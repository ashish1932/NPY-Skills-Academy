import React, { useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer" ref={observerRef}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>NPY Skills Academy</h3>
            <p>NPY Skills Academy: Pioneering excellence in skill development, innovative training methodologies, and comprehensive career advancement solutions for the modern workforce since 2002.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <nav aria-label="Footer navigation">
              <div className="quick-links-column">
                <a href="/" aria-label="Go to Home page">Home</a>
                <a href="/about" aria-label="Go to About Us page">About Us</a>
                <a href="/programs" aria-label="Go to Programs page">Programs</a>
                <a href="/testimonials" aria-label="Go to Testimonials page">Testimonials</a>
                <a href="/gallery" aria-label="Go to Gallery page">Gallery</a>
                <a href="/contact" aria-label="Go to Contact page">Contact</a>
              </div>
            </nav>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <address>
              <ul>
                <li><a href="mailto:npyskillsacademy@gmail.com" aria-label="Send email to NPY Skills Academy">📧 npyskillsacademy@gmail.com</a></li>
                <li><a href="tel:+919876543210" aria-label="Call NPY Skills Academy">📞 +91 98765 43210</a></li>
                <li>📍 No. 48/25, 1st Main, Marenahalli, Vijaynagar, Bangalore - 560040</li>
              </ul>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 NPY Skills Academy. All rights reserved.</p>
          <div className="footer-accent"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;