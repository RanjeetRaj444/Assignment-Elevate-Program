import React, { createContext, useContext, useState } from "react";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [venues, setVenues] = useState([
    { name: "Main Hall" },
    { name: "Conference Room" },
    { name: "Outdoor Lawn" },
  ]);

  const addEvent = (event) => setEvents((prev) => [...prev, event]);
  const updateEvent = (id, updated) =>
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    );
  const deleteEvent = (id) =>
    setEvents((prev) => prev.filter((e) => e.id !== id));

  const registerAttendee = (attendee) =>
    setAttendees((prev) => [...prev, attendee]);

  return (
    <EventContext.Provider
      value={{
        events,
        attendees,
        venues,
        addEvent,
        updateEvent,
        deleteEvent,
        setAttendees,
        setVenues,
        registerAttendee,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => useContext(EventContext);
