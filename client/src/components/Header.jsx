import Signup from "./Home/Signup";
import Login from "./Home/Login";
import { Link } from "react-router-dom";

import profileIcon from "./assets/no-profile-picture.png";
import Cookies from "js-cookie";

function Header() {
  const LogOut = () => {
    Cookies.remove("accessToken");
    console.log("user Logged out");

    Cookies.remove("accessToken");
    Cookies.remove("userid");

    window.location = "/";
    // YOU MUST REDIRECT REFRESH PAGE / REDIRECT USER
  };
  // pulls userid and renders on if cookie exists
  const userid = Cookies.get("userid");
  if (userid !== undefined) {
    return (
      <div className="navbar bg-primary text-white">
        <div className="flex-1 flex justify-evenly">
          <Link to={"/"} className="btn btn-ghost">
            Home
          </Link>
          <Link to={"/diary"} className="btn btn-ghost">
            Diary
          </Link>
          <Link to={"/blog"} className="btn btn-ghost">
            Blog
          </Link>
          <Link to={"/measure"} className="btn btn-ghost">
            Measure
          </Link>
        </div>
        <div className="dropdown dropdown-end flex-none text-black dark:text-white">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Profile" src={profileIcon} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a
                onClick={() => {
                  LogOut();
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost">
          Home
        </Link>
      </div>
      <div className="flex-none">
        <Login />
        <Signup />
      </div>
    </div>
  );
}

export default Header;
