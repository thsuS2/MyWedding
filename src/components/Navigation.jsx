import { useState } from 'react';
import './Navigation.css';
import { PiList, PiX } from 'react-icons/pi';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Floating 버튼 - 우하단 */}
      <button 
        className={`floating-nav-button ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="메뉴 열기"
      >
        {isMenuOpen ? (
          <PiX size={24} />
        ) : (
          <PiList size={24} />
        )}
      </button>

      {/* 메뉴 오버레이 */}
      {isMenuOpen && (
        <div 
          className="nav-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* 네비게이션 메뉴 */}
      <nav className={`navigation-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-menu-content">
          <button 
            onClick={() => scrollToSection('main')} 
            className="nav-menu-item"
          >
            Main
          </button>
          <button 
            onClick={() => scrollToSection('gallery')} 
            className="nav-menu-item"
          >
            Gallery
          </button>
          <button 
            onClick={() => scrollToSection('map')} 
            className="nav-menu-item"
          >
            오시는 길
          </button>
          <button 
            onClick={() => scrollToSection('message')} 
            className="nav-menu-item"
          >
            축하말
          </button>
          <button 
            onClick={() => scrollToSection('account')} 
            className="nav-menu-item"
          >
            마음 전하실 곳
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
