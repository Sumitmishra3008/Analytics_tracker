const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./utils/db");
connectDB();
const router = require("./routes/event.routes");
const { swaggerSpec, swaggerUi, swaggerOptions } = require("./config/swagger");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));

// Swagger UI setup
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

// API routes
app.use("/api/events", router);

app.get("/", (req, res) => {
  res.send(`
    <h1>Analytics Tracker API</h1>
    <p>Welcome to the Analytics Tracker API!</p>
    <p><a href="/api-docs">📚 View API Documentation (Swagger UI)</a></p>
    <p><a href="/api-docs.json">📄 Download OpenAPI Specification (JSON)</a></p>
  `);
});

// Serve OpenAPI spec as JSON endpoint
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

module.exports = {
  app,
};
