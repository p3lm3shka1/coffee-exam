import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json({ items: cart?.items || [] });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.put("/", protect, async (req, res) => {
  try {
    const { items } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items },
      { upsert: true, new: true },
    );

    res.json(cart);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete("/", protect, async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items: [] },
      { new: true },
    );
    res.json({ message: "Cart cleared" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

export default router;
