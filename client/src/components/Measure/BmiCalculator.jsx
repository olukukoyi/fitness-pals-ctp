import { useState } from "react";
import ResultCard from "./ResultCard";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [result, setResult] = useState(null);//
  const [isResultCardOpen, setIsResultCardOpen] = useState(false);//

  const handleSubmit = e => {
    e.preventDefault();

    //let resultMessage = `Weight: ${weight} kg, Height: ${feet}'${inches}`;
    if (
      weight === null ||
      isNaN(weight) ||
      feet === null ||
      isNaN(feet) ||
      inches === null ||
      isNaN(inches)
    ) 
    {
      resultMessage = "Please fill all boxes with the appropriate info";
    }
    calculateBmi();

    setIsResultCardOpen(true);//
  };

  const calculateBmi = () => {
    //bmi categories
    // Underweight = <18.5
    // Normal weight = 18.5–24.9
    // Overweight = 25–29.9
    // Obesity = BMI of 30 or greater
    let height = feet * 12 + parseInt(inches);
    let bmi = (weight / Math.pow(height, 2)) * 703;

    let bmiCategory = "";
    if (bmi <= 18.5) {
      bmiCategory = "Underweight";
    } else if (bmi <= 24.9 && bmi >= 18.5) {
      bmiCategory = "Normal weight";
    } else if (bmi <= 29.9 && bmi >= 25) {
      bmiCategory = "Overweight";
    } else if (bmi >= 30) {
      bmiCategory = "Obesity";
    }
    let resultMessage =
      "Your bmi is " +
      bmi.toFixed(1) +
      " and your bmi category is falls in " +
      bmiCategory;
    const additionalMessage =
      " Here is an article to tell you about bmi and your category ";
    setResult(resultMessage + additionalMessage);//
  };

  const closeResultCard = () => {//
    setWeight("");
    setFeet("");
    setInches("");
    setIsResultCardOpen(false);
  };

  return (
    <div className="container-xl w-full mx-auto my-8 p-20 rounded-md shadow-md p-4 border-2 border-gray-400">
      <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="weight" className="block text-sm font-medium">
            Weight:
          </label>
          <input
            type="number"
            id="weight"
            min="0"
            max="500"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="form-input mt-1 block w-full border-2 rounded-md p-2 text-white"
          />
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 mr-2">
            <label htmlFor="feet" className="block text-sm font-medium">
              Height (feet):
            </label>
            <input
              type="number"
              id="feet"
              min="1"
              max="8"
              value={feet}
              onChange={e => setFeet(e.target.value)}
              className="form-input mt-1 block w-full border-2 rounded-md p-2 text-white"
            />
          </div>

          <div className="w-1/2 ml-2">
            <label htmlFor="inches" className="block text-sm font-medium">
              Height (inches):
            </label>
            <input
              type="number"
              id="inches"
              min="0"
              max="11"
              value={inches}
              onChange={e => setInches(e.target.value)}
              className="form-input mt-1 block w-full border-2 rounded-md p-2 text-secondary"
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn-primary text-white py-2 px-4 rounded-md transition duration-300"
        >
          Calculate BMI
        </button>
      </form>

      {isResultCardOpen && (
        <ResultCard result={result} onClose={closeResultCard} />
      )}

      {/* {result && (
                <div className="mt-4 p-4 bg-green-100 rounded-md">
                  <p className="text-green-700">{result}</p>
                </div>
              )} */}
      {/* <CalorieCalculator/> */}
    </div>
  );
};

export default BmiCalculator;
