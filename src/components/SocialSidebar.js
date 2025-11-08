import React, { useState, useEffect, useRef } from 'react';
import './SocialSidebar.css';

// SocialSidebar component: Displays a sidebar with social media links, tooltips, and keyboard navigation
const SocialSidebar = () => {
  // State for tooltip visibility, text, position, platform, and rich content
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: '',
    position: { x: 0, y: 0 },
    platform: '',
    description: '',
    followers: ''
  });

  // State for sidebar visibility (based on intersection observer)
  const [isVisible, setIsVisible] = useState(false);

  // State for active link index (for keyboard navigation)
  const [activeIndex, setActiveIndex] = useState(-1);

  // Ref for the sidebar element
  const sidebarRef = useRef(null);

  // Intersection Observer to detect when sidebar is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sidebarRef.current) {
      observer.observe(sidebarRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Function to show rich tooltip on hover/focus
  const showTooltip = (text, platform, event) => {
    const rect = event.target.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;

    // Rich content based on platform
    const platformData = {
      facebook: { description: 'Connect with us on Facebook', followers: '10K+ followers' },
      twitter: { description: 'Follow our latest updates', followers: '5K+ followers' },
      linkedin: { description: 'Professional network & insights', followers: '2K+ connections' },
      instagram: { description: 'Visual stories & behind-the-scenes', followers: '8K+ followers' },
      youtube: { description: 'Educational videos & tutorials', followers: '15K+ subscribers' }
    };

    const data = platformData[platform] || { description: '', followers: '' };

    setTooltip({
      visible: true,
      text,
      platform,
      description: data.description,
      followers: data.followers,
      position: {
        x: isMobile ? rect.left + rect.width / 2 : rect.left - 10,
        y: rect.top + rect.height / 2
      }
    });
  };

  // Function to hide tooltip
  const hideTooltip = () => {
    setTooltip({
      visible: false,
      text: '',
      position: { x: 0, y: 0 },
      platform: '',
      description: '',
      followers: ''
    });
  };

  // Keyboard navigation handler
  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        event.target.click();
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(Math.max(0, index - 1));
        break;
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(Math.min(socialLinks.length - 1, index + 1));
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(socialLinks.length - 1);
        break;
      default:
        break;
    }
  };

  // Effect to focus the active link
  useEffect(() => {
    if (activeIndex >= 0 && sidebarRef.current) {
      const links = sidebarRef.current.querySelectorAll('.social-link');
      if (links[activeIndex]) {
        links[activeIndex].focus();
      }
    }
  }, [activeIndex]);

  // Array of social media links with their properties
  const socialLinks = [
    {
      href: 'https://www.facebook.com',
      label: 'Facebook',
      platform: 'facebook',
      iconPath: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
      ariaLabel: 'Visit our Facebook page - opens in new tab',
      color: '#1877f2'
    },
    {
      href: 'https://www.twitter.com',
      label: 'Twitter',
      platform: 'twitter',
      iconPath: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
      ariaLabel: 'Follow us on Twitter - opens in new tab',
      color: '#1da1f2'
    },
    {
      href: 'https://www.linkedin.com/in/dr-naveen-p-y-012052220/',
      label: 'LinkedIn',
      platform: 'linkedin',
      iconPath: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
      ariaLabel: 'Connect with us on LinkedIn - opens in new tab',
      color: '#0077b5'
    },
    {
      href: 'https://www.instagram.com/yethendranaveen/',
      label: 'Instagram',
      platform: 'instagram',
      iconPath: 'M12.017 0C8.396 0 7.966.014 6.302.064 4.652.114 3.675.334 2.936.64c-.796.309-1.47.899-2.126 1.555C.145 2.851 0 3.51 0 4.27v15.46c0 .76.145 1.419.81 2.075.656.656 1.33 1.246 2.126 1.555.74.306 1.717.526 3.367.576 1.664.05 2.094.064 5.715.064s4.05-.014 5.714-.064c1.65-.05 2.627-.27 3.367-.576.796-.309 1.47-.899 2.126-1.555.665-.656 1.01-1.315 1.01-2.075V4.27c0-.76-.345-1.419-1.01-2.075C21.855.899 21.181.309 20.385 0c-.74-.306-1.717-.526-3.367-.576C16.05.014 15.62 0 12 0zm0 2.163c3.532 0 3.946.014 5.34.064 1.31.05 2.027.27 2.51.446.96.346 1.645.999 2.301 1.655.656.656 1.309 1.341 1.655 2.301.176.483.396 1.2.446 2.51.05 1.394.064 1.808.064 5.34s-.014 3.946-.064 5.34c-.05 1.31-.27 2.027-.446 2.51-.346.96-.999 1.645-1.655 2.301-.656.656-1.341 1.309-2.301 1.655-.483.176-1.2.396-2.51.446-1.394.05-1.808.064-5.34.064s-3.946-.014-5.34-.064c-1.31-.05-2.027-.27-2.51-.446-.96-.346-1.645-.999-2.301-1.655C2.509 19.981 1.856 19.296 1.5 18.336c-.176-.483-.396-1.2-.446-2.51C1.004 14.442.99 14.028.99 10.496s.014-3.946.064-5.34c.05-1.31.27-2.027.446-2.51.346-.96.999-1.645 1.655-2.301.656-.656 1.309-1.341 1.655-2.301.483-.176 1.2-.396 2.51-.446 1.394-.05 1.808-.064 5.34-.064zm0 3.888a6.112 6.112 0 100 12.224 6.112 6.112 0 000-12.224zm0 10.064a3.952 3.952 0 110-7.904 3.952 3.952 0 010 7.904zm6.406-11.39a1.423 1.423 0 11-2.846 0 1.423 1.423 0 012.846 0z',
      ariaLabel: 'Follow us on Instagram - opens in new tab',
      color: '#bc1888'
    },
    {
      href: 'https://www.youtube.com',
      label: 'YouTube',
      platform: 'youtube',
      iconPath: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
      ariaLabel: 'Subscribe to our YouTube channel - opens in new tab',
      color: '#ff0000'
    }
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`social-sidebar ${isVisible ? 'visible' : ''}`}
      aria-label="Social media links"
    >
      {socialLinks.map((link, index) => (
        <a
          key={`${link.platform}-${index}`}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-link ${activeIndex === index ? 'active' : ''}`}
          aria-label={link.ariaLabel}
          data-platform={link.platform}
          onMouseEnter={(e) => showTooltip(link.label, link.platform, e)}
          onMouseLeave={hideTooltip}
          onFocus={(e) => showTooltip(link.label, link.platform, e)}
          onBlur={hideTooltip}
          onKeyDown={(e) => handleKeyDown(e, index)}
          tabIndex={0}
          style={{ '--brand-color': link.color, '--delay': `${index * 0.1}s` }}
        >
          <span className="social-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-hidden="true" focusable="false">
              <path d={link.iconPath} />
            </svg>
          </span>
          <span className="sr-only">{link.label} social media link</span>
        </a>
      ))}
      {tooltip.visible && (
        <div
          className={`social-tooltip ${tooltip.platform ? `tooltip-${tooltip.platform}` : ''}`}
          style={{
            left: tooltip.position.x,
            top: tooltip.position.y,
            transform: 'translateX(-50%) translateY(-50%)'
          }}
          role="tooltip"
          aria-live="polite"
        >
          <div className="tooltip-header">
            <span className="tooltip-text">{tooltip.text}</span>
          </div>
          {tooltip.description && (
            <div className="tooltip-description">{tooltip.description}</div>
          )}
          {tooltip.followers && (
            <div className="tooltip-followers">{tooltip.followers}</div>
          )}
          <span className="tooltip-arrow" aria-hidden="true"></span>
        </div>
      )}
      <a href="#main-content" className="sr-only skip-link">
        Skip to main content
      </a>
    </aside>
  );
};

export default SocialSidebar;