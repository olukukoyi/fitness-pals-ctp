const prisma = require("../../server/prismadb");

const getUserWorkout = async (req, res) => {
  const id = req.params.id;

  const workouts = await prisma.workout.findMany({
    where: {
      ownerId: id,
    },
  });

  res.json({ workouts: workouts });
};

const workoutRoutes = {
  getUserWorkout,
};

module.exports = workoutRoutes;
