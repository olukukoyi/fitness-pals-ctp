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
  });
  console.log(userDetails);
  return res.json({ user: userDetails });
};

const userRoutes = { getUserDetails };

module.exports = userRoutes;
