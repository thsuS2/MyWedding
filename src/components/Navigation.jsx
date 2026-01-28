import './Navigation.css';
import { PiChatCircleFill } from 'react-icons/pi';

const Navigation = () => {
  const scrollToMessage = () => {
    const element = document.getElementById('message');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating 버튼 - 우하단 (메시지 바로가기) */}
      <button 
        className="floating-nav-button"
        onClick={scrollToMessage}
        aria-label="축하 메시지로 이동"
      >
        <PiChatCircleFill size={24} />
      </button>
    </>
  );
};

export default Navigation;
