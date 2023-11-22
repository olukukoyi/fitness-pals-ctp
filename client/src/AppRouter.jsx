import { Route, Routes} from "react-router-dom";
import Home from "./components/Home"
import Header from "./components/Header"

function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/diary" element={"diary component"}/> 
        <Route path="/dashboard" element={"dashboard component"}/>
        <Route path="/measure" element={"measure component"}/> 
        <Route path="*" element={"404 component"}/>
      </Routes>
    </>
  );
}

export default AppRouter;