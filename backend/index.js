import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import dataRoutes from "./routes/dataRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);

app.get("/api/v1", (req, res) => {
  const uptime = process.uptime();
  const uptimeString = new Date(uptime * 1000).toISOString().substr(11, 8);
  const message = {
    message: "Welcome to Dalle API",
    "origin-allowed": ["http://localhost:8080"],
    health: "healthy",
    "running-for": uptimeString,
  };
  res.json(message);
});

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  res.on("finish", () => {
    console.log(`Response status: ${res.statusCode}`);
  });
  next();
});

app.use("/api/v1/data", dataRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to API",
  });
});

const startServer = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();
