import Cookies from "js-cookie";

import { jwtDecode } from "jwt-decode";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = async e => {
    e.preventDefault();

    const userCreds = { email, password };
    console.log(userCreds);
    try {
      const data = await fetch("http://localhost:8001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You might need additional headers (e.g., authentication tokens) based on the API requirements
        },
        credentials: "include",
        body: JSON.stringify(userCreds),
      });
      const res = await data.json();
      const token = res.accessToken;
      const userid = res.existingUser.userId;
      Cookies.set("accessToken", token);
      console.log(res);
      Cookies.set("userid", res.existingUser.userId);

      window.location = "/";

      console.log(jwtDecode(token), userid);
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };
  return (
    <>
      <label htmlFor="my_modal_6" className="btn btn-ghost px-10 ">
        Login
      </label>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="w-full p-6 m-auto lg:max-w-xl">
            <h1 className="text-3xl font-semibold text-center">Fitness Pals</h1>
            <form className="space-y-4">
              <div>
                <label className="label">
                  <span className="text-base label-text">Email</span>
                </label>
                <input
                  type="text"
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Email Address"
                  className="w-full input input-bordered"
                />
              </div>
              <div>
                <label className="label">
                  <span className="text-base label-text">Password</span>
                </label>
                <input
                  type="password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter Password"
                  className="w-full input input-bordered"
                />
              </div>
              <div className="my-10">
                <button
                  onClick={e => {
                    console.log("clicked");
                    LoginUser(e);
                  }}
                  className="btn btn-block my-5"
                >
                  Login
                </button>
              </div>
              <span>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Forgot Password ?
                </a>
              </span>
            </form>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
