import './MainSection.css';
import { COUPLE, VENUE, getFormattedDateWithWeekday } from '../constants/wedding';

const MainSection = () => {
  return (
    <section id="main" className="main-section">
      <div className="container">
        <div className="main-image-wrapper fade-in">
          <div className="placeholder-image">
            <span>커플 사진</span>
          </div>
        </div>
        
        <div className="main-content fade-in">
          <h2 className="main-title">우리 결혼합니다</h2>
          
          <p className="main-message">
            따스한 봄날, 저희 두 사람이<br/>
            사랑의 이름으로 하나가 되려 합니다.<br/>
            <br/>
            귀한 걸음 하시어<br/>
            저희의 첫 걸음을 축복해 주시면<br/>
            더없는 기쁨으로 간직하겠습니다.
          </p>
          
          <div className="parents-info">
            <div className="parent-group">
              <p>아버지 <strong>{COUPLE.bride.parents.father}</strong> · 어머니 <strong>{COUPLE.bride.parents.mother}</strong> 의 {COUPLE.bride.position}</p>
              <p className="couple-name">{COUPLE.bride.fullName}</p>
            </div>
            
            <div className="divider">💐</div>
            
            <div className="parent-group">
              <p>아버지 <strong>{COUPLE.groom.parents.father}</strong> · 어머니 <strong>{COUPLE.groom.parents.mother}</strong> 의 {COUPLE.groom.position}</p>
              <p className="couple-name">{COUPLE.groom.fullName}</p>
            </div>
          </div>
          
          <div className="wedding-info">
            <h3>🌸 예식 안내</h3>
            <p><strong>일시:</strong> {getFormattedDateWithWeekday()}</p>
            <p><strong>장소:</strong> {VENUE.name} {VENUE.floor} {VENUE.hall}</p>
            <p><strong>주소:</strong> {VENUE.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;

