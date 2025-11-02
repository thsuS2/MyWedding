import { useEffect } from 'react';
import { initKakao, shareKakao } from '../utils/kakaoShare';
import './Footer.css';

const Footer = () => {
  useEffect(() => {
    // Kakao SDK 초기화
    initKakao();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content fade-in">
          <button onClick={shareKakao} className="btn-kakao">
            📱 카카오톡 공유하기
          </button>
          
          <div className="footer-message">
            <p className="footer-text">
              참석이 어려우신 분들도<br/>
              축하의 마음을 전해주시면<br/>
              큰 기쁨이 되겠습니다 💐
            </p>
          </div>
          
          <div className="footer-signature">
            <p>지수 🫶 유신</p>
          </div>
          
          <div className="footer-copyright">
            <p>© 2025 Botanical Flow Minimal</p>
            <p>Made with 💕 by 지수</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

