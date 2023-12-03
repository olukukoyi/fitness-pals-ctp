import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Test() {
  const [currentUser, setCurrentUser] = useState(null);
  const LoginUser = async () => {
    try {
      const data = await fetch("http://localhost:8001/auth/login", {
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
      console.log(res);
      Cookies.set("userid", res.existingUser.userId);

      console.log(jwtDecode(token), userid);
      setCurrentUser(jwtDecode(token));
    } catch (error) {
      console.log("ERROR: ", "hi");
    }
  };

  const LogOut = () => {
    Cookies.remove("accessToken");
    console.log("user Logged out");
    setCurrentUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("userid");
    // YOU MUST REDIRECT REFRESH PAGE / REDIRECT USER
  };

  async function pullDiary() {
    const userid = Cookies.get("userid");
    const data = await fetch(`http://localhost:8001/diary/${userid}`, {
      credentials: "include",
    });
    const res = await data.json();
    console.log(res);
  }

  useEffect(() => {
    LoginUser();
    // pullDiary();
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
