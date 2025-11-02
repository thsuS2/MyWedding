import { useState } from 'react';
import { useMessages } from '../hooks/useSupabase';
import './MessageBoard.css';

const MessageBoard = () => {
  const { messages, loading, error, addMessage } = useMessages();
  const [formData, setFormData] = useState({
    name: '',
    relationship: '친구',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('전체');
  
  const relationships = ['전체', '가족', '친구', '동료', '기타'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      alert('이름과 메시지를 모두 입력해주세요.');
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
      alert('축하 메시지가 등록되었습니다! 💐');
    } catch (err) {
      console.error('메시지 등록 실패:', err);
      alert('메시지 등록에 실패했습니다. 다시 시도해주세요.');
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
        <h2 className="message-title fade-in">💌 축하 메시지</h2>
        
        {/* 에러 메시지 */}
        {error && (
          <div className="error-message fade-in">
            ⚠️ 메시지를 불러오는 중 오류가 발생했습니다.
          </div>
        )}
        
        {/* 메시지 작성 폼 */}
        <form onSubmit={handleSubmit} className="message-form fade-in">
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
              <p>메시지를 불러오는 중...</p>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="no-messages">
              <p>
                {activeFilter === '전체' 
                  ? '아직 작성된 메시지가 없습니다.\n첫 번째 축하 메시지를 남겨주세요! 💐' 
                  : `${activeFilter} 관계로 작성된 메시지가 없습니다.`
                }
              </p>
            </div>
          ) : (
            filteredMessages.map(msg => (
              <div key={msg.id} className="message-card">
                <div className="message-header">
                  <span className="message-name">{msg.name}</span>
                  <span className="message-relationship">{msg.relationship}</span>
                </div>
                <p className="message-content">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageBoard;

