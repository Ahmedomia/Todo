const getnotes = "SELECT * FROM todos ORDER BY id";
const addnote =
  "INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *";
const updatenote = `
  UPDATE todos 
  SET title = COALESCE($1, title), completed = COALESCE($2, completed) 
  WHERE id = $3 
  RETURNING *`;
const deletenote = "DELETE FROM todos WHERE id = $1";

module.exports = {
  getnotes,
  addnote,
  updatenote,
  deletenote,
};
