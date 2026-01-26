import { useState } from 'react';
import './Navigation.css';
import { PiHeartFill, PiX } from 'react-icons/pi';

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

  const menuItems = [
    { id: 'main', label: 'Main' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'map', label: '오시는 길' },
    { id: 'message', label: '축하말' },
    { id: 'account', label: '마음 전하실 곳' },
  ];

  return (
    <>
      {/* Floating 버튼 - 우하단 */}
      <button 
        className={`floating-nav-button ${isMenuOpen ? 'menu-open' : ''}`}
        onClick={toggleMenu}
        aria-label="메뉴 열기"
      >
        {isMenuOpen ? (
          <PiX size={24} />
        ) : (
          <PiHeartFill size={24} />
        )}
      </button>

      {/* 네비게이션 메뉴 */}
      <nav className={`navigation-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="nav-menu-content">
          {menuItems.map((item, index) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)} 
              className="nav-menu-item"
              style={{ 
                animationDelay: `${index * 0.05}s` 
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
