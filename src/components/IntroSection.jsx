import './IntroSection.css';
import { COUPLE, getFormattedDateTime } from '../constants/wedding';

const IntroSection = () => {
  return (
    <section id="intro" className="intro-section">
      <div className="intro-content fade-in">
        <p className="intro-subtitle">봄날의 정원 속, 우리의 약속</p>
        <h1 className="intro-title">
          <span className="name">{COUPLE.bride.name}</span>
          <span className="heart">🫶</span>
          <span className="name">{COUPLE.groom.name}</span>
        </h1>
        <p className="intro-date">{getFormattedDateTime()}</p>
        <div className="intro-divider">🌸</div>
      </div>
    </section>
  );
};

export default IntroSection;

