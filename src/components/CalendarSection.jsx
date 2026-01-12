import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarCustom.css"; // 👈 custom styles

const CalendarSection = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="bg-white p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">Select Date</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="custom-calendar rounded-lg"
      />
    </div>
  );
};

export default CalendarSection;
