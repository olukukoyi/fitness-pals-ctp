const prisma = require("../../server/prismadb");

const fetchAllDiaries = async (req, res) => {
  const id = req.params.id;

  console.log("ID: ", id);

  const diaries = await prisma.diary.findMany({
    where: { userUserId: id },
  });
  res.json({ diary: diaries });
};

const createDiaryEntry = async (req, res) => {
  const { calories, carb, fat, mealType, name, protein, servings, userId } =
    req.body;
  console.log(calories, carb, fat, mealType, name, protein, servings, userId);

  const newEntry = await prisma.diary.create({
    data: {
      calories,
      carb,
      fat,
      mealType,
      name,
      protein,
      servings,
      userUserId: userId,
    },
  });

  res.json({ newEntry: newEntry });
};

const diaryRoutes = {
  fetchAllDiaries,
  createDiaryEntry,
};

module.exports = diaryRoutes;
