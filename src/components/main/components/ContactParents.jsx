import { useState, useEffect } from 'react';
import { Button } from '../../buttons';
import { ContactButton } from '../../buttons';
import { COUPLE } from '../../../constants/wedding';
import './ContactParents.css';

const ContactParents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 전화번호를 tel: 및 sms: 링크 형식으로 변환하는 헬퍼 함수
  const formatPhoneForLink = (phone) => {
    return phone.replace(/-/g, '');
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);
// yusin zzang musle man
  return (
    <>
      <div className="main-parents">
        <div className="parent-name-wrapper">
          <div className="parent-name">
            {COUPLE.groom.parents.father} ・ {COUPLE.groom.parents.mother}
            <span className="parent-position">{COUPLE.groom.position}</span>
            {COUPLE.groom.name}
          </div>
          <div className="parent-contact-links">
            <ContactButton
              type="phone"
              href={`tel:${formatPhoneForLink(COUPLE.groom.phone)}`}
              ariaLabel="전화"
            />
            <ContactButton
              type="sms"
              href={`sms:${formatPhoneForLink(COUPLE.groom.phone)}`}
              ariaLabel="문자"
            />
          </div>
        </div>

        <div className="parent-name-wrapper">
          <div className="parent-name">
            {COUPLE.bride.parents.father} ・ {COUPLE.bride.parents.mother}
            <span className="parent-position">{COUPLE.bride.position}</span>
            {COUPLE.bride.name}
          </div>
          <div className="parent-contact-links">
            <ContactButton
              type="phone"
              href={`tel:${formatPhoneForLink(COUPLE.bride.phone)}`}
              ariaLabel="전화"
            />
            <ContactButton
              type="sms"
              href={`sms:${formatPhoneForLink(COUPLE.bride.phone)}`}
              ariaLabel="문자"
            />
          </div>
        </div>

        <Button 
          onClick={() => setIsModalOpen(true)}
          size="medium"
          className="contact-parents-btn"
        >
          혼주에게 연락하기
        </Button>
      </div>

      {/* 혼주에게 연락하기 모달 */}
      {isModalOpen && (
        <div 
          className="parents-modal-overlay" 
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="parents-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="parents-modal-close" 
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            <h2 className="parents-modal-title">혼주에게 연락하기</h2>

            {/* 신랑측 혼주 */}
            <div className="parents-side-section">
              <h3 className="parents-side-title">신랑측 혼주</h3>
              
              <div className="parents-contact-item">
                <span className="parents-contact-name">
                  {COUPLE.groom.parents.mother}
                </span>
                <div className="parents-contact-buttons">
                  <ContactButton
                    type="phone"
                    href={`tel:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                    ariaLabel="전화"
                  />
                  <ContactButton
                    type="sms"
                    href={`sms:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                    ariaLabel="문자"
                  />
                </div>
              </div>

              <div className="parents-contact-item">
                <span className="parents-contact-name">
                  {COUPLE.groom.parents.father}
                </span>
                <div className="parents-contact-buttons">
                  <ContactButton
                    type="phone"
                    href={`tel:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                    ariaLabel="전화"
                  />
                  <ContactButton
                    type="sms"
                    href={`sms:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                    ariaLabel="문자"
                  />
                </div>
              </div>
            </div>

            {/* 신부측 혼주 */}
            <div className="parents-side-section">
              <h3 className="parents-side-title">신부측 혼주</h3>
              
              <div className="parents-contact-item">
                <span className="parents-contact-name">
                  {COUPLE.bride.parents.mother}
                </span>
                <div className="parents-contact-buttons">
                  <ContactButton
                    type="phone"
                    href={`tel:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                    ariaLabel="전화"
                  />
                  <ContactButton
                    type="sms"
                    href={`sms:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                    ariaLabel="문자"
                  />
                </div>
              </div>

              <div className="parents-contact-item">
                <span className="parents-contact-name">
                  {COUPLE.bride.parents.father}
                </span>
                <div className="parents-contact-buttons">
                  <ContactButton
                    type="phone"
                    href={`tel:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                    ariaLabel="전화"
                  />
                  <ContactButton
                    type="sms"
                    href={`sms:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                    ariaLabel="문자"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactParents;

