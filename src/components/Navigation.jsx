import { useState, useEffect } from 'react';
import './Navigation.css';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <button onClick={() => scrollToSection('main')} className="nav-item">
          Main
        </button>
        <button onClick={() => scrollToSection('gallery')} className="nav-item">
          Gallery
        </button>
        <button onClick={() => scrollToSection('map')} className="nav-item">
          오시는 길
        </button>
        <button onClick={() => scrollToSection('message')} className="nav-item">
          축하말
        </button>
      </div>
    </nav>
  );
};

export default Navigation;

