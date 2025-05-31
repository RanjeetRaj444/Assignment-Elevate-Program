import React from "react";
import { useEventContext } from "../context/EventContext";

const CalendarView = () => {
  const { events } = useEventContext();
  return (
    <div className="calendar-view">
      <h2>🗓 Calendar</h2>
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            {e.date}: {e.title} at {e.venue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarView;
