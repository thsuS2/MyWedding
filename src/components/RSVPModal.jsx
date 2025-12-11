import { useState, useEffect } from 'react';
import { COUPLE, VENUE, getFormattedDateWithWeekday } from '../constants/wedding';
import { supabase, isSupabaseAvailable } from '../lib/supabase';
import './RSVPModal.css';

const RSVPModal = ({ isOpen, onClose, onShowToday }) => {
  const [formData, setFormData] = useState({
    side: '신랑측',
    name: '',
    companion: '',
    meal: '미정',
  });
  const [submitting, setSubmitting] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('성함을 입력해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      // Supabase에 저장
      if (isSupabaseAvailable()) {
        const { error } = await supabase
          .from('rsvp')
          .insert([{
            side: formData.side,
            name: formData.name.trim(),
            companion: formData.companion.trim() || null,
            meal: formData.meal,
          }]);

        if (error) throw error;
      }

      // 오늘 하루 보지 않기 처리
      if (dontShowToday) {
        const today = new Date().toDateString();
        localStorage.setItem('rsvp_dont_show', today);
        onShowToday();
      }

      alert('참석의사가 전달되었습니다! 💐');
      setFormData({ side: '신랑측', name: '', companion: '', meal: '미정' });
      onClose();
    } catch (err) {
      console.error('RSVP 저장 실패:', err);
      alert('참석의사 전달에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rsvp-modal-overlay" onClick={onClose}>
      <div className="rsvp-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="rsvp-modal-close" onClick={onClose}>✕</button>
        
        <div className="rsvp-modal-header">
          <h2>💐 참석의사 전달하기</h2>
          <p className="rsvp-modal-intro">
            귀한 시간 내어 참석해 주시는 분들께<br/>
            정성스럽게 준비하겠습니다.
          </p>
        </div>

        <div className="rsvp-modal-info">
          <div className="rsvp-couple-info">
            <p className="rsvp-couple-names">
              {COUPLE.groom.fullName} · {COUPLE.bride.fullName}
            </p>
          </div>
          <div className="rsvp-date-info">
            <p><strong>일정:</strong> {getFormattedDateWithWeekday()}</p>
            <p><strong>위치:</strong> {VENUE.name} {VENUE.hall}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="rsvp-form-group">
            <label>구분 *</label>
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  value="신랑측"
                  checked={formData.side === '신랑측'}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                />
                <span>신랑측</span>
              </label>
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  value="신부측"
                  checked={formData.side === '신부측'}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                />
                <span>신부측</span>
              </label>
            </div>
          </div>

          <div className="rsvp-form-group">
            <label htmlFor="name">성함 *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="성함을 입력해주세요"
              required
            />
          </div>

          <div className="rsvp-form-group">
            <label htmlFor="companion">동행인</label>
            <input
              id="companion"
              type="text"
              value={formData.companion}
              onChange={(e) => setFormData({ ...formData, companion: e.target.value })}
              placeholder="동행인 수 또는 이름 (선택사항)"
            />
          </div>

          <div className="rsvp-form-group">
            <label htmlFor="meal">식사 여부 *</label>
            <select
              id="meal"
              value={formData.meal}
              onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
              required
            >
              <option value="예정">예정</option>
              <option value="안함">안함</option>
              <option value="미정">미정</option>
            </select>
          </div>

          <div className="rsvp-form-group">
            <label className="rsvp-checkbox-label">
              <input
                type="checkbox"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
              />
              <span>오늘 하루 보지 않기</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="rsvp-submit-btn"
            disabled={submitting}
          >
            {submitting ? '전달 중...' : '참석의사 전달하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RSVPModal;

