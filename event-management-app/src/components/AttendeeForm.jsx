import React, { useState } from "react";
import { useEventContext } from "../context/EventContext";

const AttendeeForm = () => {
  const { registerAttendee, events } = useEventContext();
  const [formData, setFormData] = useState({ name: "", eventId: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerAttendee({ ...formData, id: Date.now() });
    setFormData({ name: "", eventId: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="attendee-form">
      <h2>Register Attendee</h2>
      <input
        type="text"
        placeholder="Attendee Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <select
        value={formData.eventId}
        onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
        required
      >
        <option value="">Select Event</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default AttendeeForm;
