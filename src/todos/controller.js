const pool = require("../../db");
const queries = require("./queries");

const gettodo = (req, res) => {
  pool.query(queries.getnotes, (error, results) => {
    if (error) {
      console.error("Fetch error:", error);
      return res.status(500).send("Database error");
    }
    res.status(200).json(results.rows);
  });
};

const addtodo = (req, res) => {
  const { content } = req.body;
  pool.query(queries.addnote, [content, false], (error, results) => {
    if (error) {
      console.error("Insert error", error);
      return res.status(500).send("Insert error");
    }
    res.status(201).json(results.rows[0]);
  });
};

const updatetodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { content, completed } = req.body;

  pool.query(queries.updatenote, [content, completed, id], (error, results) => {
    if (error) {
      console.error("Update error", error);
      return res.status(500).send("Update error");
    }
    res.status(201).json(results.rows[0]);
  });
};

const deletetodo = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.deletenote, [id], (error, results) => {
    if (error) {
      console.error("Delete error", error);
      return res.status(500).send("Delete error");
    }
    res.status(204).send();
  });
};

module.exports = {
  gettodo,
  addtodo,
  updatetodo,
  deletetodo,
};
