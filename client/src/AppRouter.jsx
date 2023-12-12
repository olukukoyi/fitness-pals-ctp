import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Diary from "./components/Diary/Diary";
import Header from "./components/Header";
import Measure from "./components/Measure/Measure";
import Blog from "./components/Blog/Blog";
import NotFound from "./components/NotFound";

import Test from "./Test";

function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/measure" element={<Measure />} />
        <Route path="/test" element={<Test />} />

        <Route path="/blog/*" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;
