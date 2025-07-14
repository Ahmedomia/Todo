const express = require("express");
const path = require("path");
const todosRoutes = require("./src/todos/routes");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
  })
);

app.use(express.json());

app.use("/api/v1/todos", todosRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
