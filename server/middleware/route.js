const jwt = require("jsonwebtoken");

const verifyAuthToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  console.log("authheader: ", req.headers);
  console.log("token: ", accessToken);

  if (accessToken == null || accessToken == undefined) {
    console.log("token is null");
    return res.sendStatus(401);
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        // console.log("generating new token using refresh token....");
        // const refreshToken = req.cookies["refresh-token"];
        // const data = await fetch("http://localhost:8000/users/token", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ refreshToken: refreshToken }),
        // });

        // console.log(data);
        console.log("error validating token");

        return res.sendStatus(403);
      }
      req.user = user; // set user on req obj
      console.log(req.user);
      next();
    }
  );
};

module.exports = verifyAuthToken;
