import React, { useState } from 'react';
import CalorieCalculator from './CalorieCalculator';
import BmiCalculator from './BmiCalculator';

const Measure = () => {
  //let resultMessage = (`Weight: ${weight} kg, Height: ${feet}'${inches}, Activity level: ${activityLevel}`);
  
  return (
    <div className="mx-auto my-8 p-6 bg-white rounded-md drop-shaow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Measure Page</h2>
      <div className='flex flex-col md:flex-row'>
        <BmiCalculator/>
        <CalorieCalculator/>
      </div>
      </div>
  )
};

export default Measure;
