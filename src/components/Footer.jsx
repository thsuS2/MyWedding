import { useEffect } from 'react';
import { initKakao, shareKakao } from '../utils/kakaoShare';
import './Footer.css';
import { PiDeviceMobileFill, PiFlower, PiHeartFill } from 'react-icons/pi';
import FlowerImage from '../assets/images/rose-flower.png';

const Footer = () => {
  useEffect(() => {
    // Kakao SDK 초기화
    initKakao();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bouquet-decoration">
          <img 
            src={FlowerImage} 
            alt="부케 장식" 
            className="footer-bouquet"
          />
        </div>
        <div className="footer-content fade-in">
          <button onClick={shareKakao} className="btn-kakao">
            <PiDeviceMobileFill size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            카카오톡 공유하기
          </button>
          
          <div className="footer-message">
            <p className="footer-text">
              참석이 어려우신 분들도<br/>
              축하의 마음을 전해주시면<br/>
              큰 기쁨이 되겠습니다 
            </p>
          </div>
          
          <div className="footer-signature">
            <p>
              지수 <PiHeartFill size={18} style={{ verticalAlign: 'middle', margin: '0 4px' }} /> 유신
            </p>
          </div>
          
          <div className="footer-copyright">
            <p>© 2025 Jisoo Wedding Project</p>
            <p>
              개발 by <PiHeartFill size={16} style={{ verticalAlign: 'middle', margin: '0 4px' }} /> 지수
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

