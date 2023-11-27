import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Test() {
  const [currentUser, setCurrentUser] = useState(null);
  const LoginUser = async () => {
    const data = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You might need additional headers (e.g., authentication tokens) based on the API requirements
      },
      credentials: "include",
      body: JSON.stringify({
        email: "test",
        password: "password",
      }),
    });
    const res = await data.json();
    const token = res.accessToken;
    const userid = res.existingUser.userId;
    Cookies.set("accessToken", token);
    Cookies.set("userid", userid); //

    console.log(jwtDecode(token), userid);
    setCurrentUser(jwtDecode(token));
  };

  const LogOut = () => {
    Cookies.remove("accessToken");
    console.log("user Logged out");
    setCurrentUser(null);
    // YOU MUST REDIRECT REFRESH PAGE / REDIRECT USER
  };

  useEffect(() => {
    LoginUser();
  }, []);
  return (
    <div>
      {currentUser !== null ? (
        <div>
          <h1>Name : {currentUser?.user.name}</h1>
          <h1>Email : {currentUser?.user.email}</h1>
          <h2>Id : {currentUser?.user.userId}</h2>
          <button onClick={LogOut}>Log out</button>
        </div>
      ) : (
        <h1>not logged in</h1>
      )}
    </div>
  );
}

export default Test;
