import React from "react";
import LinkBar from "./LinkBar";
import useWindowSize from "../functions/WindowResize";

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
                  border: "1px solid black",
                  borderWidth: "0px 1px 1px 1px",
                  
                }}
                className="cal-day-block"
              >
                <div style={{backgroundColor: "green", height: "2.5em", width: "2.5em", borderRadius: "50%", margin: ".2em"}}></div>
              </div>
            );
          })}
        </div>
      </span>
    </>
  );
};

const HeaderDay = (props) => {
  const { width } = useWindowSize();

  if (width < 600) {
    return <div className="cal-header-day">{props.day.slice(0, 3)}</div>;
  }

  return <div className="cal-header-day">{props.day}</div>;
};

const Calendar = () => {
  const { width } = useWindowSize();

  console.log(width);

  return (
    <>
      <LinkBar page="calendar" />
      <div
        className="calendar-header"
        style={{
          width: "100%",
          height: "3em",
          backgroundColor: "yellow",
          display: "flex",
        }}
      >
        <HeaderDay day="Sunday" />
        <HeaderDay day="Monday" />
        <HeaderDay day="Tuesday" />
        <HeaderDay day="Wednesday" />
        <HeaderDay day="Thursday" />
        <HeaderDay day="Friday" />
        <HeaderDay day="Saturday" />
      </div>
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
