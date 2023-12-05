import PropTypes from "prop-types";

function CalorieRemain({ calorieData }) {
  //pull user data from db (using const for now)
  // const calorieData = { goal: 2000, consumed: 543 };
  return (
    <div className="flex flex-col flex-center justify-center">
      <h3 className="font-bold text-lg">Calories Remaining</h3>
      <div className="stats">
        <div className="stat place-items-center">
          <div className="stat-title">Goal</div>
          <div className="stat-value text-base sm:text-3xl">
            {calorieData.goal}
          </div>
        </div>

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
};

export default CalorieRemain;
