import { useState, useEffect } from 'react';
import './MainSection.css';
import * as WEDDING from '../../constants/wedding';
const { COUPLE, VENUE } = WEDDING;
import Calendar from './components/Calendar';
import DDayCounter from './components/DDayCounter';
import { PiPhoneFill, PiChatCircleFill , PiHeartFill} from 'react-icons/pi';
import leafImage from '../../assets/images/leaf.png';
import bouquetImage from '../../assets/images/flowers.png';

const MainSection = () => {
  const [isParentsModalOpen, setIsParentsModalOpen] = useState(false);

  // 전화번호를 tel: 및 sms: 링크 형식으로 변환하는 헬퍼 함수
  const formatPhoneForLink = (phone) => {
    return phone.replace(/-/g, '');
  };

  useEffect(() => {
    if (isParentsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isParentsModalOpen]);
  const weddingQuote = `사랑은 소유가 아니라
동행임을 아는 두 사람은

잡은 손을 놓지 않되
함부로 잡아끌지 않을 것이며

서로의 두 눈을 고요히 바라보아
말하지 않아도 같은 쪽으로 걸어가리라

- 박미라, '아름다운 날에 부치다' 중에서`;

  return (
    <section id="main" className="main-section">
      <div className="container">
        
        {/* 신랑이름 | 신부이름 */}
        <div className="main-couple-names fade-in">
          <span className="bride-name">{COUPLE.bride.fullName}</span>
            <PiHeartFill size={25} color={'pink'}/>
          <span className="groom-name">{COUPLE.groom.fullName}</span>
        </div>

        {/* 장소 */}
        <div className="main-venue fade-in">
          {VENUE.name} {VENUE.hall}
          <br/>
          {WEDDING.getFormattedDateWithWeekday()}
        </div>

        {/* 구분선 (잎사귀 이미지) */}
        <div className="main-divider fade-in">
          <img 
            src={leafImage} 
            alt="장식 잎사귀" 
            className="divider-leaf"
          />
        </div>

        {/* 결혼 관련 문구 인용 */}
        <div className="main-quote fade-in">
          <p className="quote-text">{weddingQuote}</p>
        </div>

        {/* 초대 글 */}
        <div className="main-invitation fade-in">
          <div className="invitation-content">
            <p className="invitation-text">
              저희 두 사람 이제 믿음과 사랑으로<br/>
              한 길을 가려 합니다.<br/>
              <br/>
              그 시작의 한 걸음,<br/>함께 축복해 주시면 감사하겠습니다.
            </p>
          </div>
        </div>

        <div className="main-parents">
          <div className="parent-name-wrapper">
            <div className="parent-name">
              {COUPLE.groom.parents.father} ・ {COUPLE.groom.parents.mother}
              <span className="parent-position">{COUPLE.groom.position}</span>
              {COUPLE.groom.name}
            </div>
            <div className="parent-contact-links">
              <a 
                href={`tel:${formatPhoneForLink(COUPLE.groom.phone)}`}
                className="contact-link"
                aria-label="전화"
              >
                <PiPhoneFill size={18} />
              </a>
              <a 
                href={`sms:${formatPhoneForLink(COUPLE.groom.phone)}`}
                className="contact-link"
                aria-label="문자"
              >
                <PiChatCircleFill size={18} />
              </a>
            </div>
          </div>

          <div className="parent-name-wrapper">
            <div className="parent-name">
              {COUPLE.bride.parents.father} ・ {COUPLE.bride.parents.mother}
              <span className="parent-position">{COUPLE.bride.position}</span>
              {COUPLE.bride.name}
            </div>
            <div className="parent-contact-links">
              <a 
                href={`tel:${formatPhoneForLink(COUPLE.bride.phone)}`}
                className="contact-link"
                aria-label="전화"
              >
                <PiPhoneFill size={18} />
              </a>
              <a 
                href={`sms:${formatPhoneForLink(COUPLE.bride.phone)}`}
                className="contact-link"
                aria-label="문자"
              >
                <PiChatCircleFill size={18} />
              </a>
            </div>
          </div>

          <button 
            className="contact-parents-btn"
            onClick={() => setIsParentsModalOpen(true)}
          >
            혼주에게 연락하기
          </button>
        </div>

        {/* 달력 */}
        <div className="main-calendar fade-in">
          <Calendar />
        </div>

        {/* D-Day */}
        <div className="main-dday fade-in">
          <DDayCounter />
        </div>
      </div>

      {/* 혼주에게 연락하기 모달 */}
      {isParentsModalOpen && (
        <div 
          className="parents-modal-overlay" 
          onClick={() => setIsParentsModalOpen(false)}
        >
          <div 
            className="parents-modal-content" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="parents-modal-close" 
              onClick={() => setIsParentsModalOpen(false)}
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
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={18} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={18} />
                  </a>
                </div>
              </div>

              <div className="parents-contact-item">
                <span className="parents-contact-name">
                  {COUPLE.groom.parents.father}
                </span>
                <div className="parents-contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={18} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={18} />
                  </a>
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
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={18} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={18} />
                  </a>
                </div>
              </div>

              <div className="parents-contact-item">
                <span className="parents-contact-name">
                  {COUPLE.bride.parents.father}
                </span>
                <div className="parents-contact-buttons">
                  <a 
                    href={`tel:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="전화"
                  >
                    <PiPhoneFill size={18} />
                  </a>
                  <a 
                    href={`sms:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                    className="parents-contact-btn"
                    aria-label="문자"
                  >
                    <PiChatCircleFill size={18} />
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

