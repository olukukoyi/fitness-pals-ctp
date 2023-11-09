import { Route, Routes, Link } from "react-router-dom";

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
        </div>
      </header>
      <Routes>
        <Route path="/" element={"home component"}/>
        <Route path="/diary" element={"diary component"}/> 
        <Route path="/dashboard" element={"dashboard component"}/>
        <Route path="/measure" element={"measure component"}/> 
        <Route path="*" element={"404 component"}/>
      </Routes>
    </>
  );
}

export default AppRouter;