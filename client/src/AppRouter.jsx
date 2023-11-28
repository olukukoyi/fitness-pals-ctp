import { Route, Routes, Link } from "react-router-dom";

import NotFound from "./components/NotFound";
import Diary from "./components/Diary/Diary";
import Test from "./Test";

function AppRouter() {
  return (
    <>
      <header>
        this is a header (it'll stay static)
        <div className="btn-group">
          <Link to={"/"} className="btn">Home</Link>
          <Link to={"/diary"} className="btn">Diary</Link>
          <Link to={"/dashboard"} className="btn">Dashboard</Link>
          <Link to={"/measure"} className="btn">Measure</Link>
          <Link to={"/test"} className="btn">Test</Link>
        </div>
      </header>
      <Routes>
        <Route path="/" element={"home component"}/>
        <Route path="/diary" element={<Diary />}/> 
        <Route path="/dashboard" element={"dashboard component"}/>
        <Route path="/measure" element={"measure component"}/> 
        <Route path="/test" element={<Test />}/> 
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </>
  );
}

export default AppRouter;