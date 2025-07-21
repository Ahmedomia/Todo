const express = require("express");
const path = require("path");
const todosRoutes = require("./src/todos/routes");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 5000;


dotenv.config();


app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  })
);

app.use(express.json());

app.use("/api/v1/todos", require("./src/todos/routes"));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
