const prisma = require("../../server/prismadb");

const fetchAllDiaries = async (req, res) => {
  const id = req.params.id;

  const diaries = await prisma.diary.findMany({
    where: { userUserId: id },
  });

  res.json({ diary: diaries });
};

const diaryRoutes = {
  fetchAllDiaries,
};

module.exports = diaryRoutes;
