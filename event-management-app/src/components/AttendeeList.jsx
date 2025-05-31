import React from "react";
import { useEventContext } from "../context/EventContext";

const AttendeeList = () => {
  const { attendees, events } = useEventContext();

  const getEventTitle = (id) => {
    const event = events.find((e) => e.id.toString() === id.toString());
    return event ? event.title : "Unknown Event";
  };

  return (
    <div className="attendee-list">
      <h2>🙋 Attendees</h2>
      <ul>
        {attendees.map((a) => (
          <li key={a.id}>
            {a.name} - {getEventTitle(a.eventId)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendeeList;
