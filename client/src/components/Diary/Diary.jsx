import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DateSelector from "./DateSelector";
import CalorieRemain from "./CalorieRemain";
import MealTable from "./MealTable";

import Cookies from "js-cookie";

function Diary() {
  // pull user food info from db of this shape
  const [userFoodArr, setUserFoodArr] = useState([
    [
      {
        name: "Eggo Waffles",
        id: "1",
        calories: 90,
        carb: 0,
        fat: 0,
        protein: 0,
        servings: 1,
      },
    ], // breakfast
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
      {
        name: "Eggo Waffles",
        id: "1",
        calories: 90,
        carb: 0,
        fat: 0,
        protein: 0,
        servings: 1,
      },
    ], // lunch
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
    ], // dinner
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
    ], // snacks
  ]);

  const titles = ["Breakfast", "Lunch", "Dinner", "Snacks"];

  async function pullDiary() {
    const userid = Cookies.get("userid");
    if (userid === undefined) {
      return undefined;
    }
    const data = await fetch(`http://localhost:8001/diary/${userid}`);
    const res = await data.json();

    for (let i = 0; i < res.diary.length; i++) {
      // console.log(res.diary[i].mealType);
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

      const temp = [...userFoodArr];
      temp[indexToPut].push(res.diary[i]);
      setUserFoodArr(temp);
    }
    console.log("BREAK");
    return "Pulled properly";
  }

  const navigate = useNavigate();

  useEffect(() => {
    // for init pulling diary
    // when user isnt logged in itll redirect to test page to log them in
    pullDiary().then(val => {
      val === undefined ? navigate("/test") : "";
    });
  }, [navigate]);

  useEffect(() => {
    console.log("New food arr is : ", userFoodArr);
  }, [userFoodArr]);

  return (
    <div>
      <div className="divider m-0"></div>
      <DateSelector setUserFoodArr={setUserFoodArr} />
      <div className="divider m-0"></div>
      <CalorieRemain />
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
