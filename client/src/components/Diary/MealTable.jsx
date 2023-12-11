import PropTypes from "prop-types";
import { useState } from "react";

import { createEntry, deleteEntry } from "./DataBaseFunc";

import trashcan from "../assets/trash-can.svg";

function MealTable({
  title,
  foodArr,
  userFoodArr,
  setUserFoodArr,
  calories,
  date,
  setCalories,
}) {
  return (
    <ul className="menu bg-base-200 p-0 [&_li>*]:rounded-none">
      <li className="menu-title">{title}</li>
      {foodArr.map((foodObj, index) => (
        <FoodTableItem
          name={foodObj.name}
          id={foodObj.id}
          cal={foodObj.calories}
          carb={
            foodObj.calories === 0
              ? 0
              : Math.floor(
                  ((foodObj.carb * 4) / (foodObj.calories / foodObj.servings)) *
                    100,
                )
          }
          fat={
            foodObj.calories === 0
              ? 0
              : Math.floor(
                  ((foodObj.fat * 9) / (foodObj.calories / foodObj.servings)) *
                    100,
                )
          }
          protein={
            foodObj.calories === 0
              ? 0
              : Math.floor(
                  ((foodObj.protein * 4) /
                    (foodObj.calories / foodObj.servings)) *
                    100,
                )
          }
          servings={foodObj.servings}
          userFoodArr={userFoodArr}
          setUserFoodArr={setUserFoodArr}
          consumedCalories={calories}
          setConsumedCalories={setCalories}
          key={index}
        />
      ))}
      <div className="divider m-0"></div>
      <button
        onClick={() => {
          document.getElementById(`my_modal_${title}`).showModal();
        }}
        className="btn btn-outline btn-primary"
        id={title}
      >
        ADD FOOD
      </button>
      <AddCustomFoodModal
        title={title}
        userFoodArr={userFoodArr}
        setUserFoodArr={setUserFoodArr}
        consumedCalories={calories}
        date={date}
        setConsumedCalories={setCalories}
      />
    </ul>
  );
}

