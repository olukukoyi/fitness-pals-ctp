const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();

const prisma = new PrismaClient();

const userLogin = async (req, res) => {
  // Auth User Above
  try {
    const email = req.body.email;
    const password = req.body.password;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      console.log("does not exist");
      res.json({ message: "email is wrong" });
    }

    if (!existingUser.password === password) {
      res.json({ error: "credentials error, plz check" });
    } else {
      const accessToken = jwt.sign(
        existingUser,
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: 500,
        }
      );
      res.json({ accessToken: accessToken, existingUser });
    }
  } catch (error) {
    console.log(error);
  }
};

const signUp = async (req, res) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: req.body.email,
    },
  });
  if (existingUser) {
    console.log("user exist");
    res.json({ message: "user exist" });
  } else {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      },
    });
    res.json(newUser);
  }
};

const userRoutes = {
  userLogin,
  signUp,
};

module.exports = userRoutes;
