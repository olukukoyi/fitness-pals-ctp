// import { useState } from "react";
import { Link } from "react-router-dom";

function BlogNav() {
  //blog nav bar
  const topics = [
    "Storytime-Feed",
    "Progress-Feed",
    "Beginner-Feed",
    "Advanced-Feed",
    "OffTopic-Feed",
  ];
  return (
    //*Make sure that the flex works correctly when the page is shrunk */}

    <div className="navbar bg-base-300 flex flex-col md:flex-row items-center justify-evenly">
      {topics.map(item => {
        return (
          <Link
            key={item}
            to={`/blog/${item}`}
            className="btn ghost mb-2 lg:mb-0"
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
}

export default BlogNav;
