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
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Welcome to Our Fitness Blog</h1>
        <p className="text-gray-600">
          Explore the latest stories, tips, and discussions about fitness.
        </p>
      </div>

      {/* Navigation */}
      <BlogNav />

      {/* Content */}
      <div className="divider my-8"></div>

      <Routes>
        <Route path="/Storytime-Feed" element={<Storytime />} />
        <Route path="/Advanced-Feed" element={<Advancedfeed />} />
        <Route path="/Progress-Feed" element={<ProgressFeed />} />
        <Route path="/OffTopic-Feed" element={<OfftopicFeed />} />
        <Route path="/Beginner-Feed" element={<BeginnerFeed />} />
      </Routes>

      {/* Beautiful Divs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {/* Div 1 */}
        <div className="bg-blue-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Fitness Tips</h2>
          <p>
            Discover beginner - expert tips to enhance your workout routine.
          </p>
        </div>

        {/* Div 2 */}
        <div className="bg-green-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Nutrition Insights</h2>
          <p>
            Learn about the importance of nutrition for your fitness journey
            from others in the community.
          </p>
        </div>

        {/* Div 3 */}
        <div className="bg-purple-200 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-2">Community Stories</h2>
          <p>Read inspiring stories from our fitness community members.</p>
        </div>
      </div>
      <div className="divider"></div>
      {/* Call to Action */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Ready to Start Your Journey?
        </h2>
        <p className="text-gray-600">
          Join our community and embark on a healthier lifestyle today!
        </p>

        <div className="mt-12 text-center">
          <img
            src="/fitnesspals_Logo.png"
            alt="FitnessPals Logo"
            className="w-40 h-40 mx-auto rounded-full object-cover"
          />
        </div>
      </div>
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
