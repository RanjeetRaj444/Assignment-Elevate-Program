import React from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import CalendarView from "../components/CalendarView";
import NotificationManager from "../components/NotificationManager";
import AttendeeForm from "../components/AttendeeForm";
import AttendeeList from "../components/AttendeeList";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <EventForm />
      <EventList />
      <CalendarView />
      <AttendeeForm />
      <AttendeeList />
      <NotificationManager />
    </div>
  );
};

export default Dashboard;
