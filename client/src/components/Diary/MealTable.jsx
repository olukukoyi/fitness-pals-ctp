import PropTypes from "prop-types";
import { useState } from "react";

function MealTable({ title, foodArr, userFoodArr, setUserFoodArr }) {
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
      />
    </ul>
  );
}

function FoodTableItem({ name, id, cal, carb, protein, fat, servings }) {
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
        <div className="modal-box h-screen">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg">
            {name} {id}
          </h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          <div className="flex justify-evenly">
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
        </div>
      </dialog>
    </>
  );
}

function AddCustomFoodModal({ title, userFoodArr, setUserFoodArr }) {
  const [foodInfo, updateFoodInfo] = useState({
    name: "",
    carb: 0,
    fat: 0,
    protein: 0,
    servings: 1,
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

  function addFood(e, foodInfo, mealName) {
    const mealsMap = {
      Breakfast: 0,
      Lunch: 1,
      Dinner: 2,
      Snacks: 3,
    };
    const mealIndex = mealsMap[mealName];
    e.preventDefault();
    console.log(foodInfo);
    if (foodInfo.servings <= 0) {
      alert("Enter a serving amount >= 1");
      return;
    } else if (foodInfo.name === "") {
      alert("Enter a food name of length >= 1");
      return;
    }

    const newUserFoodArr = [...userFoodArr];
    const newFood = {
      ...foodInfo,
      calories: cal * foodInfo.servings,
      id: `${Math.floor(Math.random() * 9999)}`,
    };
    if (!newUserFoodArr[mealIndex]) {
      newUserFoodArr[mealIndex] = []; // Initialize the array if it doesn't exist
    }
    newUserFoodArr[mealIndex].push(newFood);

    console.log(newUserFoodArr[mealIndex]);
    setUserFoodArr(newUserFoodArr); // Update the state with the new array
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
        <form action="">
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
            className="btn"
            onClick={e => {
              addFood(e, foodInfo, title);
            }}
          >
            Add to {title}
          </button>
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
  userFoodArr: PropTypes.array.isRequired,
  setUserFoodArr: PropTypes.func.isRequired,
};

MealTable.propTypes = {
  title: PropTypes.string.isRequired,
  foodArr: PropTypes.array.isRequired,
  userFoodArr: PropTypes.array.isRequired,
  setUserFoodArr: PropTypes.func.isRequired,
};

FoodTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  cal: PropTypes.number.isRequired,
  carb: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  protein: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
};

export default MealTable;
