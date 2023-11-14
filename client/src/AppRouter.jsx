import { Route, Routes, Link } from "react-router-dom";


function Measure(){
  
    let height = '',
    weight = '',
    activityLevel ='sedentary';
  


  const handleSubmit = (e) => {
    e.preventDefault();
    // calculations happen here
    console.log(height + " - " + weight + " - " + activityLevel);
  };

  return (
    <div>
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Height (cm):
          <input type="number" 
          placeholder="Enter height here" 
          value={height}
          required
          className="input input-bordered w-full max-w-xs" 
          />
        </label>

        <label>
          Weight (kg):
          <input type="number" 
          name="weight"
          value={weight}
          required
          className="input input-bordered w-full max-w-xs" 
          />
        </label>

        <label>
          Activity Level:
          <select
            name="activityLevel"
            value={activityLevel}
            required
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
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
              Super Active (very hard exercise/sports & physical job or 2x training)
            </option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


function AppRouter() {
  return (
    <>
      <header>
        this is a header (it'll stay static)
        <div className="btn-group">
          <Link to={"/"} className="btn">Home</Link>
          <Link to={"/diary"} className="btn">Diary</Link>
          <Link to={"/dashboard"} className="btn">Dashboard</Link>
          <Link to={"/measure"} className="btn"><Measure/></Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={"home component"}/>
        <Route path="/diary" element={"diary component"}/> 
        <Route path="/dashboard" element={"dashboard component"}/>
        <Route path="/measure" element={<Measure/>}/> 
        <Route path="*" element={"404 component"}/>
      </Routes>
    </>
  );
}

export default AppRouter;
