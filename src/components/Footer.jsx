import { useEffect } from 'react';
import { initKakao, shareKakao } from '../utils/kakaoShare';
import './Footer.css';
import { PiDeviceMobileFill } from 'react-icons/pi';
import FlowerImage from '../assets/images/rose-flower.png';

const Footer = () => {
  useEffect(() => {
    // Kakao SDK 초기화
    initKakao();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        {/* 중간 사진 */}
        <div className="footer-image fade-in">
          <img 
            src={FlowerImage} 
            alt="웨딩 사진" 
            className="footer-middle-image"
          />
        </div>
        
        <div className="footer-content fade-in">
          {/* 좋은 문구 */}
          <div className="footer-message">
            <p className="footer-text text-body-gray">
              참석이 어려우신 분들도<br/>
              축하의 마음을 전해주시면<br/>
              큰 기쁨이 되겠습니다 
            </p>
          </div>
          
          {/* 카카오톡 공유하기 */}
          <button onClick={shareKakao} className="btn-kakao text-button-large">
            <PiDeviceMobileFill size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            카카오톡 공유하기
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

