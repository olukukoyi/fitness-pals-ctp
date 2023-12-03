const prisma = require("../prismadb");

const getAllPost = async (req, res) => {
  const allPost = await prisma.post.findMany();
  res.json({ post: allPost });
};

const getStoryTimePost = async (req, res) => {
  const storyTimes = await prisma.post.findMany({
    where: { topic: "Story-Time" },
    include: {
      User: {
        select: {
          userId: true,
          email: true,
          name: true,
        },
      },
    },
  });
  res.json({ storytimes: storyTimes });
};
const getProgressPost = async (req, res) => {
  const progressPost = await prisma.post.findMany({
    where: { topic: "Progress" },
    include: {
      User: {
        select: {
          userId: true,
          email: true,
          name: true,
        },
      },
    },
  });
  res.json({ progressPosts: progressPost });
};
const getBeginnerPost = async (req, res) => {
  const beginnerPost = await prisma.post.findMany({
    where: { topic: "Beginner-Discussion" },
    include: {
      User: {
        select: {
          userId: true,
          email: true,
          name: true,
        },
      },
    },
  });
  res.json({ beginnerPost: beginnerPost });
};
const getAdvancesDiscussionPost = async (req, res) => {
  const advancedPosts = await prisma.post.findMany({
    where: { topic: "Advanced-Discussion" },
    include: {
      User: {
        select: {
          userId: true,
          email: true,
          name: true,
        },
      },
    },
  });
  res.json({ advancedPosts: advancedPosts });
};
const getOffTopicPosts = async (req, res) => {
  const offTopicPosts = await prisma.post.findMany({
    where: { topic: "Off-Topic" },
    include: {
      User: {
        select: {
          userId: true,
          email: true,
          name: true,
        },
      },
    },
  });
  console.log(offTopicPosts);
  res.json({ getOffTopicPosts: offTopicPosts });
};

const createPost = async (req, res) => {
  const { title, body, ownerId, topic } = req.body;
  console.log(title, body, ownerId, topic);
  const newPost = await prisma.post.create({
    data: {
      title,
      body,
      ownerId,
      topic,
    },
  });
  console.log(newPost);
  res.json({ newPost: newPost });
};

const postRoutes = {
  getAllPost,
  getStoryTimePost,
  getProgressPost,
  getBeginnerPost,
  getAdvancesDiscussionPost,
  getOffTopicPosts,
  createPost,
};

module.exports = postRoutes;
