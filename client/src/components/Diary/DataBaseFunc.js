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

  for (let i = 0; i < res.diary.length; i++) {
    const dateCreated = res.diary[i].createdAt.slice(0, 10);

    if (dateCreated !== date) {
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
