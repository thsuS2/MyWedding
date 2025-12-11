import { useState, useEffect } from 'react';
import './IntroSection.css';
import { COUPLE } from '../../constants/wedding';
import flowerFrameImage from '../../assets/images/꽃 액자.png';

const IntroSection = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    // 2초 후 이미지 표시
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="intro" className="intro-section">
      <div className="intro-content">
        {/* 단색 배경 레이어 */}
        <div className={`intro-solid-background ${showImage ? 'fade-out' : ''}`}></div>
        
        {/* 배경 이미지 레이어 */}
        <div className={`intro-background ${showImage ? 'fade-in' : ''}`}></div>
        
        {/* 꽃 액자 - main 이미지 테두리 */}
        <img 
          src={flowerFrameImage} 
          alt="꽃 액자 장식" 
          className="flower-frame"
        />
        
        {/* 텍스트 - 처음부터 표시 */}
        <div className={`intro-text ${showImage ? 'fade-out' : ''}`}>
          <h1 className="intro-title">
            <span className="name">{COUPLE.groom.fullName}, {COUPLE.bride.fullName}</span>
          </h1>
          <p className="intro-subtitle">결혼 합니다</p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

