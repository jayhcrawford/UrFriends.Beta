import React, { useState } from "react";
import LinkBar from "./LinkBar";
import useWindowSize from "../functions/WindowResize";

const days = [
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "b1",
  "b2",
  "b3",
  "b4",
  "b5",
  "b6",
  "b7",
  "c1",
  "c2",
  "c3",
  "c4",
  "c5",
  "c6",
  "c7",
  "d1",
  "d2",
  "d3",
  "d4",
  "d5",
  "d6",
  "d7",
  "e1",
  "e2",
  "e3",
  "e4",
  "e5",
  "e6",
  "e7",
  "f1",
  "f2",
  "f3",
  "f4",
  "f5",
  "f6",
  "f7",
];

const RenderCalendarDays = () => {
  return (
    <>
      {days.map((day) => {
        return (
          <div style={{border: "1px solid black"}} key={day}>{day}</div>
        );
      })}
    </>
  );
};

const date = new Date();
const monthIndex = date.getMonth(); // Returns a number from 0 (January) to 11 (December)
const currentYear = date.getFullYear();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonth = monthNames[monthIndex];

const HeaderDay = (props) => {
  const { width } = useWindowSize();

  if (width < 600) {
    return <div className="cal-header-day">{props.day.slice(0, 3)}</div>;
  }

  return <div className="cal-header-day">{props.day}</div>;
};

const Calendar = () => {
  const { width } = useWindowSize();

  const { height } = useWindowSize();

  const [selectedMonth, setSelectedMonth] = useState({
    choiceIndex: monthIndex,
  });

  const [selectedYear, setSelectedYear] = useState(currentYear);

  console.log(width, height);

  const changeMonth = (incOrDec) => {
    if (incOrDec == "inc") {
      if (selectedMonth.choiceIndex != 11) {
        const newSelectedMonth = {
          choiceIndex: selectedMonth.choiceIndex + 1,
        };
        setSelectedMonth(newSelectedMonth);
      } else {
        setSelectedMonth({
          choiceIndex: 0,
        });
        setSelectedYear(selectedYear + 1);
      }
    }
    if (incOrDec == "dec") {
      if (selectedMonth.choiceIndex != 0) {
        const newSelectedMonth = {
          choiceIndex: selectedMonth.choiceIndex - 1,
        };
        setSelectedMonth(newSelectedMonth);
      } else {
        setSelectedMonth({
          choiceIndex: 11,
        });
        setSelectedYear(selectedYear - 1);
      }
    }
  };

  return (
    <>
      <LinkBar page="calendar" />
      <div
        className="calendar-base"
        style={{ backgroundColor: "red", height: "45em", width: "100" }}
      >
        {/* Calendar header here*/}
        <div
          className="calendar-month"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button onClick={() => changeMonth("dec")}>{"<-"}</button>
          <h3 style={{ fontSize: "1.5em" }}>
            {monthNames[selectedMonth.choiceIndex]} {selectedYear}
          </h3>{" "}
          <button onClick={() => changeMonth("inc")}>{"->"}</button>
        </div>
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
        {/* (close) Calendar header here */}
        {/* Calendar days starts here */}
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "green",
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gridTemplateRows: "repeat(6, 1fr)",
            gridColumnGap: "0px",
            gridRowGap: "0px",
          }}
        >
          <RenderCalendarDays />
        </div>
      </div>
    </>
  );
};

export default Calendar;

/*

import React, { useState } from "react";
import LinkBar from "./LinkBar";
import useWindowSize from "../functions/WindowResize";

const date = new Date();
const monthIndex = date.getMonth(); // Returns a number from 0 (January) to 11 (December)
const currentYear = date.getFullYear();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentMonth = monthNames[monthIndex];

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
                <div
                  style={{
                    backgroundColor: "green",
                    height: "2.5em",
                    width: "2.5em",
                    borderRadius: "50%",
                    margin: ".2em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  1
                </div>
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

  const { height } = useWindowSize();


  const [selectedMonth, setSelectedMonth] = useState({
    choiceIndex: monthIndex,
  });

  const [selectedYear, setSelectedYear] = useState(currentYear);

  console.log(width, height);

  const changeMonth = (incOrDec) => {
    if (incOrDec == "inc") {
      if (selectedMonth.choiceIndex != 11) {
        const newSelectedMonth = {
          choiceIndex: selectedMonth.choiceIndex + 1,
        };
        setSelectedMonth(newSelectedMonth);
      } else {
        setSelectedMonth({
          choiceIndex: 0,
        });
        setSelectedYear(selectedYear + 1);
      }
    }
    if (incOrDec == "dec") {
      if (selectedMonth.choiceIndex != 0) {
        const newSelectedMonth = {
          choiceIndex: selectedMonth.choiceIndex - 1,
        };
        setSelectedMonth(newSelectedMonth);
      } else {
        setSelectedMonth({
          choiceIndex: 11,
        });
        setSelectedYear(selectedYear - 1);
      }
    }
  };

  return (
    <>
      <LinkBar page="calendar" />
      <div
        className="calendar-month"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button onClick={() => changeMonth("dec")}>{"<-"}</button>
        <h3 style={{ fontSize: "1.5em" }}>
          {monthNames[selectedMonth.choiceIndex]} {selectedYear}
        </h3>{" "}
        <button onClick={() => changeMonth("inc")}>{"->"}</button>
      </div>
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
*/
