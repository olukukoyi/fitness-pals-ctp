import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DateSelector, getCurrentDate } from "./DateSelector";
import CalorieRemain from "./CalorieRemain";
import MealTable from "./MealTable";

import { pullDiary, getCalorieGoal } from "./DataBaseFunc";
import Cookies from "js-cookie";

function Diary() {
  // pull user food info from db of this shape
  const [userFoodArr, setUserFoodArr] = useState([
    [], // breakfast
    [], // lunch
    [], // dinner
    [], // snacks
  ]);
  const [date, setDate] = useState(getCurrentDate());
  const [calorieData, setCalorieData] = useState({ goal: 0, consumed: 0 });
  const titles = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const navigate = useNavigate();

  useEffect(() => {
    // when user isnt logged in itll redirect to test page to log them in
    const newCalorieData = { ...calorieData };
    newCalorieData.consumed = 0;
    setCalorieData(newCalorieData);

    pullDiary(
      date,
      calorieData,
      setCalorieData,
      userFoodArr,
      setUserFoodArr,
    ).then(val => {
      val === undefined ? navigate("/") : "";
    });
  }, [navigate, date]);

  useEffect(() => {
    getCalorieGoal(Cookies.get("userid")).then(value => {
      const newCalorieData = { ...calorieData };
      newCalorieData.goal = value;
      setCalorieData(newCalorieData);
    });
  }, []);

  return (
    <div>
      <div className="divider m-0"></div>
      <DateSelector setUserFoodArr={setUserFoodArr} setDate={setDate} />
      <div className="divider m-0"></div>
      <CalorieRemain
        calorieData={calorieData}
        setCalorieData={setCalorieData}
      />
      <div className="divider m-0"></div>
      {userFoodArr.map((innerArr, index) => (
        <div key={index}>
          <MealTable
            foodArr={innerArr}
            title={titles[index]}
            userFoodArr={userFoodArr}
            setUserFoodArr={setUserFoodArr}
            calories={calorieData}
            date={date}
            setCalories={setCalorieData}
          />
          <div className="divider before:bg-transparent after:bg-transparent"></div>
        </div>
      ))}
    </div>
  );
}

export default Diary;
