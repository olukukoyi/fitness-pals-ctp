import CalorieCalculator from "./CalorieCalculator";
import BmiCalculator from "./BmiCalculator";

const Measure = () => {
  //let resultMessage = (`Weight: ${weight} kg, Height: ${feet}'${inches}, Activity level: ${activityLevel}`);

  return (
    <div className="mx-auto my-8 p-6 rounded-md drop-shaow-lg">
      <h2 className="text-2xl font-bold mb-4">Measurements</h2>
      {/* <div className="container mx-auto p-8">
      <CalorieCalculator />
      <BmiCalculator />
    </div> */}
      <div className="flex flex-col md:flex-row">
        <BmiCalculator />
        <div className="divider divider-horizontal before:bg-info after:bg-info"></div>
        <CalorieCalculator />
      </div>
    </div>
  );
};

export default Measure;


/* Notes


i used containers for each component where i used mx-auto to center the containers.

used flex within the container on the components to shrink correctly when the page 
is minimized.

used grids within the components to evenly align some of the textboxes.
*/