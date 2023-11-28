require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

const userRoutes = require("./users/route");
const workoutRoutes = require("../server/workout/route");
const authRoutes = require("../server/auth/route");
const middleware = require("../server/middleware/route");
const postRoutes = require("./post/route");
const diaryRoutes = require("./diary/route");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST"],
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use(cookieParser());

const PORT = 8001;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

// auth routes
app.post("/auth/login", authRoutes.userLogin);
app.post("/auth/signup", authRoutes.userSignUp);
app.get("/auth/logout", authRoutes.userLogout);
// ------

// user routes
app.get("/user/:id", userRoutes.getUserDetails);
// ------

// workouts
app.get("/workout/:id", middleware, workoutRoutes.getUserWorkout);
// ------

//posts
// app.get("/posts/", middleware, postRoutes.getAllPost);
app.get("/posts/", postRoutes.getAllPost);
app.get("/posts/beginner", middleware, postRoutes.getBeginnerPost);
app.get("/posts/advanced", middleware, postRoutes.getAdvancesDiscussionPost);
app.get("/posts/story-time", middleware, postRoutes.getStoryTimePost);
app.get("/posts/progress", middleware, postRoutes.getProgressPost);
app.get("/posts/off-topic", middleware, postRoutes.getOffTopicPosts);
app.post("/posts/add-post", middleware, postRoutes.createPost);
// ------

//diary
app.get("/diary/:id", diaryRoutes.fetchAllDiaries);
app.post("/diary/create-entry", diaryRoutes.createDiaryEntry);

// ----
