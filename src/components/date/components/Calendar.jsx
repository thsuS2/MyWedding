import { WEDDING_DATE } from '../../../constants/wedding';
import './Calendar.css';

const Calendar = () => {
  const weddingDate = new Date(
    WEDDING_DATE.year,
    WEDDING_DATE.month - 1,
    WEDDING_DATE.day
  );

  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  const month = weddingDate.getMonth();
  const year = weddingDate.getFullYear();
  const day = weddingDate.getDate();
  const dayOfWeek = weddingDate.getDay();

  // 해당 월의 첫 번째 날과 마지막 날
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  // 달력 그리드 생성
  const days = [];
  
  // 빈 칸 추가 (첫 주 시작 전)
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  
  // 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="calendar-month-year text-heading-medium">
          {year}년 {monthNames[month]}
        </div>
      </div>
      <div className="calendar-weekdays">
        {dayNames.map((dayName) => (
          <div key={dayName} className="calendar-weekday text-caption">
            {dayName}
          </div>
        ))}
      </div>
      <div className="calendar-days">
        {days.map((date, index) => {
          const isWeddingDay = date === day;
          return (
            <div
              key={index}
              className={`calendar-day ${date === null ? 'empty' : ''} ${isWeddingDay ? 'wedding-day' : ''}`}
            >
              {date !== null && (
                <>
                  {isWeddingDay && (
                    <span className="wedding-marker">💍</span>
                  )}
                  <span className="calendar-date text-body-medium">{date}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
      <div className="calendar-footer">
        {/* <div className="wedding-date-highlight">
          <span className="wedding-icon">
            <PiHeartFill size={20} />
          </span>
          <span className="wedding-date-text">
            {year}년 {month + 1}월 {day}일 ({dayNames[dayOfWeek]})
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default Calendar;

