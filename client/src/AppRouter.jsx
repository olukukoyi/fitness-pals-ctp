import { Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home"
import Header from "./components/Header"

import Test from "./Test";

function AppRouter() {
  return (
    <>
      <Header 
      loggedIn={false}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/diary" element={"diary component"}/> 
        <Route path="/dashboard" element={"dashboard component"}/>
        <Route path="/measure" element={"measure component"}/> 
        <Route path="/test" element={<Test />}/>
        <Route path="*" element={"404 component"}/>
      </Routes>
    </>
  );
}

export default AppRouter;