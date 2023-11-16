require("dotenv").config();
const express = require("express");
var cookieParser = require("cookie-parser");
const fetch = require("node-fetch");

const userRoutes = require("./users/route");
const workoutRoutes = require("../server/workout/route");
const authRoutes = require("../server/auth/route");
const middleware = require("../server/middleware/route");
const postRoutes = require("./post/route");

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 8000;

app.listen(PORT, () => {
  console.log("running on port 8000");
});

// auth routes
app.post("/auth/login", authRoutes.userLogin);
app.post("/auth/signup", authRoutes.userSignUp);
app.get("/auth/logout", authRoutes.userLogout);

// user routes
app.get("/user/:id", userRoutes.getUserDetails);

// workouts
app.get("/workout/:id", middleware, workoutRoutes.getUserWorkout);

//posts
app.get("/posts/", middleware, postRoutes.getAllPost);
app.get("/posts/beginner", middleware, postRoutes.getBeginnerPost);
app.get("/posts/a,odvanced", middleware, postRoutes.getAdvancesDiscussionPost);
app.get("/posts/story-time", middleware, postRoutes.getStoryTimePost);
app.get("/posts/progress", middleware, postRoutes.getProgressPost);
app.get("/posts/off-topic", middleware, postRoutes.getOffTopicPosts);
app.post("/posts/add-post", middleware, postRoutes.createPost);
