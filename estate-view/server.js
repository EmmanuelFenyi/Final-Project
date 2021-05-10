const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
require("dotenv").config();

//connecting to database
require("./config/dbConnect");

const projectRoutes = require("./routers/projectRoutes");
const authRoutes = require("./routers/authRoutes");
const userRoutes = require("./routers/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/projects", projectRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app.listen(PORT, () =>
  console.log(`Server is up and running successfully on port: ${PORT}`)
);
