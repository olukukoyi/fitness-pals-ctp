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
const commentRoutes = require("./comments/route");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use(cookieParser());

const PORT = 8001;

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

// auth routes ( go to page ro view params )
app.post("/auth/login", authRoutes.userLogin); // login
app.post("/auth/signup", authRoutes.userSignUp); // signup
app.get("/auth/logout", authRoutes.userLogout); // logout ( no param)
// ------

// user routes
app.get("/user/:id", userRoutes.getUserDetails); // fetch user details
app.put("/user/update-cal-goal", userRoutes.updateCalGoal); // update cal goal , val is initial set to null
// ------

// workouts
app.get("/workout/:id", middleware, workoutRoutes.getUserWorkout); // fetch workouts
// ------

//posts
app.get("/posts/", postRoutes.getAllPost); // view all posts
app.get("/posts/beginner", postRoutes.getBeginnerPost);
app.get("/posts/advanced", postRoutes.getAdvancesDiscussionPost);
app.get("/posts/story-time", postRoutes.getStoryTimePost);
app.get("/posts/progress", postRoutes.getProgressPost);
app.get("/posts/off-topic", postRoutes.getOffTopicPosts);
app.post("/posts/add-post", postRoutes.createPost); // create post
// ------

//diary
app.get("/diary/:id", diaryRoutes.fetchAllDiaries); // view individual dairy
app.post("/diary/create-entry", diaryRoutes.createDiaryEntry); // create entry
app.delete("/diary/delete-entry", diaryRoutes.deleteDiary); // delete dairy//diary
// ----

//comments
app.post("/comments/create-entry", commentRoutes.createComment); // create entry
// ----
