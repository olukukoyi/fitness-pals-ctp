const prisma = require("../prismadb");

const createComment = async (req, res) => {
  const { content, postId, ownerId, taggedUserId } = req.body;

  const newComment = await prisma.comment.create({
    data: {
      content,
      postId,
      ownerId,
      taggedUserId,
    },
  });
  res.json({ comment: newComment });
};

const commentRoutes = { createComment };

module.exports = commentRoutes;
