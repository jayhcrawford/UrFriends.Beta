import React, { useState } from "react";
import LinkBar from "./LinkBar";
import useWindowSize from "../functions/WindowResize";

const borderColor = "rgba(0,0,0,0.3)";
const faintWhite = "rgba(255, 255, 255, 0.5)";
const faintGrey = "rgba(0,0,0,0.1)";
const whiteBase = "white";
const greyBase = "lightgrey";

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

for (let k = 0; k < days.length; k++) {
  if (days[k] == "a7") {
    for (let i = 1; i <= 28; i++) {
      days[k + i - 1] = `${i}`;
    }
  }
}

const RenderCalendarDays = () => {
  function isLetter(char) {
    return /[a-zA-Z]/.test(char);
  }

  return (
    <>
      {days.map((day) => {
        const colorOfDateCircle = isLetter(day[0])
          ? `${faintWhite}`
          : `${faintGrey}`;
        const cellBGColor = !isLetter(day[0]) ? `${"white"}` : `${greyBase}`;

        return (
          <div
            style={{
              border: `1px solid ${borderColor}`,
              backgroundColor: cellBGColor,
            }}
            key={day}
          >
            <div
              style={{
                backgroundColor: colorOfDateCircle,
                height: "2em",
                width: "2em",
                borderRadius: "50%",
                margin: ".2em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isLetter(day[0]) ? null : day}
            </div>
          </div>
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

const CalHeaderDays = (props) => {
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
        style={{
          backgroundColor: `${whiteBase}`,
          height: "45em",
          width: "100",
        }}
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
            backgroundColor: `${whiteBase}`,
            display: "flex",
          }}
        >
          <CalHeaderDays day="Sunday" />
          <CalHeaderDays day="Monday" />
          <CalHeaderDays day="Tuesday" />
          <CalHeaderDays day="Wednesday" />
          <CalHeaderDays day="Thursday" />
          <CalHeaderDays day="Friday" />
          <CalHeaderDays day="Saturday" />
        </div>
        {/* (close) Calendar header here */}
        {/* Calendar days starts here */}
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
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