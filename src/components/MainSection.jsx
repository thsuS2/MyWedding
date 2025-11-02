import './MainSection.css';

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
              <p>아버지 <strong>김○○</strong> · 어머니 <strong>이○○</strong> 의 장녀</p>
              <p className="couple-name">김지수</p>
            </div>
            
            <div className="divider">💐</div>
            
            <div className="parent-group">
              <p>아버지 <strong>박○○</strong> · 어머니 <strong>최○○</strong> 의 장남</p>
              <p className="couple-name">박유신</p>
            </div>
          </div>
          
          <div className="wedding-info">
            <h3>🌸 예식 안내</h3>
            <p><strong>일시:</strong> 2025년 00월 00일 (요일) 오후 0시</p>
            <p><strong>장소:</strong> ○○웨딩홀 ○층 ○○홀</p>
            <p><strong>주소:</strong> 서울시 ○○구 ○○동 123-45</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;

