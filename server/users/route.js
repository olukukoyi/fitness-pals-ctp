const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = require("../prismadb");

const getUserDetails = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const userDetails = await prisma.user.findUnique({
    where: {
      userId: id,
    },
    select: {
      email: true,
      userId: true,
      name: true,
      password: false,
      tagged: true,
      comments: true,
      Dairy: true,
      Measurements: true,
      Posts: true,
      workouts: true,
    },
  });
  console.log(userDetails);
  return res.json({ user: userDetails });
};

const updateCalGoal = async (req, res) => {
  const { id, goal } = req.body;
  console.log(id, goal);
  const updatedUser = await prisma.user.update({
    where: {
      userId: id,
    },
    data: {
      calGoal: goal,
    },
    select: {
      password: false,
      userId: true,
      email: true,
      name: true,
      calGoal: true,
    },
  });

  res.json({
    updatedUser: updatedUser,
  });
};

const userRoutes = { getUserDetails, updateCalGoal };

module.exports = userRoutes;
