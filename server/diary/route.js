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
  try {
    const {
      calories,
      carb,
      fat,
      mealType,
      name,
      protein,
      servings,
      userId,
      createdAt,
    } = req.body;
    console.log("RUNNING?");
    // console.log(calories, carb, fat, mealType, name, protein, servings, userId);

    if (createdAt !== null) {
      // if date was passed in , create diary with date
      const recievedDate = new Date(createdAt);
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
          createdAt: recievedDate,
        },
      });
      res.json({ newEntry: newEntry });
    } else {
      // if it is null , make a req without the date
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
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteDiary = async (req, res) => {
  const id = req.body.id;

  try {
    const deletedDiary = await prisma.diary.delete({
      where: {
        id: id,
      },
    });
    res.json({ deletedDiary: deletedDiary });
  } catch (err) {
    res.json({ error: err });
  }
};

const diaryRoutes = {
  fetchAllDiaries,
  createDiaryEntry,
  deleteDiary,
};

module.exports = diaryRoutes;
