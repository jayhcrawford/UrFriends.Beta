import React from "react";
import LinkBar from "./LinkBar";

const Week = (props) => {
  const numOfDays = [
    `sun${props.row}`,
    `mon${props.row}`,
    `tues${props.row}`,
    `wed${props.row}`,
    `thurs${props.row}`,
    `fri${props.row}`,
    `sat${props.row}`,
  ];

  return (
    <>
      <span className={`calendar-row-${props.row}`}>
        <div
          className="calendar-row"
          style={{
            backgroundColor: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {numOfDays.map((day) => {
            return (
              <div
                key={day}
                style={{
                  width: "14.25%",
                  height: "100%",
                  backgroundColor: "red",
                  display: "inline-block",
                }}
                className="cal-day-block"
              >
                J
              </div>
            );
          })}
        </div>
      </span>
    </>
  );
};

const Calendar = () => {
  return (
    <>
      <LinkBar page="calendar" />
      <div
        className="calendar-header"
        style={{ width: "100%", height: "3em", backgroundColor: "yellow" }}
      ></div>
      <div
        style={{
          width: "100%",
          height: "40em",
          backgroundColor: "pink",
          border: "5px solid red",
          boxSizing: "border-box",
        }}
      >
        {<Week row="1" />}
        {<Week row="2" />}
        {<Week row="3" />}
        {<Week row="4" />}
        {<Week row="5" />}
        {<Week row="6" />}
      </div>
    </>
  );
};

export default Calendar;
