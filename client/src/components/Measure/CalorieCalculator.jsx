import { useState } from "react";

const CalorieCalculator = () => {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("");
  const [caloriesResult, setCaloriesResult] = useState(null);

  const calculateCalories = () => {
    const bmiMap = {
      placeholders: "Please fill all boxes with the appropriate info",
    };

    // if(weight===null || isNaN(weight)
    // || feet===null || isNaN(feet)
    // || inches===null || isNaN(inches)
    // || age===null || isNaN(age)
    // || activityLevel==="placeholder")
    // {
    //   let resultMessage ="Please fill all boxes with the appropriate info";
    // }
    const heightInInches = feet * 12 + inches;
    let bmr; //basal metabolic rate

    if (gender === "male") {
      bmr = 66 + 6.23 * weight + 12.7 * heightInInches - 6.8 * age;
    } else {
      bmr = 655 + 4.35 * weight + 4.7 * heightInInches - 4.7 * age;
    }

    // Adjust for activity level
    switch (activityLevel) {
      case "sedentary":
        setCaloriesResult(bmr * 1.2);
        break;
      case "lightlyActive":
        setCaloriesResult(bmr * 1.375);
        break;
      case "moderatelyActive":
        setCaloriesResult(bmr * 1.55);
        break;
      case "veryActive":
        setCaloriesResult(bmr * 1.725);
        break;
      default:
        setCaloriesResult(null);
    }
  };
  const ageOptions = Array.from({ length: 100 }, (_, i) => i + 1);

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
              min="0"
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
              <option value="placeholder">Choose activity level</option>
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
              <option value="superActive">
                Super Active (very hard exercise/sports & physical job or 2x
                training)
              </option>
            </select>
          </label>
        </div>

        {/*BUTTON*/}
        <button
          type="button"
          onClick={calculateCalories}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Calculate Calories
        </button>
      </form>

      {caloriesResult !== null && (
        <div className="mt-4 p-4 bg-green-100 rounded-md">
          <p className="text-green-700">
            Estimated Daily Calories: {caloriesResult.toFixed(2)}
          </p>
          {/*OUTPUT*/}
        </div>
      )}
    </div>
  );
};

export default CalorieCalculator;
