import './MessageCard.css';

/**
 * 메시지 카드 컴포넌트
 * @param {Object} props
 * @param {string} props.name - 작성자 이름
 * @param {string} props.relationship - 관계 (가족, 친구, 동료, 기타)
 * @param {string} props.message - 메시지 내용
 */
const MessageCard = ({ name, relationship, message }) => {
  return (
    <div className="message-card">
      <div className="message-header">
        <span className="message-name">{name}</span>
        <span className="message-relationship">{relationship}</span>
      </div>
      <div className="message-content">{message}</div>
    </div>
  );
};

export default MessageCard;

