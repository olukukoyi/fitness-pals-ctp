import { Route, Routes, Link } from "react-router-dom";

import NotFound from "./components/NotFound";
import Diary from "./components/Diary";
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
      <div className="flex w-full flex-col h-screen">
        <header>
          <div className="btn-group">
            <Link to={"/"} className="btn">
              Home
            </Link>
            <Link to={"/diary"} className="btn">
              Diary
            </Link>
            <Link to={"/dashboard"} className="btn">
              Dashboard
            </Link>
            <Link to={"/measure"} className="btn">
              Measure
            </Link>
            <Link to={"/test"} className="btn">
              Test
            </Link>
          </div>
        </header>
        <div className="flex w-full">
          <div className="w-[12%] h-screen">
            <BlogNav />
          </div>
          <Routes>
            <Route path="/" element={"home component"} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/dashboard" element={"dashboard component"} />
            <Route path="/measure" element={"measure component"} />
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
        </div>
      </div>
    </>
  );
}

export default AppRouter;
