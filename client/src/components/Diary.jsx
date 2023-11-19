import { useState } from "react";


function Diary() {
    // pull user food info from db of this shape

    const [foodArr, setFoodArr] = useState([
        [{ name: "Eggo Waffles", id: "1", calories: "90" }], // breakfast
        [{ name: "Kirkland Protein Bar", id: "2", calories: "180" }, { name: "Eggo Waffles", id: "1", calories: "90" }], // lunch
        [{}], // dinner
        [{}], // snacks
    ]);

    const titles = ["Breakfast", "Lunch", "Dinner", "Snacks"];

    return (
        <>
            <div className="">
                <div className="divider m-0"></div>
                <CalorieRemain />
                <div className="divider m-0"></div>
                {foodArr.map((innerArr, index) => (
                    <MealTable foodArr={innerArr} title={titles[index]} key={index} />
                ))}
            </div>
        </>
    )
}

function CalorieRemain() {
    //pull user data from db (using const for now)
    const calorieData = { goal: 2000, consumed: 543 }
    return (
        <div className="flex flex-col flex-center">
            <h3 className="font-bold text-lg">Calories Remaining</h3>
            <div className="stats">

                <div className="stat place-items-center">
                    <div className="stat-title">Goal</div>
                    <div className="stat-value">{calorieData.goal}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Consumed</div>
                    <div className="stat-value text-secondary">{calorieData.consumed}</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Remaining</div>
                    <div className="stat-value">{calorieData.goal - calorieData.consumed}</div>
                </div>

            </div>
        </div>
    )
}

function MealTable({ foodArr, title }) {

    function addMoreStuff() {
        // const newFoodArr = foodArr.map(innerArray => [...innerArray]);
        // newFoodArr[0].push("more stuff ");

        // setFoodArr(newFoodArr);
        // console.log('New Food Array:', newFoodArr);
        console.log("hello")
    }

    return (
        <ul className="menu bg-base-200 ">
            <li className="menu-title">{title}</li>
            {foodArr.map((foodObj, index) => (
                <FoodTableItem name={foodObj.name} id={foodObj.id} cal={foodObj.name} key={index} />
            ))}
            <button onClick={addMoreStuff} className="btn btn-neutral btn-outline">ADD FOOD</button>
        </ul>
    )
}

function FoodTableItem({ name, id, cal }) {
    return (
        <>
            <li className="" onClick={() => document.getElementById(`my_modal_${id}`).showModal()}>{name} - {id} - {cal}</li>
            <dialog id={`my_modal_${id}`} className="modal modal-bottom">
                <div className="modal-box h-screen">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h3 className="font-bold text-lg">{name} {id}</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                    <div className="flex justify-evenly">
                        <div className="radial-progress text-xs text-center text-cyan-500" style={{ "--value": 70 }} role="progressbar">Protein <br /> 70%</div>
                        <div className="radial-progress text-xs text-center text-rose-500" style={{ "--value": 70 }} role="progressbar">Carbs <br /> 70%</div>
                        <div className="radial-progress text-xs text-center text-teal-500" style={{ "--value": 70 }} role="progressbar">Fat <br /> 70%</div>
                    </div>

                </div>
            </dialog>
        </>

    )
}

export default Diary;