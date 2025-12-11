import './MainSection.css';
import { COUPLE, VENUE } from '../constants/wedding';
import Calendar from './Calendar';
import DDayCounter from './DDayCounter';

const MainSection = () => {
  const weddingQuote = "사랑은 두 사람이 하나가 되는 것,\n그리고 그 하나가 영원히 함께하는 것";

  return (
    <section id="main" className="main-section">
      <div className="container">
        {/* Main 사진 */}
        <div className="main-image-wrapper fade-in">
          <img 
            src="/images/main.png" 
            alt="김유신 & 박지수"
            className="main-image"
          />
        </div>
        
        {/* 신랑이름 | 신부이름 */}
        <div className="main-couple-names fade-in">
          <span className="groom-name">{COUPLE.groom.fullName}</span>
          <span className="name-separator">|</span>
          <span className="bride-name">{COUPLE.bride.fullName}</span>
        </div>

        {/* 장소 */}
        <div className="main-venue fade-in">
          {VENUE.name} {VENUE.hall}
        </div>

        {/* 구분선 (꽃 아이콘) */}
        <div className="main-divider fade-in">
          <span className="divider-icon">🌸</span>
        </div>

        {/* 결혼 관련 문구 인용 */}
        <div className="main-quote fade-in">
          <p className="quote-text">{weddingQuote}</p>
        </div>

        {/* 초대 글 */}
        <div className="main-invitation fade-in">
          <p className="invitation-text">
            따스한 봄날, 저희 두 사람이<br/>
            사랑의 이름으로 하나가 되려 합니다.<br/>
            <br/>
            귀한 걸음 하시어<br/>
            저희의 첫 걸음을 축복해 주시면<br/>
            더없는 기쁨으로 간직하겠습니다.
          </p>
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
    </section>
  );
};

export default MainSection;

