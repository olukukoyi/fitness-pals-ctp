const prisma = require("../../server/prismadb");

const getWorkout = async (req, res) => {
  const workouts = await prisma.workout.findMany();

  res.json({ workouts: workouts });
};

const workoutRoutes = {
  getWorkout,
};

module.exports = workoutRoutes;
