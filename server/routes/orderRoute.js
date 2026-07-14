import express from "express";
import Orders from "../models/Orders.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const order = await Orders.create({
    ...req.body,
    user: req.user._id,
  });
  res.status(201).json(order);
});

router.post("/guest", async (req, res) => {
  try {
    const order = await Orders.create({
      ...req.body,
      user: null,
      isGuest: true,
    });

    res.status(201).json(order);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Create guest order failed", error: e.message });
  }
});

router.get("/", protect, async (req, res) => {
  const orders = await Orders.find({ user: req.user._id });
  res.status(200).json(orders);
});

export default router;
