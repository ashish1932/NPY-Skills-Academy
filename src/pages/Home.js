import React, { useEffect, useState, useRef } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import SocialSidebar from '../components/SocialSidebar';
import './Home.css';

const Home = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef(null);

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setImageError(false);
    setImageLoaded(true);
    setIsLoading(false);
  };

  const downloadImage = async () => {
    try {
      const response = await fetch('/images/home-hero.jpg');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'home-hero.jpg';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again later.');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');

      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home">
      <div
        className={`background-image ${imageError ? 'error' : ''} ${imageLoaded ? 'loaded' : ''} ${isLoading ? 'loading' : ''}`}
        style={{
          backgroundImage: imageError ? 'none' : `url('/images/home-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        role="img"
        aria-label="Background image of NPY Skills Academy"
      >
        {isLoading && (
          <div className="loading-spinner" aria-live="polite" aria-label="Loading background image">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}
        <img
          ref={imgRef}
          src="/images/home-hero.jpg"
          alt="Professional academic library with books and learning materials representing NPY Skills Academy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: 'none' }}
          aria-hidden="true"
          loading="lazy"
        />
        {imageError && (
          <div className="error-message" role="alert" aria-live="polite">
            <p>Background image failed to load. Displaying default background.</p>
            <button onClick={downloadImage} className="btn btn-secondary" aria-label="Download background image">
              Download Image
            </button>
          </div>
        )}
        {!imageError && (
          <button
            onClick={downloadImage}
            className="download-btn btn btn-secondary"
            aria-label="Download background image"
          >
            Download Background
          </button>
        )}
      </div>
      <HeroCarousel />
      <SocialSidebar />

      <section className="welcome-section">
        <div className="container">
          <div className="welcome-content">
            <h2 className="parallax-element">Welcome to NPY Skills Academy</h2>
            <p className="parallax-element">
              NPY Skills Academy is dedicated to transformative and experiential learning,
              empowering individuals and organizations to achieve their full potential through
              innovative educational experiences and leadership development programs.
            </p>
          </div>
        </div>
      </section>

      <section className="featured-programs">
        <div className="container">
          <h2 className="parallax-element">Our Programs</h2>
          <div className="programs-grid">
            <div className="program-card parallax-element" style={{"--card-index": 0}}>
              <h3>Corporate Training</h3>
              <p>Customized training solutions for organizations looking to enhance team performance and leadership skills.</p>
              <a href="/programs" className="btn btn-primary">Learn More</a>
            </div>
            <div className="program-card parallax-element" style={{"--card-index": 1}}>
              <h3>Training for Educational Institutions</h3>
              <p>Professional development programs designed specifically for educators and academic institutions.</p>
              <a href="/programs" className="btn btn-primary">Learn More</a>
            </div>
            <div className="program-card parallax-element" style={{"--card-index": 2}}>
              <h3>Train the Trainer Certification</h3>
              <p>Comprehensive certification program for aspiring trainers and facilitators.</p>
              <a href="/programs" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="parallax-element">Ready to Transform Your Future?</h2>
          <p className="parallax-element">Join thousands of professionals who have enhanced their skills with NPY Skills Academy.</p>
          <div className="cta-buttons">
            <a href="/contact" className="btn btn-primary">Get Started Today</a>
            <a href="/about" className="btn btn-secondary">Learn About Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;