import PropTypes from "prop-types";
import { useState } from "react";

import { updateCalorieGoal } from "./DataBaseFunc";
import Cookies from "js-cookie";

function CalorieRemain({ calorieData, setCalorieData }) {
  const [newGoal, setNewGoal] = useState(1);
  function handleSubmit(e) {
    const goalInput = document.getElementById("newGoal");
    if (newGoal === "" || newGoal <= 0) {
      // break when bad input
      e.preventDefault();
      return;
    }
    const user_id = Cookies.get("userid");
    updateCalorieGoal(parseInt(newGoal), user_id);

    const newCalorieData = { ...calorieData };
    newCalorieData.goal = parseInt(newGoal);
    setCalorieData(newCalorieData);

    setNewGoal(0);
    goalInput.value = 0;
    goalInput.classList.replace("input-success", "input-error");
  }

  function handleInput(e) {
    console.log(e.target);
    if (e.target.value === "" || e.target.value <= 0) {
      e.target.classList.replace("input-success", "input-error");
    } else {
      e.target.classList.replace("input-error", "input-success");
    }
    setNewGoal(e.target.value);
  }

  return (
    <div className="flex flex-col flex-center justify-center">
      <h3 className="font-bold text-lg">Calories Remaining</h3>
      <div className="stats">
        <div
          className="stat place-items-center"
          onClick={() => document.getElementById("goal_modal").showModal()}
        >
          <div className="stat-title">Goal 🖊</div>
          <div className="stat-value text-base sm:text-3xl">
            {calorieData.goal}
          </div>
        </div>
        <dialog id="goal_modal" className="modal border-none text-center">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Enter your new calorie goal</h3>
            <p>{"Make sure it's >= 0"}</p>
            <div>
              <form method="dialog" className="join">
                <input
                  id="newGoal"
                  type="number"
                  className="input input-bordered join-item input-success"
                  placeholder={newGoal}
                  onInput={e => handleInput(e)}
                />
                <button
                  className="btn join-item"
                  onClick={e => {
                    handleSubmit(e);
                  }}
                >
                  GO!
                </button>
              </form>
            </div>
          </div>
        </dialog>

        <div className="stat place-items-center">
          <div className="stat-title">Consumed</div>
          <div className="stat-value text-secondary text-base sm:text-3xl">
            {calorieData.consumed}
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Remaining</div>
          <div className="stat-value text-base sm:text-3xl">
            {calorieData.goal - calorieData.consumed}
          </div>
        </div>
      </div>
    </div>
  );
}

CalorieRemain.propTypes = {
  calorieData: PropTypes.shape({
    goal: PropTypes.number.isRequired,
    consumed: PropTypes.number.isRequired,
  }),
  setCalorieData: PropTypes.func.isRequired,
};

export default CalorieRemain;
