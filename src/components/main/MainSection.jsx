import { useState, useEffect } from 'react';
import './MainSection.css';
import * as WEDDING from '../../constants/wedding';
const { COUPLE, VENUE } = WEDDING;
import { PiPhoneFill, PiChatCircleFill } from 'react-icons/pi';

const MainSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // 전화번호를 tel: 및 sms: 링크 형식으로 변환하는 헬퍼 함수
  const formatPhoneForLink = (phone) => {
    return phone.replace(/-/g, '');
  };

  useEffect(() => {
    if (isContactModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isContactModalOpen]);

  return (
    <section id="main" className="main-section">
      <div className="container">
        
        {/* 날짜/시간 */}
        <div className="main-date-time text-heading-medium fade-in">
          {WEDDING.getFormattedDate()} {WEDDING.WEDDING_DATE.weekday}<br/>
          {WEDDING.WEDDING_DATE.time}
        </div>

        {/* 초대 글 */}
        <div className="main-invitation fade-in">
          <p className="invitation-text text-body-gray">
            저희 두 사람 이제 믿음과 사랑으로<br/>
            한 길을 가려 합니다.<br/>
            <br/>
            그 시작의 한 걸음,<br/>함께 축복해 주시면 감사하겠습니다.
          </p>
        </div>

        {/* 커플 이름 (부모님 포함) */}
        <div className="main-couple-names fade-in">
          <div className="couple-name-item">
            <p className="couple-parents text-body-gray">
              {COUPLE.groom.parents.father} · {COUPLE.groom.parents.mother}의 {COUPLE.groom.position}
            </p>
            <p className="couple-name text-heading-large">{COUPLE.groom.name}</p>
          </div>
          <div className="couple-separator">·</div>
          <div className="couple-name-item">
            <p className="couple-parents text-body-gray">
              {COUPLE.bride.parents.father} · {COUPLE.bride.parents.mother}의 {COUPLE.bride.position}
            </p>
            <p className="couple-name text-heading-large">{COUPLE.bride.name}</p>
          </div>
        </div>

        {/* 연락하기 버튼 */}
        <div className="main-contact-button fade-in">
          <button 
            className="btn-contact text-button-large"
            onClick={() => setIsContactModalOpen(true)}
          >
            연락하기
          </button>
        </div>
      </div>

      {/* 연락하기 모달 */}
      {isContactModalOpen && (
        <div 
          className="contact-modal-overlay" 
          onClick={() => setIsContactModalOpen(false)}
        >
          <div 
            className="contact-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="contact-modal-close" 
              onClick={() => setIsContactModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="contact-modal-title text-heading-large">연락하기</h2>

            {/* 신랑/신부 */}
            <div className="contact-couple-section">
              <div className="contact-item">
                <div className="contact-info">
                  <p className="contact-name text-heading-small">신랑 {COUPLE.groom.fullName}</p>
                </div>
                <div className="contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.groom.phone)}`}
                    className="contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={20} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.groom.phone)}`}
                    className="contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={20} />
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-info">
                  <p className="contact-name text-heading-small">신부 {COUPLE.bride.fullName}</p>
                </div>
                <div className="contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.bride.phone)}`}
                    className="contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={20} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.bride.phone)}`}
                    className="contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* 신랑측 혼주 */}
            <div className="contact-parents-section">
              <h3 className="contact-section-title text-heading-small">신랑측 혼주</h3>
              
              <div className="contact-item">
                <div className="contact-info">
                  <p className="contact-name text-body-medium">{COUPLE.groom.parents.mother}</p>
                </div>
                <div className="contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                    className="contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={20} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                    className="contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={20} />
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-info">
                  <p className="contact-name text-body-medium">{COUPLE.groom.parents.father}</p>
                </div>
                <div className="contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                    className="contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={20} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                    className="contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* 신부측 혼주 */}
            <div className="contact-parents-section">
              <h3 className="contact-section-title text-heading-small">신부측 혼주</h3>
              
              <div className="contact-item">
                <div className="contact-info">
                  <p className="contact-name text-body-medium">{COUPLE.bride.parents.mother}</p>
                </div>
                <div className="contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                    className="contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={20} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                    className="contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={20} />
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-info">
                  <p className="contact-name text-body-medium">{COUPLE.bride.parents.father}</p>
                </div>
                <div className="contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                    className="contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={20} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                    className="contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MainSection;

