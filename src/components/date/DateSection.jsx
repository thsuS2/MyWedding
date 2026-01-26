import './DateSection.css';
import Calendar from '../main/components/Calendar';
import DDayCounter from '../main/components/DDayCounter';

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

