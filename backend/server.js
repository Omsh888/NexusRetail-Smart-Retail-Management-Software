// server.js
dotenv.config();
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Serve frontend build folder
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Handle any other route with React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Your API routes here...
// app.use('/api', yourApiRouter);

app.get("/api/health", (req, res) => res.json({ status: "OK" }));

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));
