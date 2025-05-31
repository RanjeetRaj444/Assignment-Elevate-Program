import React from "react";
import { useEventContext } from "../context/EventContext";

const EventList = () => {
  const { events, deleteEvent } = useEventContext();
  return (
    <div className="event-list">
      <h2>📋 Events</h2>
      <ul>
        {events.map((e) => (
          <li key={e.id}>
            {e.title} - {e.date} @ {e.venue}
            <button onClick={() => deleteEvent(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
