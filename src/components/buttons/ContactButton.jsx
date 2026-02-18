import { PiPhoneFill, PiChatCircleFill } from 'react-icons/pi';
import './ContactButton.css';

/**
 * 전화/메시지 연락 버튼 컴포넌트
 * @param {Object} props
 * @param {'phone' | 'sms'} props.type - 버튼 타입 (전화 또는 문자)
 * @param {string} props.href - tel: 또는 sms: 링크
 * @param {string} props.ariaLabel - 접근성 라벨
 * @param {string} props.className - 추가 클래스명
 */
const ContactButton = ({ 
  type, 
  href, 
  ariaLabel,
  className = '',
  ...props 
}) => {
  const Icon = type === 'phone' ? PiPhoneFill : PiChatCircleFill;
  const defaultAriaLabel = type === 'phone' ? '전화' : '문자';

  return (
    <a
      href={href}
      className={`contact-btn ${className}`.trim()}
      aria-label={ariaLabel || defaultAriaLabel}
      {...props}
    >
      <Icon size={18} />
    </a>
  );
};

export default ContactButton;

