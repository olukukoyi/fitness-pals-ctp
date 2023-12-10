import { Route, Routes, BrowserRouter } from "react-router-dom";

import Advancedfeed from "./Advancedfeed";
import Storytime from "./Storytime";
import ProgressFeed from "./ProgressFeed";
import OfftopicFeed from "./OfftopicFeed";
import BeginnerFeed from "./BeginnerFeed";

import BlogNav from "./BlogNav";
// import UserDetails from "../Users/UserDetails";

function Blog() {
  return (
    <div>
      <BlogNav />
      <Routes>
        <Route path="/Storytime-Feed" element={<Storytime />} />
        <Route path="/Advanced-Feed" element={<Advancedfeed />} />
        <Route path="/Progress-Feed" element={<ProgressFeed />} />
        <Route path="/OffTopic-Feed" element={<OfftopicFeed />} />
        <Route path="/Beginner-Feed" element={<BeginnerFeed />} />
      </Routes>
    </div>
  );
}

export default Blog;
