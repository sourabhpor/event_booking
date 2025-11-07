import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/database.js";
dotenv.config();
import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api", userRoute);
app.use("/api", eventRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
