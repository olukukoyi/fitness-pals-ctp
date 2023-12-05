import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DateSelector, getCurrentDate } from "./DateSelector";
import CalorieRemain from "./CalorieRemain";
import MealTable from "./MealTable";

import { pullDiary } from "./DataBaseFunc";

function Diary() {
  // pull user food info from db of this shape
  const [userFoodArr, setUserFoodArr] = useState([
    [], // breakfast
    [], // lunch
    [], // dinner
    [], // snacks
  ]);
  const [date, setDate] = useState(getCurrentDate());
  const [calorieData, setCalorieData] = useState({ goal: 2000, consumed: 0 });
  const titles = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const navigate = useNavigate();

  useEffect(() => {
    // when user isnt logged in itll redirect to test page to log them in
    setCalorieData({ goal: 2000, consumed: 0 });
    console.log("reset calories");

    pullDiary(
      date,
      calorieData,
      setCalorieData,
      userFoodArr,
      setUserFoodArr,
    ).then(val => {
      val === undefined ? navigate("/test") : "";
    });
  }, [navigate, date]);

  return (
    <div>
      <div className="divider m-0"></div>
      <DateSelector setUserFoodArr={setUserFoodArr} setDate={setDate} />
      <div className="divider m-0"></div>
      <CalorieRemain calorieData={calorieData} />
      <div className="divider m-0"></div>
      {userFoodArr.map((innerArr, index) => (
        <div key={index}>
          <MealTable
            foodArr={innerArr}
            title={titles[index]}
            userFoodArr={userFoodArr}
            setUserFoodArr={setUserFoodArr}
          />
          <div className="divider before:bg-transparent after:bg-transparent"></div>
        </div>
      ))}
    </div>
  );
}

export default Diary;
