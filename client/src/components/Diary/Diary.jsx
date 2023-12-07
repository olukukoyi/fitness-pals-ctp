import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DateSelector, getCurrentDate } from "./DateSelector";
import CalorieRemain from "./CalorieRemain";
import MealTable from "./MealTable";

import Cookies from "js-cookie";

function Diary() {
  // pull user food info from db of this shape
  const [userFoodArr, setUserFoodArr] = useState([
    [
      {
        name: "Kirkland Protein Bar",
        id: "2",
        calories: 180,
        carb: 0,
        fat: 0,
        protein: 0,
        servings: 1,
      },
    ], // breakfast
    [], // lunch
    [], // dinner
    [], // snacks
  ]);
  const [date, setDate] = useState(getCurrentDate());
  const [calorieData, setCalorieData] = useState({ goal: 2000, consumed: 0 });
  const titles = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const navigate = useNavigate();

  async function pullDiary(date) {
    const userid = Cookies.get("userid");
    if (userid === undefined) {
      return undefined;
    }
    const data = await fetch(`http://localhost:8001/diary/${userid}`);
    const res = await data.json();

    for (let i = 0; i < res.diary.length; i++) {
      const dateCreated = res.diary[i].createdAt.slice(0, 10);

      if (dateCreated !== date) {
        console.log(dateCreated, date, dateCreated === date);
        continue; // This will skip to the next iteration of the loop when date doesnt match
      }

      //update calories
      const newCalorieDate = { ...calorieData };
      newCalorieDate.consumed += res.diary[i].calories;
      console.log(newCalorieDate);
      setCalorieData(newCalorieDate);

      //decide index to place food item
      let indexToPut = 0;
      switch (res.diary[i].mealType) {
        case "Breakfast":
          indexToPut = 0;
          break;
        case "Lunch":
          indexToPut = 1;
          break;
        case "Dinner":
          indexToPut = 2;
          break;
        default:
          indexToPut = 3;
      }

      //update foodArr
      const temp = [...userFoodArr];
      temp[indexToPut].push(res.diary[i]);
      setUserFoodArr(temp);
    }
    return "Pulled properly";
  }

  async function createEntry(food) {
    // just a dummy function for now
    const userid = Cookies.get("userid");
    const req = await fetch("http://localhost:8001/diary/create-entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You might need additional headers (e.g., authentication tokens) based on the API requirements
      },
      body: JSON.stringify({
        carb: 999,
        fat: 999,
        mealType: "Lunch",
        name: "Helena",
        protein: 999,
        servings: 999,
        calories: 999,
        userId: userid,
      }),
    });

    const res = await req.json();
    console.log(res);
  }

  useEffect(() => {
    // when user isnt logged in itll redirect to test page to log them in
    setCalorieData({ goal: 2000, consumed: 0 });
    console.log("reset calories");

    pullDiary(date).then(val => {
      // val === undefined ? navigate("/test") : "";
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
