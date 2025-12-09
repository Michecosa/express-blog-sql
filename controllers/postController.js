const posts = require("../data/posts");
const connection = require("../data/db");

const index = (req, res) => {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
};

const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Post not found" });
    res.json(results[0]);
  });
};

const store = (req, res) => {
  const { title, content, image, tags } = req.body;

  if (!title || !content || !image) {
    return res.status(400).json({
      error: true,
      message: "title, content e image sono obbligatori",
    });
  }

  if (tags && !Array.isArray(tags)) {
    return res.status(400).json({
      error: true,
      message: "tags deve essere un array.",
    });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    image,
    tags,
  };

  posts.push(newPost);

  return res.status(201).json(newPost);
};

const update = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      error: true,
      message: "Post non trovato",
    });
  }

  const { title, content, image, tags } = req.body;

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (image !== undefined) post.image = image;

  if (tags !== undefined) {
    if (!Array.isArray(tags)) {
      return res.status(400).json({
        error: true,
        message: "tags deve essere un array",
      });
    }
    post.tags = tags;
  }

  return res.json(post);
};

const destroy = (req, res) => {
  const sql = "DELETE FROM posts WHERE id = ?";
  const { id } = req.params;

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete post" });
    res.sendStatus(204);
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
