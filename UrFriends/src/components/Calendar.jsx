import React from "react";
import LinkBar from "./LinkBar";

const Calendar = () => {
  return (
    <>
      <LinkBar page="calendar" />
      <div
        style={{
          width: "100%",
          height: "40em",
          backgroundColor: "pink",
          border: "5px solid red",
          boxSizing: "border-box",
        }}
      >
        <span className="calendar-row-1">
          <div className="calendar-row" style={{backgroundColor: "green"}}></div>
        </span>
        <span className="calendar-row-2">
          <div className="calendar-row" style={{backgroundColor: "green"}}></div>
        </span>
        <span className="calendar-row-3">
          <div className="calendar-row" style={{backgroundColor: "green"}}></div>
        </span>
        <span className="calendar-row-4">
          <div className="calendar-row" style={{backgroundColor: "green"}}></div>
        </span>
        <span className="calendar-row-5">
          <div className="calendar-row" style={{backgroundColor: "green"}}></div>
        </span>
        <span className="calendar-row-6">
          <div className="calendar-row" style={{backgroundColor: "green"}}></div>
        </span>
      </div>
    </>
  );
};

export default Calendar;
