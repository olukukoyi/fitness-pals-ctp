import Cookies from "js-cookie";

export async function pullDiary(
  date,
  calorieData,
  setCalorieData,
  userFoodArr,
  setUserFoodArr,
) {
  const userid = Cookies.get("userid");
  if (userid === undefined) {
    return undefined;
  }
  const data = await fetch(`http://localhost:8001/diary/${userid}`);
  const res = await data.json();

  let consumedCalories = 0;
  for (let i = 0; i < res.diary.length; i++) {
    const dateCreated = res.diary[i].createdAt.slice(0, 10);

    if (dateCreated !== date) {
      continue; // This will skip to the next iteration of the loop when date doesnt match
    }

    //update calories
    consumedCalories += res.diary[i].calories;

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

    //update calories
    const newCalorieData = { ...calorieData };
    newCalorieData.consumed = consumedCalories;
    setCalorieData(newCalorieData);
  }
  return "Pulled properly";
}

export async function createEntry(food) {
  // just a dummy function for now
  const userid = Cookies.get("userid");
  const req = await fetch("http://localhost:8001/diary/create-entry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...food,
      userId: userid,
    }),
  });

  const res = await req.json();
  return res.newEntry;
}

export async function deleteEntry(userFoodArr, setUserFoodArr, id) {
  const req = await fetch("http://localhost:8001/diary/delete-entry", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  const res = await req.json();
  console.log(res);

  const updatedFoodArr = userFoodArr.map(subArray =>
    subArray.filter(item => item.id !== id),
  );
  setUserFoodArr(updatedFoodArr);
}

export async function updateCalorieGoal(cal_goal, user_id) {
  await fetch("http://localhost:8001/user/update-cal-goal", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: user_id,
      goal: cal_goal,
    }),
  });
}

export async function getCalorieGoal(user_id) {
  const req = await fetch(`http://localhost:8001/user/${user_id}`);
  const res = await req.json();
  if (res.user.calGoal === null) {
    updateCalorieGoal(2000, user_id); // set/return default calorie amount of 2000
    return 2000;
  }
  return res.user.calGoal;
}
