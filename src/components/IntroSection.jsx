import './IntroSection.css';

const IntroSection = () => {
  return (
    <section id="intro" className="intro-section">
      <div className="intro-content fade-in">
        <p className="intro-subtitle">봄날의 정원 속, 우리의 약속</p>
        <h1 className="intro-title">
          <span className="name">지수</span>
          <span className="heart">🫶</span>
          <span className="name">유신</span>
        </h1>
        <p className="intro-date">2025년 00월 00일 오후 0시</p>
        <div className="intro-divider">🌸</div>
      </div>
    </section>
  );
};

export default IntroSection;

