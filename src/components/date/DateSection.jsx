import './DateSection.css';
import Calendar from './components/Calendar';
import DDayCounter from './components/DDayCounter';

const DateSection = () => {
  return (
    <section id="date" className="date-section">
      <div className="container">
        <div className="date-calendar fade-in">
          <Calendar />
        </div>
        <div className="date-dday fade-in">
          <DDayCounter />
        </div>
      </div>
    </section>
  );
};

export default DateSection;

