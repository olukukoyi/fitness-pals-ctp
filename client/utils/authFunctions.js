import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
  try {
    const data = await fetch("http://localhost:8001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You might need additional headers (e.g., authentication tokens) based on the API requirements
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const res = await data.json();
    const token = res.accessToken;
    const userid = res.existingUser.userId;
    Cookies.set("accessToken", token);
    console.log(res);
    Cookies.set("userid", res.existingUser.userId);

    console.log(jwtDecode(token), userid);
    // setCurrentUser(jwtDecode(token));
  } catch (error) {
    console.log("ERROR: ", "hi");
  }
};

export const sinup = async (email, password) => {
  
};
