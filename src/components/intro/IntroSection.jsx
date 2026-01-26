import { useState, useEffect } from 'react';
import './IntroSection.css';
import { COUPLE } from '../../constants/wedding';
import flowerFrameImage from '../../assets/images/flower-frame.png';

const IntroSection = () => {
  const [animationPhase, setAnimationPhase] = useState(0); // 0: 텍스트, 1: 이미지, 2: 텍스트+이미지

  useEffect(() => {
    // 1단계: 텍스트 표시 (1초)
    const timer1 = setTimeout(() => {
      setAnimationPhase(1);
    }, 1000);

    // 2단계: 이미지 표시 (2초 후)
    const timer2 = setTimeout(() => {
      setAnimationPhase(2);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section id="intro" className="intro-section">
      <div className="intro-content">
        {/* 단색 배경 레이어 */}
        <div className={`intro-solid-background ${animationPhase >= 1 ? 'fade-out' : ''}`}></div>
        
        {/* 배경 이미지 레이어 */}
        <div className={`intro-background ${animationPhase >= 1 ? 'fade-in' : ''}`}></div>
        
        {/* 꽃 액자 - main 이미지 테두리 */}
        <img 
          src={flowerFrameImage} 
          alt="꽃 액자 장식" 
          className={`flower-frame ${animationPhase >= 1 ? 'fade-in' : 'hidden'}`}
        />
        
        {/* 텍스트 - 교차 애니메이션 */}
        <div className={`intro-text ${animationPhase === 0 ? 'show' : animationPhase === 1 ? 'fade-out' : 'fade-in-final'}`}>
          <h1 className="intro-title text-display">
            <span className="name">{COUPLE.groom.fullName}, {COUPLE.bride.fullName}</span>
          </h1>
          <p className="intro-subtitle text-heading-large">결혼 합니다</p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;

