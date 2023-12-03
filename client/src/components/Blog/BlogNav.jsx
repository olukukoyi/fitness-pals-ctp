// import { useState } from "react";
import { Link } from "react-router-dom";

function BlogNav() {
  const topics = [
    "Storytime-Feed",
    "Progress-Feed",
    "Beginner-Feed",
    "Advanced-Feed",
    "OffTopic-Feed",
  ];
  return (
    <div className="bg-red-600 w-full h-screen flex items-center justify-center flex-col space-y-10 ">
      {topics.map((item) => {
        return (
          <Link key={item} to={`/blog/${item}`}>
            {item}
          </Link>
        );
      })}
    </div>
  );
}

export default BlogNav;
