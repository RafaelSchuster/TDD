import React from "react";
import ReactDOM from "react-dom";
import { Appointment, AppointmentsDayView } from "../src/AppointmentDayView";
import ReactTestUtils from "react-dom/test-utils";

describe("Appointment", () => {
  let customer;
  let container;
  beforeEach(() => {
    container = document.createElement("div");
  });
  const render = (component) => ReactDOM.render(component, container);
  it("renders the customer first name", () => {
    customer = { firstName: "Ashley" };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch("Ashley");
  });
  it("renders the customer another name", () => {
    customer = { firstName: "Jordan" };
    render(<Appointment customer={customer} />);
    expect(container.textContent).toMatch("Jordan");
  });
  it("renders a table with all the fields", () => {
    render(<Appointment customer={[]} />);
    expect(container.querySelector("table")).not.toBeNull();
    expect(container.textContent).toMatch("First Name");
    expect(container.textContent).toMatch("Last Name");
    expect(container.textContent).toMatch("Phone Number");
    expect(container.textContent).toMatch("Stylist");
    expect(container.textContent).toMatch("Service");
    expect(container.textContent).toMatch("Notes");
  });
  it("renders a table with the right header", () => {
    customer = { startsAt: "09:30" };
    render(<Appointment customer={customer} />);
    expect(container.querySelector("#table-appt-header")).not.toBeNull();
    expect(container.querySelector("#table-appt-header").textContent).toEqual(
      "09:30"
    );
  });
  it("renders table with tds with the right ids", () => {
    render(<Appointment customer={[]} />);
    expect(container.querySelector("#first-name")).not.toBeNull();
    expect(container.querySelector("#last-name")).not.toBeNull();
    expect(container.querySelector("#phone")).not.toBeNull();
    expect(container.querySelector("#stylist")).not.toBeNull();
    expect(container.querySelector("#service")).not.toBeNull();
    expect(container.querySelector("#notes")).not.toBeNull();
  });
  it("renders a table with the right fields", () => {
    customer = {
      firstName: "Rob",
      lastName: "Olk",
      phone: "01",
      stylist: "hairdresser",
      service: "hair-cut",
      notes: "no shampoo",
    };

    render(<Appointment customer={customer} />);
    expect(container.querySelector("#first-name").textContent).toEqual("Rob");
    expect(container.querySelector("#last-name").textContent).toEqual("Olk");
    expect(container.querySelector("#phone").textContent).toEqual("01");
    expect(container.querySelector("#stylist").textContent).toEqual(
      "hairdresser"
    );
    expect(container.querySelector("#service").textContent).toEqual("hair-cut");
    expect(container.querySelector("#notes").textContent).toEqual("no shampoo");
  });
});

describe("AppointmentsDayView", () => {
  let container;
  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: "Ashley" },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: "Jordan" },
    },
  ];

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => {
    ReactDOM.render(component, container);
  };

  it("renders a div with the right id", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.querySelector("div#appointmentsDayView")).not.toBeNull();
  });
  it("renders multiple appointments in an ol element", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelector("ol")).not.toBeNull;
    expect(container.querySelector("ol").children).toHaveLength(2);
  });
  it("renders each appointment in an li", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll("li")).toHaveLength(2);
    expect(container.querySelectorAll("li")[0].textContent).toEqual("12:00");
    expect(container.querySelectorAll("li")[1].textContent).toEqual("13:00");
  });
  it("initially shows a message saying there are no appointments today", () => {
    render(<AppointmentsDayView appointments={[]} />);
    expect(container.textContent).toMatch(
      "There are no appointments scheduled for today."
    );
  });
  it("selects the first appointment by default", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.textContent).toMatch("Ashley");
  });
  it("has a button in each li", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    expect(container.querySelectorAll("li > button")).toHaveLength(2);
    expect(container.querySelectorAll("li > button")[0].type).toEqual("button");
  });
  it("renders another appointment when selected", () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll("button")[1];
    ReactTestUtils.Simulate.click(button);
    expect(container.textContent).toMatch("Jordan");
  });
});
