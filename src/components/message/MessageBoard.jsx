import { useState, useEffect } from 'react';
import { useMessages } from '../../hooks/useSupabase';
import { useToastContext } from '../../contexts/ToastContext';
import './MessageBoard.css';
import { PiWarningFill } from 'react-icons/pi';

const MessageBoard = () => {
  const { messages, loading, error, addMessage } = useMessages();
  const { showError, showSuccess } = useToastContext();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    relationship: '친구',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('전체');
  
  const relationships = ['전체', '가족', '친구', '동료', '기타'];

  useEffect(() => {
    if (isFormModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFormModalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      showError('이름과 메시지를 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      await addMessage({
        name: formData.name.trim(),
        relationship: formData.relationship,
        message: formData.message.trim()
      });
      
      setFormData({ name: '', relationship: '친구', message: '' });
      setIsFormModalOpen(false);
      showSuccess('축하 메시지가 등록되었습니다!');
    } catch (err) {
      console.error('메시지 등록 실패:', err);
      showError('메시지 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredMessages = activeFilter === '전체' 
    ? messages 
    : messages.filter(msg => msg.relationship === activeFilter);

  return (
    <section id="message" className="message-section">
      <div className="container">
        <h2 className="message-title text-heading-large fade-in">
          축하 메시지
        </h2>
        
        {/* 에러 메시지 */}
        {error && (
          <div className="error-message text-error fade-in">
            <PiWarningFill size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            메시지를 불러오는 중 오류가 발생했습니다.
          </div>
        )}
        
        {/* 필터 탭 */}
        <div className="message-filters fade-in">
          {relationships.map(rel => (
            <button
              key={rel}
              onClick={() => setActiveFilter(rel)}
              className={`filter-btn ${activeFilter === rel ? 'active' : ''}`}
            >
              {rel}
            </button>
          ))}
        </div>
        
        {/* 메시지 리스트 */}
        <div className="message-list fade-in">
          {loading ? (
            <div className="loading-messages">
              <p className="text-body-gray">메시지를 불러오는 중...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="no-messages">
              <p className="text-caption">
                {activeFilter === '전체' 
                  ? (
                    <>
                      아직 작성된 메시지가 없습니다.<br/>
                      첫 번째 축하 메시지를 남겨주세요!
                    </>
                  )
                  : `${activeFilter} 관계로 작성된 메시지가 없습니다.`
                }
              </p>
            </div>
          ) : (
            filteredMessages.map(msg => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <span className="message-name text-heading-small">{msg.name}</span>
                  <span className="message-relationship text-caption">{msg.relationship}</span>
                </div>
                <p className="message-content text-body-gray">{msg.message}</p>
              </div>
            ))
          )}
        </div>

        {/* 작성하기 버튼 */}
        <div className="message-write-button fade-in">
          <button 
            className="btn-write-message text-button-large"
            onClick={() => setIsFormModalOpen(true)}
          >
            메시지 작성하기
          </button>
        </div>
      </div>

      {/* 메시지 작성 모달 */}
      {isFormModalOpen && (
        <div 
          className="message-modal-overlay" 
          onClick={() => setIsFormModalOpen(false)}
        >
          <div 
            className="message-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="message-modal-close" 
              onClick={() => setIsFormModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="message-modal-title text-heading-large">축하 메시지 작성</h2>
            
            <form onSubmit={handleSubmit} className="message-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="이름"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <select
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  className="form-select"
                >
                  {relationships.filter(r => r !== '전체').map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <textarea
                  placeholder="축하 메시지를 남겨주세요"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-textarea"
                  rows="4"
                />
              </div>
              
              <button 
                type="submit" 
                className="btn-primary form-submit"
                disabled={submitting}
              >
                {submitting ? '등록 중...' : '메시지 남기기'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default MessageBoard;

