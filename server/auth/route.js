const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = require("../prismadb");

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
      return res.json({ message: "email is wrong" });
    }

    if (existingUser.password !== password) {
      console.log("does not match");
      return res.json({ error: "password does not match" });
    } else {
      const { userId, name } = existingUser;
      const accessToken = jwt.sign(
        { userId, name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        { userId, name, existingUser },
        process.env.REFRESH_TOKEN_SECRET
      );
      res.cookie("access-token", accessToken, {
        maxAge: 900000,
      });

      res.cookie("refresh-token", refreshToken);
      res.cookie("user-id", userId);

      res.json({
        existingUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const userSignUp = async (req, res) => {
  console.log(req.body);
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

const userLogout = (req, res) => {
  res.cookie("access-token", "", {
    maxAge: 1,
  });
  res.cookie("refresh-token", "", {
    maxAge: 1,
  });
  res.cookie("user-id", "", {
    maxAge: 1,
  });
  res.redirect("/");
};

const authRoutes = {
  userLogin,
  userSignUp,
  userLogout,
};

module.exports = authRoutes;
