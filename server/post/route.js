const getPost = (req, res) => {
  res.json({ message: "some post" });
};

const postRoutes = {
  getPost,
};

module.exports = postRoutes;
