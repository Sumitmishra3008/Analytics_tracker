const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./utils/db");
connectDB();
const router = require("./routes/event.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/events", router);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = {
  app,
};
