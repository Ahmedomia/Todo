const getnotes = `
  SELECT id, title, completed
  FROM todos
  WHERE is_active = true
`;

const addnote = `
  INSERT INTO todos (title, completed, is_active)
  VALUES ($1, $2, true)
  RETURNING id, title, completed, is_active
`;

const updatenote = `
  UPDATE todos
  SET title = $1, completed = $2
  WHERE id = $3
  RETURNING id, title, completed, is_active
`;

const deletenote = `
  UPDATE todos
  SET is_active = false
  WHERE id = $1
`;

const restorenote = `
  UPDATE todos
  SET is_active = true
  WHERE id = $1
`;

module.exports = {
  getnotes,
  addnote,
  updatenote,
  deletenote,
  restorenote,
};
