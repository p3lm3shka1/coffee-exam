import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import articleRoute from "./routes/articleRoute.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://coffeeshop-exam.vercel.app"],
  }),
);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/articles", articleRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.listen(process.env.PORT, () => {
  console.log(`Using ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
