// import { useState } from "react";
import { Link } from "react-router-dom";

function BlogNav() {
  //blog nav bar
  const topics = ["storytime", "progress", "beginner", "advanced", "offtopic"];
  return (
    //*Make sure that the flex works correctly when the page is shrunk */}

    <div className="navbar flex justify-center bg-base-300">
      <div className="hidden md:flex w-full justify-evenly">
        {topics.map(item => {
          return (
            <Link
              key={item}
              to={`/blog/${item}-feed`}
              className="btn btn-secondary ghost mb-2 lg:mb-0"
            >
              {item}
            </Link>
          );
        })}
      </div>
      <div className="w-screen md:hidden">
        <details className="dropdown w-full">
          <summary className="m-1 btn btn-block btn-secondary">
            Blog Feeds
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
            {topics.map(item => {
              return (
                <li key={item}>
                  <Link to={`/blog/${item}`} className="ghost mb-2 lg:mb-0">
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      </div>
    </div>
  );
}

export default BlogNav;
