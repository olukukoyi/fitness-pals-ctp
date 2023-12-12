import { Route, Routes, useLocation } from "react-router-dom";
import Advancedfeed from "./Advancedfeed";
import Storytime from "./Storytime";
import ProgressFeed from "./ProgressFeed";
import OfftopicFeed from "./OfftopicFeed";
import BeginnerFeed from "./BeginnerFeed";

import BlogNav from "./BlogNav";

import InfoCards from "./InfoCards";
import { useEffect, useState } from "react";

function Blog() {
  const [isHome, setIsHome] = useState(true);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    setIsHome(location.pathname === "/blog");
  }, [location]);

  return (
    <div className="">
      {/* Navigation */}
      <BlogNav />

      {/* Header */}
      {isHome ? (
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold">Welcome to Our Fitness Blog</h1>
          <p className="text-gray-600">
            Explore the latest stories, tips, and discussions about fitness.
          </p>
        </div>
      ) : (
        ""
      )}

      {/* Content */}
      <Routes>
        <Route path="/Storytime-Feed" element={<Storytime />} />
        <Route path="/Advanced-Feed" element={<Advancedfeed />} />
        <Route path="/Progress-Feed" element={<ProgressFeed />} />
        <Route path="/OffTopic-Feed" element={<OfftopicFeed />} />
        <Route path="/Beginner-Feed" element={<BeginnerFeed />} />
      </Routes>

      {/* load depending on if we're on /blog */}
      {isHome ? <InfoCards /> : ""}
    </div>
  );
}
// don't know if to keep the page like this or to revert it back to being empty since
// it will display the bottom of the blog page at the bottom of every feed page

/* //   return (
  );
};
//     <div>
//       <div className="divider m-0"></div>
//       <BlogNav />
//       <Routes>
//         <Route path="/Storytime-Feed" element={<Storytime />} />
//         <Route path="/Advanced-Feed" element={<Advancedfeed />} />
//         <Route path="/Progress-Feed" element={<ProgressFeed />} />
//         <Route path="/OffTopic-Feed" element={<OfftopicFeed />} />
//         <Route path="/Beginner-Feed" element={<BeginnerFeed />} />
//       </Routes>
//     </div>
//   );
// } */

export default Blog;
