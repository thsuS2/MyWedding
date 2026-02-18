import './Button.css';

/**
 * 통일된 그라데이션 버튼 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 버튼 내용
 * @param {Function} props.onClick - 클릭 핸들러
 * @param {boolean} props.disabled - 비활성화 여부
 * @param {'small' | 'medium' | 'large'} props.size - 버튼 크기 (기본값: 'medium')
 * @param {boolean} props.fullWidth - 전체 너비 여부
 * @param {React.ReactNode} props.icon - 아이콘 (선택)
 * @param {'button' | 'submit' | 'reset'} props.type - 버튼 타입 (기본값: 'button')
 * @param {string} props.className - 추가 클래스명
 * @param {Object} props.style - 인라인 스타일
 */
const Button = ({ 
  children, 
  onClick, 
  disabled = false,
  size = 'medium',
  fullWidth = false,
  icon = null,
  type = 'button',
  className = '',
  style = {},
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${size} ${fullWidth ? 'full-width' : ''} ${className}`.trim()}
      style={style}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;

