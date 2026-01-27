import { useState, useEffect } from 'react';
import './IntroSection.css';
import { COUPLE } from '../../constants/wedding';
import PetalAnimation from '../PetalAnimation';

const IntroSection = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // 1.5초 후 이미지와 함께 표시
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="intro" className="intro-section">
      {/* 꽃잎 휘날리는 효과 - intro 섹션 내에서만 */}
      <PetalAnimation />
      
      <div className="intro-content">
        {/* 단색 배경 레이어 */}
        <div className={`intro-solid-background ${showImage ? 'fade-out' : ''}`}></div>
        
        {/* 배경 이미지 레이어 */}
        <div className={`intro-background ${showImage ? 'fade-in' : ''}`}></div>
        
        {/* 텍스트 - 이미지와 함께 나타남 */}
        <div className={`intro-text ${showImage ? 'fade-in-with-image' : 'fade-in-text'}`}>
          <h1 className="intro-title text-display">
            <span className="name">{COUPLE.groom.fullName}, {COUPLE.bride.fullName}</span>
          </h1>
          <p className="intro-subtitle text-heading-medium">결혼 합니다</p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

