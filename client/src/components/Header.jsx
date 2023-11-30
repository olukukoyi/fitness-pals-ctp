import React from 'react'
import Signup from './Home/Signup'
import Login from './Home/Login'
import { Link }  from "react-router-dom" 

function Header( props ) {
    if (props.loggedIn){
        return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost">Home</Link>
                <Link to={"/diary"} className="btn btn-ghost">Diary</Link>
                <Link to={"/dashboard"} className="btn btn-ghost">Dashboard</Link>
                <Link to={"/measure"} className="btn btn-ghost">Measure</Link>
            </div>
            <div className="dropdown dropdown-end flex-none">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img alt="Profile" src="" />
                </div>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                    <a className="justify-between">
                    Profile
                    </a>
                </li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
        )
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost">Home</Link>
            </div>
            <div className="flex-none">
                <Login />
                <Signup />
            </div>
        </div>
    )
}

export default Header