function FoodTableItem({
  name,
  id,
  cal,
  carb,
  protein,
  fat,
  servings,
  userFoodArr,
  setUserFoodArr,
  consumedCalories,
  setConsumedCalories,
}) {
  return (
    <>
      <div className="divider m-0"></div>
      <li
        className=""
        onClick={() => document.getElementById(`my_modal_${id}`).showModal()}
      >
        <div className="flex justify-between">
          <div>
            {name} <br /> {servings} Serving{servings > 1 ? "s" : ""}
          </div>
          <div>{cal}</div>
        </div>
      </li>
      <dialog id={`my_modal_${id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">{name}</h3>
          <h2>id: {id}</h2>
          <div className="divider"></div>
          <div className="grid grid-cols-2 place-items-center gap-y-5">
            <div
              className="radial-progress text-xs text-center text-rose-500"
              style={{ "--value": carb }}
              role="progressbar"
            >
              Carbs <br /> {carb} %
            </div>
            <div
              className="radial-progress text-xs text-center text-teal-500"
              style={{ "--value": fat }}
              role="progressbar"
            >
              Fat <br /> {fat} %
            </div>
            <div
              className="radial-progress text-xs text-center text-cyan-500"
              style={{ "--value": protein }}
              role="progressbar"
            >
              Protein <br /> {protein} %
            </div>

            <div
              className="radial-progress text-xs text-center"
              style={{ "--value": 100 }}
              role="progressbar"
            >
              Calories <br /> {cal}
            </div>
          </div>
          <div className="divider"></div>
          <form method="dialog" className="flex justify-center">
            <button
              className="btn btn-error"
              onClick={() => {
                deleteEntry(userFoodArr, setUserFoodArr, id);
                const newConsumedCalories = {
                  goal: consumedCalories.goal,
                  consumed: consumedCalories.consumed - cal,
                };
                setConsumedCalories(newConsumedCalories);
              }}
            >
              <img src={trashcan} alt="x" className="h-6 w-6" />
              Delete Item
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}

function AddCustomFoodModal({
  title,
  date,
  userFoodArr,
  setUserFoodArr,
  consumedCalories,
  setConsumedCalories,
}) {
  const [foodInfo, updateFoodInfo] = useState({
    name: "",
    carb: 0,
    fat: 0,
    protein: 0,
    servings: 1,
    mealType: title,
  });
  const [cal, updateCal] = useState(0);

  function updateFood(value, macro, inputBox) {
    let temp = JSON.parse(JSON.stringify(foodInfo));

    if (
      value === "" ||
      parseFloat(value) < 0 ||
      (macro === "servings" && parseFloat(value) <= 0)
    ) {
      console.error("Bad input value");
      inputBox.classList.add("input-error");
      temp[macro] = 0; //reset val for that macro to 0 when bad input
      if (macro === "name") {
        //reset to "" for food name
        temp[macro] = "";
      }
    } else {
      inputBox.classList.remove("input-error");
      inputBox.classList.add("input-success");
      isNaN(parseFloat(value))
        ? (temp[macro] = value)
        : (temp[macro] = parseFloat(value));
    }
    updateFoodInfo(temp);
    updateCal(Math.floor(temp.carb * 4 + temp.fat * 9 + temp.protein * 4));
  }

  async function addFood(e, foodInfo, mealName) {
    // all foodInfo needs is userId and calories to be part of it

    const mealsMap = {
      Breakfast: 0,
      Lunch: 1,
      Dinner: 2,
      Snacks: 3,
    };
    const mealIndex = mealsMap[mealName];

    console.log(foodInfo);
    if (foodInfo.servings <= 0) {
      e.preventDefault();
      alert("Enter a serving amount >= 1");
      return;
    } else if (foodInfo.name === "") {
      e.preventDefault();
      alert("Enter a food name of length >= 1");
      return;
    }

    const newUserFoodArr = [...userFoodArr];
    const entryInput = {
      ...foodInfo,
      calories: cal * foodInfo.servings,
      createdAt: date,
    };
    console.log(entryInput);
    const newFood = await createEntry(entryInput);

    if (!newUserFoodArr[mealIndex]) {
      newUserFoodArr[mealIndex] = []; // Initialize the array if it doesn't exist
    }
    newUserFoodArr[mealIndex].push(newFood);

    setUserFoodArr(newUserFoodArr); // Update the state with the new array
    updateFoodInfo({
      name: "",
      carb: 0,
      fat: 0,
      protein: 0,
      servings: 1,
      mealType: title,
    });

    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => (input.value = ""));
    inputs.forEach(input => input.classList.remove("input-success"));

    const newConsumedCalories = {
      goal: consumedCalories.goal,
      consumed: consumedCalories.consumed + cal,
    };
    setConsumedCalories(newConsumedCalories);
    updateCal(0);
  }

  return (
    <dialog id={`my_modal_${title}`} className="modal">
      <div className="modal-box h-screen">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Add {title} Food</h3>
        <form method="dialog">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onInput={e => updateFood(e.target.value, "name", e.target)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Carbohydrates (grams)</span>
            </label>
            <input
              type="number"
              placeholder="0"
              className="input input-bordered w-full max-w-xs"
              onInput={e => updateFood(e.target.value, "carb", e.target)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Fat (grams)</span>
            </label>
            <input
              type="number"
              placeholder="0"
              className="input input-bordered w-full max-w-xs"
              onInput={e => updateFood(e.target.value, "fat", e.target)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Protein (grams)</span>
            </label>
            <input
              type="number"
              placeholder="0"
              className="input input-bordered w-full max-w-xs"
              onInput={e => updateFood(e.target.value, "protein", e.target)}
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Servings</span>
            </label>
            <input
              type="number"
              placeholder="1"
              defaultValue={1}
              className="input input-bordered w-full max-w-xs"
              onInput={e => updateFood(e.target.value, "servings", e.target)}
            />
          </div>

          <button
            className="btn mt-4"
            onClick={e => {
              addFood(e, foodInfo, title);
            }}
          >
            Add to {title}
          </button>
          <div className="divider"></div>
        </form>
        <div className="grid grid-cols-2 place-items-center sm:flex sm:justify-evenly">
          <div
            className="radial-progress text-xs text-center text-rose-500"
            style={{
              "--value":
                cal === 0 ? 0 : Math.floor(((foodInfo.carb * 4) / cal) * 100),
            }}
            role="progressbar"
          >
            Carbs <br />{" "}
            {cal === 0 ? 0 : Math.floor(((foodInfo.carb * 4) / cal) * 100)} %
          </div>
          <div
            className="radial-progress text-xs text-center text-teal-500"
            style={{
              "--value":
                cal === 0 ? 0 : Math.floor(((foodInfo.fat * 9) / cal) * 100),
            }}
            role="progressbar"
          >
            Fat <br />{" "}
            {cal === 0 ? 0 : Math.floor(((foodInfo.fat * 9) / cal) * 100)} %
          </div>
          <div
            className="radial-progress text-xs text-center text-cyan-500"
            style={{
              "--value":
                cal === 0
                  ? 0
                  : Math.floor(((foodInfo.protein * 4) / cal) * 100),
            }}
            role="progressbar"
          >
            Protein <br />{" "}
            {cal === 0 ? 0 : Math.floor(((foodInfo.protein * 4) / cal) * 100)} %
          </div>

          <div
            className="radial-progress text-xs text-center "
            style={{ "--value": 100 }}
            role="progressbar"
          >
            Calories <br />{" "}
            {foodInfo.servings > 0 ? cal * foodInfo.servings : cal}{" "}
          </div>
        </div>
      </div>
    </dialog>
  );
}

AddCustomFoodModal.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  userFoodArr: PropTypes.array.isRequired,
  setUserFoodArr: PropTypes.func.isRequired,
  consumedCalories: PropTypes.object.isRequired,
  setConsumedCalories: PropTypes.func.isRequired,
};

MealTable.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  foodArr: PropTypes.array.isRequired,
  userFoodArr: PropTypes.array.isRequired,
  setUserFoodArr: PropTypes.func.isRequired,
  calories: PropTypes.object.isRequired,
  setCalories: PropTypes.func.isRequired,
};

FoodTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cal: PropTypes.number.isRequired,
  carb: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  protein: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  userFoodArr: PropTypes.array.isRequired,
  setUserFoodArr: PropTypes.func.isRequired,
  consumedCalories: PropTypes.object.isRequired,
  setConsumedCalories: PropTypes.func.isRequired,
};

export default MealTable;
