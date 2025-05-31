import { useEffect } from "react";
import { useEventContext } from "../context/EventContext";

const NotificationManager = () => {
  const { events } = useEventContext();

  useEffect(() => {
    const now = new Date();
    events.forEach((e) => {
      const time = new Date(e.date) - now;
      if (time > 0 && time < 10000) {
        setTimeout(() => {
          alert(`Reminder: ${e.title} at ${e.venue} is starting soon!`);
        }, time);
      }
    });
  }, [events]);

  return null;
};

export default NotificationManager;