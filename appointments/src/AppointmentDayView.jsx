import React, { useState } from "react";

const appointmentTimeOfDay = (startsAt) => {
  const [h, m] = new Date(startsAt).toTimeString().split(":");
  return `${h}:${m}`;
};

export const Appointment = ({ customer }) => (
  <table>
    <thead id="table-appt-header">
      <tr>
        <th>{customer.startsAt}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Phone Number </td>
        <td>Stylist</td>
        <td>Service</td>
        <td>Salon</td>
        <td>Notes</td>
      </tr>
      <tr>
        <td id="first-name">{customer.firstName}</td>
        <td id="last-name">{customer.lastName}</td>
        <td id="phone">{customer.phone}</td>
        <td id="stylist">{customer.stylist}</td>
        <td id="service">{customer.service}</td>
        <td id="salon">{customer.salon}</td>
        <td id="notes">{customer.notes}</td>
      </tr>
    </tbody>
  </table>
);

export const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);
  return (
    <div id="appointmentsDayView">
      <ol>
        {appointments.map((el, i) => (
          <li key={el.startsAt}>
            <button type="button" onClick={() => setSelectedAppointment(i)}>
              {appointmentTimeOfDay(el.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>"There are no appointments scheduled for today."</p>
      ) : (
        <Appointment {...appointments[selectedAppointment]} />
      )}
    </div>
  );
};
