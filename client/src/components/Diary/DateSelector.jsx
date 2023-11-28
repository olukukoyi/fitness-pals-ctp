import PropTypes from "prop-types";
import { useState } from "react";

function DateSelector({ setUserFoodArr }) {
  const d = new Date();
  const dateMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthMap = [
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

  const [date, setDate] = useState(getCurrentDate());
  const [writtenDate, setWrittenDate] = useState(
    `${dateMap[d.getDay()]}, ${monthMap[d.getMonth()]} ${d.getDate()}`,
  ); // takes form of `Sunday, Junary 01`

  function updateDate(e) {
    //function will need to change foodArr as well
    e.preventDefault();
    const inputDate = e.target.form[0].value; // "yyyy-mm-dd"
    const [year, month, day] = inputDate.split("-").map(Number);
    const d = new Date(year, month - 1, day);

    setDate(e.target.form[0].value);
    console.log(e.target.form[0].value);
    setWrittenDate(
      `${dateMap[d.getDay()]}, ${monthMap[d.getMonth()]} ${d.getDate()}`,
    );

    // at this point pull from db using updated date state
    setUserFoodArr([[], [], [], []]); //for now update to empty arr
  }

  function getCurrentDate() {
    const date = new Date();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate(); // getDate() returns 1-31
    const year = date.getFullYear(); // getFullYear() returns the year

    // Pad single digit month and day with a leading zero
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  return (
    <>
      <button
        className="btn btn-block btn-accent"
        onClick={() => document.getElementById("date_modal").showModal()}
      >
        {writtenDate}
      </button>
      <dialog id="date_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">
            Enter the new date below
          </h3>
          <form action="" className="flex justify-evenly">
            <input type="date" />
            <button
              className="btn"
              onClick={e => {
                updateDate(e);
              }}
            >
              Go there
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

DateSelector.propTypes = {
  setUserFoodArr: PropTypes.func.isRequired,
};

export default DateSelector;
