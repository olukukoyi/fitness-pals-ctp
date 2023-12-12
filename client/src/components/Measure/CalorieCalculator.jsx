import { useState } from "react";
import ResultCard from "./ResultCard";

const CalorieCalculator = () => {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");//
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState('maintain');
  const [caloriesResult, setCaloriesResult] = useState(null);//result for daily calories
  const [validationMessage, setValidationMessage] = useState("");//error handling

  const [result, setResult] = useState(null);//
  const [isResultCardOpen, setIsResultCardOpen] = useState(false);//

  const calculateCalories = () => {

    if(weight==="" || isNaN(weight)//error handling
    || feet==="" || isNaN(feet)
    || inches==="" || isNaN(inches)
    || age==="" || isNaN(age)
    || activityLevel==="placeholder"
    || goal === 'placeholder')
    {
      setValidationMessage("Please fill all boxes with the appropriate info");//sets the error message
      setCaloriesResult(null);//sets calorie result to null
      return;
    }
    const heightInInches = feet * 12 + parseInt(inches); 
    let bmr; //basal metabolic rate

    if (gender === "male") {//calculate for genders
      bmr = 66 + (6.23 * weight) + (12.7 * heightInInches) - (6.8 * age);
    } else {
      bmr = 655 + 4.35 * weight + 4.7 * heightInInches - 4.7 * age;
    }

    let activityMultiplier;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'lightlyActive':
        activityMultiplier = 1.375;
        break;
      case 'moderatelyActive':
        activityMultiplier = 1.55;
        break;
      case 'veryActive':
        activityMultiplier = 1.725;
        break;
      default:
        activityMultiplier = 1;
    }

    // Adjust for goal
    let goalMultiplier;
    switch (goal) {
      case 'lose':
        goalMultiplier = 0.8;
        break;
      case 'maintain':
        goalMultiplier = 1;
        break;
      case 'gain':
        goalMultiplier = 1.2;
        break;
      default:
        goalMultiplier = 1;
    }

    const estimatedCalories = bmr * activityMultiplier * goalMultiplier;

    setCaloriesResult(estimatedCalories);
    let resultMessage =
      "Your estimated daily calorie goal is " +
      estimatedCalories.toFixed(0);
      console.log(estimatedCalories , " ahhhhhhhhh");
    setResult(resultMessage);
    setIsResultCardOpen(true);
    setValidationMessage(null);//reset error message
  };

  const closeResultCard = () => {//
    setWeight("");
    setFeet("");
    setInches("");
    setIsResultCardOpen(false);
    setAge("");
  };

  return (
    <div className="border-2 border-gray-400 container-lg w-full mx-auto my-8 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Calorie Calculator</h2>

      <form>
        <div className="row">
          {/*Row 1 - Weight */}
          <div className="mb-12">
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-600"
            >
              Weight:
            </label>
            <input
              type="number"
              id="weight"
              min="0"
              max="500"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              className="form-input mt-1 block w-full border-2 border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="row">
          {/*Row 2 - Gender */}
          <div className="mb-12">
            <label className="block text-sm font-medium text-gray-600">
              Gender:
            </label>
            <div className="flex">
              <div className="mr-4">
                <input
                  type="radio"
                  id="male"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="mr-2"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="mr-2"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {" "}
          {/*Row 3 - height & age */}
          <div className="mb-4">
            <label
              htmlFor="feet"
              className="block text-sm font-medium text-gray-600"
            >
              Height (feet):
            </label>
            <input
              type="number"
              id="feet"
              min="1"
              max="8"
              value={feet}
              onChange={e => setFeet(e.target.value)}
              className="form-input mt-1 block w-full border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="inches"
              className="block text-sm font-medium text-gray-600"
            >
              Height (inches):
            </label>
            <input
              type="number"
              id="inches"
              min="0"
              max="11"
              value={inches}
              onChange={e => setInches(e.target.value)}
              className="form-input mt-1 block w-full border-2 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600"
            >
              {/*age input*/}
              Age :
            </label>
            <input
              type="number"
              id="age"
              min="1"
              max="90"
              value={age}
              onChange={e => setAge(e.target.value)}
              className="form-input mt-1 block w-full border-2 border-gray-300 rounded-md p-2 flex-1"
            />
          </div>
        </div>

        <div className="mb-4 col-span-6">
          {" "}
          {/*Row 4 - activity level */}
          <label
            htmlFor="activityLevel"
            className="block text-sm font-medium text-gray-600"
          >
            Activity Level:
            <select
              name="activityLevel"
              value={activityLevel}
              required
              className="form-input mt-1 block w-full border-2 border-gray-300 rounded-md p-2"
              onChange={e => {
                setActivityLevel(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="placeholder" disabled>Choose activity level</option>
              <option value="sedentary">
                Sedentary (little or no exercise)
              </option>
              <option value="lightlyActive">
                Lightly Active (light exercise/sports 1-3 days/week)
              </option>
              <option value="moderatelyActive">
                Moderately Active (moderate exercise/sports 3-5 days/week)
              </option>
              <option value="veryActive">
                Very Active (hard exercise/sports 6-7 days a week)
              </option>
            </select>
          </label>
        </div>

        {/* Goal dropdown */}
        <div className="mb-4 col-span-2">
          <label htmlFor="goal" className="block text-sm font-medium text-gray-600">
            Goal:
          </label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="form-select mt-1 block w-full border-2 border-gray-300 rounded-md p-2"
          >
            <option value="placeholder" disabled>
              Select goal
            </option>
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        {/*BUTTON*/}
        <button
          type="button"
          onClick={calculateCalories}
          className="btn-primary text-white py-2 px-4 rounded-md transition duration-300"
        >
          Calculate Calories
        </button>
      </form>

      {/* {RESULTS DISPLAY} */}

      {validationMessage && ( //Displays error handling message
        <div className="text-red-500 mt-2">{validationMessage}</div>
      )}

      {/* {RESULTS DISPLAY in result card} */}
      {isResultCardOpen && (
        <ResultCard result={result} onClose={closeResultCard} />
      )}

      {/* {caloriesResult !== null && ( //Displays result
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-green-700">
            Estimated Daily Calories: {caloriesResult.toFixed(0)}
          </p>
        </div>
      )} */}

    </div>
  );
};

export default CalorieCalculator;
