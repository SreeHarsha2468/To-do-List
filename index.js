import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.routes.js";
import tasksRoutes from "./routes/tasksRoutes.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Failed", err));

app.use("/api/User", userRoutes);
app.use("/api/Tasks", tasksRoutes);

app.listen(port, () => console.log(`Server running on port ${port}...`));
