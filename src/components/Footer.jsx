import { useEffect } from 'react';
import { initKakao, shareKakao } from '../utils/kakaoShare';
import './Footer.css';
import { SiKakao } from 'react-icons/si';
import FlowerImage from '../assets/images/rose-flower.png';
import Button from './common/Button';

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
            <div className="footer-text text-body-gray">
              참석이 어려우신 분들도<br/>
              축하의 마음을 전해주시면<br/>
              큰 기쁨이 되겠습니다 
            </div>
          </div>
          
          {/* 카카오톡 공유하기 */}
          <Button
            variant="primary"
            size="large"
            onClick={shareKakao}
            icon={<SiKakao size={20} />}
          >
            카카오톡 공유하기
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

