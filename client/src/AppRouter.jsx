import { Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import Diary from "./components/Diary/Diary";
import Header from "./components/Header";
import Measure from "./components/Measure/Measure";
import NotFound from "./components/NotFound";

import Test from "./Test";

import Advancedfeed from "./components/Blog/Advancedfeed";
import BlogNav from "./components/Blog/BlogNav";
import Storytime from "./components/Blog/Storytime";
import UserDetails from "./components/Users/UserDetails";
import ProgressFeed from "./components/Blog/ProgressFeed";
import OfftopicFeed from "./components/Blog/OfftopicFeed";
import BeginnerFeed from "./components/Blog/BeginnerFeed";

function AppRouter() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/dashboard" element={"dashboard component"} />
        <Route path="/measure" element={<Measure />} />
        <Route path="/test" element={<Test />} />
        <Route path="/user/:id" element={<UserDetails />} />
        {/* blog */}
        <Route path="/blog/Storytime-Feed" element={<Storytime />} />
        <Route path="/blog/Advanced-Feed" element={<Advancedfeed />} />
        <Route path="/blog/Progress-Feed" element={<ProgressFeed />} />
        <Route path="/blog/OffTopic-Feed" element={<OfftopicFeed />} />
        <Route path="/blog/Beginner-Feed" element={<BeginnerFeed />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRouter;
