import React from "react";
import ReactDOM from "react-dom";
import {
  AppointmentsDayView
} from "./AppointmentDayView";
import {
  sampleAppointments
} from "./SampleData";

ReactDOM.render( <
  AppointmentsDayView appointments = {
    sampleAppointments
  }
  />,
  document.getElementById("root")
);