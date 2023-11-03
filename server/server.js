const jwt = require("jsonwebtoken");
require("dotenv").config();

const express = require("express");
const userRoutes = require("./users/route");
const workoutRoutes = require("../server/workout/route");

const app = express();
app.use(express.json());

const PORT = 8000;

const authToken = (req, res, next) => {
  // req.headers["authorization"] looks like Bearer header
  const authHeader = req.headers["authorization"];
  console.log("authheader: ", req.headers);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("token is null");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("error when veifying");
      return res.sendStatus(403);
    }

    req.user = user; // set user on req obj
    console.log(req.user);
    next();
  });
};

app.listen(PORT, () => {
  console.log("running on port 8000");
});

// user

app.get("/user/login", userRoutes.userLogin);
app.get("/user/signup", userRoutes.signUp);

// post
app.get("/workout", authToken, workoutRoutes.getWorkout);
