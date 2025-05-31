import React, { useState, useEffect } from "react";
import { useEventContext } from "../context/EventContext";

const EventForm = () => {
  const { addEvent, events, venues } = useEventContext();
  const [formData, setFormData] = useState({ title: "", date: "", venue: "" });

  // Ensure venue is set when venues are loaded or changed
  useEffect(() => {
    if (venues.length > 0 && !formData.venue) {
      setFormData((prev) => ({ ...prev, venue: venues[0].name }));
    }
  }, [venues, formData.venue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDoubleBooked = events.some(
      (e) => e.venue === formData.venue && e.date === formData.date
    );
    if (isDoubleBooked) return alert("Venue is already booked for this date.");
    addEvent({ ...formData, id: Date.now() });
    setFormData({ title: "", date: "", venue: venues[0]?.name || "" });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />
      <select
        value={formData.venue}
        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
      >
        {venues.map((v) => (
          <option key={v.name} value={v.name}>
            {v.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
