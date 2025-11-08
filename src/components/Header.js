import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaChalkboardTeacher, FaImages, FaStar, FaEnvelope } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isProgramsDropdownOpen, setIsProgramsDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    // Smooth scroll behavior for anchor links
    const handleClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
    setIsProgramsDropdownOpen(false);
    setIsGalleryDropdownOpen(false);
  };

  const getMenuItems = (menuName) => {
    switch (menuName) {
      case 'ABOUT US':
        return aboutMenuItems;
      case 'PROGRAMS':
        return programsMenuItems;
      case 'GALLERY':
        return galleryMenuItems;
      default:
        return [];
    }
  };

  const getDropdownState = (menuName) => {
    switch (menuName) {
      case 'ABOUT US':
        return isAboutDropdownOpen;
      case 'PROGRAMS':
        return isProgramsDropdownOpen;
      case 'GALLERY':
        return isGalleryDropdownOpen;
      default:
        return false;
    }
  };

  const setDropdownState = (menuName, state) => {
    switch (menuName) {
      case 'ABOUT US':
        setIsAboutDropdownOpen(state);
        break;
      case 'PROGRAMS':
        setIsProgramsDropdownOpen(state);
        break;
      case 'GALLERY':
        setIsGalleryDropdownOpen(state);
        break;
      default:
        break;
    }
  };

  // About Us dropdown menu items
  const aboutMenuItems = [
    { name: 'Organization', path: '/about/organization' },
    { name: 'Vision Statement', path: '/about/vision' },
    { name: 'Mission Statement', path: '/about/mission' },
    { name: 'Core Values', path: '/about/values' },
    { name: 'Founder & Director', path: '/about/founder' },
    { name: 'Co-Founder', path: '/about/co-founder' }
  ];

  // Programs dropdown menu items
  const programsMenuItems = [
    { name: 'Corporate Training', path: '/programs/corporate' },
    { name: 'Training for Educational Institutions', path: '/programs/educational' },
    { name: 'Train the Trainer Certification', path: '/programs/certification' }
  ];

  // Gallery dropdown menu items
  const galleryMenuItems = [
    { name: 'Photos', path: '/gallery/photos' },
    { name: 'Videos', path: '/gallery/videos' }
  ];

  // Clean navigation items with dropdowns and icons
  const navItems = [
    { name: 'HOME', path: '/', icon: FaHome },
    { name: 'ABOUT US', path: '/about', hasDropdown: true, icon: FaInfoCircle },
    { name: 'PROGRAMS', path: '/programs', hasDropdown: true, icon: FaChalkboardTeacher },
    { name: 'GALLERY', path: '/gallery', hasDropdown: true, icon: FaImages },
    { name: 'TESTIMONIALS', path: '/testimonials', icon: FaStar },
    { name: 'CONTACT US', path: '/contact', icon: FaEnvelope }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img src="/images/logo.jpeg" alt="NPY Skills Academy" />
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="nav-item">
                {item.hasDropdown ? (
                  <div className="dropdown">
                    <div
                      className={`nav-link dropdown-toggle ${location.pathname.startsWith(item.path) ? 'active' : ''}`}
                      onMouseEnter={() => setDropdownState(item.name, true)}
                      onMouseLeave={() => setDropdownState(item.name, false)}
                      onClick={() => setDropdownState(item.name, !getDropdownState(item.name))}
                      onTouchStart={() => setDropdownState(item.name, !getDropdownState(item.name))}
                      role="button"
                      aria-expanded={getDropdownState(item.name)}
                      aria-haspopup="true"
                      aria-label={`${item.name} menu`}
                      tabIndex={0}
                    >
                      <div className="nav-link-content">
                        {item.icon && <item.icon className="nav-icon" aria-hidden="true" />}
                        <Link to={item.path} onClick={closeMenu} style={{color: 'inherit', textDecoration: 'none'}}>
                          {item.name}
                        </Link>
                      </div>
                      <span className="dropdown-arrow" aria-hidden="true">▼</span>
                    </div>
                    <div
                      className={`dropdown-menu ${getDropdownState(item.name) ? 'show' : ''}`}
                      onMouseEnter={() => setDropdownState(item.name, true)}
                      onMouseLeave={() => setDropdownState(item.name, false)}
                      role="menu"
                      aria-label={`${item.name} submenu`}
                    >
                      {getMenuItems(item.name).map((menuItem, index) => (
                        <Link
                          key={index}
                          to={menuItem.path}
                          className="dropdown-item"
                          onClick={(e) => {
                            closeMenu();
                            // If it's a hash link, prevent default and handle navigation
                            if (menuItem.path.includes('#')) {
                              e.preventDefault();
                              const [path, hash] = menuItem.path.split('#');
                              // Navigate to the path with hash to trigger React Router and About.js useEffect
                              navigate(`${path}#${hash}`, { replace: true });
                            }
                          }}
                          role="menuitem"
                          tabIndex={getDropdownState(item.name) ? 0 : -1}
                        >
                          {menuItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                    onClick={closeMenu}
                  >
                    <div className="nav-link-content">
                      {item.icon && <item.icon className="nav-icon" aria-hidden="true" />}
                      {item.name}
                    </div>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="logo logo-right">
          <Link to="/" onClick={closeMenu}>
            <img src="/images/badge.jpeg" alt="NPY Skills Academy" />
          </Link>
        </div>

        <button
          className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;