import React, { useState, useEffect, useRef } from 'react';
import './HeroCarousel.css';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragVelocity, setDragVelocity] = useState(0);
  const carouselRef = useRef(null);
  const lastDragTime = useRef(0);
  const lastDragX = useRef(0);

  const slides = [
    {
      image: '/images/hero1.jpg',
      title: 'Empower',
      subtitle: 'Your Potential Through Learning'
    },
    {
      image: '/images/hero2.jpg',
      title: 'Enhance',
      subtitle: 'Skills for Tomorrow'
    },
    {
      image: '/images/hero3.jpg',
      title: 'Trust',
      subtitle: 'In Your Career Journey'
    },
    {
      image: '/images/hero4.jpg',
      title: 'Transform',
      subtitle: 'Lives Through Education'
    },
    {
      image: '/images/hero5.jpg',
      title: 'Achieve',
      subtitle: 'Excellence Together'
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
      }, 4000);

      return () => clearInterval(timer);
    }
  }, [slides.length, isPaused]);

  // Touch and mouse drag handlers with velocity tracking
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setIsPaused(true); // Pause auto-play during interaction
    lastDragTime.current = Date.now();
    lastDragX.current = clientX;
    setDragVelocity(0);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;

    // Calculate velocity for enhanced swipe detection
    const currentTime = Date.now();
    const timeDiff = currentTime - lastDragTime.current;
    const distanceDiff = clientX - lastDragX.current;

    if (timeDiff > 0) {
      setDragVelocity(Math.abs(distanceDiff) / timeDiff);
    }

    lastDragTime.current = currentTime;
    lastDragX.current = clientX;

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
    const velocityThreshold = 0.5; // Minimum velocity for fast swipe

    // Resume auto-play after a short delay
    setTimeout(() => setIsPaused(false), 2000);

    if (Math.abs(diff) > threshold || dragVelocity > velocityThreshold) {
      if (diff > 0 || (diff === 0 && dragVelocity > velocityThreshold && clientX < startX)) {
        // Swipe left or fast swipe left - next slide
        nextSlide();
      } else {
        // Swipe right or fast swipe right - previous slide
        prevSlide();
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

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <section className="hero-carousel">
      <div
        className="carousel-container"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <div className="slide-buttons">
                  <a href="/programs" className="btn btn-primary">Explore Programs</a>
                  <a href="/contact" className="btn btn-secondary">Get Started</a>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          className="carousel-arrow carousel-arrow-left"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          className="carousel-arrow carousel-arrow-right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          &#10095;
        </button>

        <button
          className={`carousel-control carousel-pause-play ${isPaused ? 'paused' : 'playing'}`}
          onClick={togglePause}
          aria-label={isPaused ? 'Resume carousel' : 'Pause carousel'}
        >
          {isPaused ? '▶' : '⏸'}
        </button>

        <div className="carousel-indicators" role="tablist" aria-label="Slide indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === currentSlide}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;