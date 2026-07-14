export const createGuestOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      isPaid,
      paidAt,
      status,
      customerName,
      customerEmail,
      customerPhone,
      isGuest,
    } = req.body;
    const Order = require("../models/Orders.js");

    if (!orderItems?.length) {
      return res.status(400).json({ message: "No order items" });
    }

    if (!customerName || !customerEmail) {
      return res
        .status(400)
        .json({ message: "Customer name and email are required" });
    }

    const order = await Order.create({
      user: null,
      orderItems,
      shippingAddress: {
        ...shippingAddress,
        phone: customerPhone || shippingAddress?.phone || "",
      },
      paymentMethod: paymentMethod || "mock-card",
      totalPrice,
      isPaid: Boolean(isPaid),
      paidAt: paidAt || (isPaid ? new Date().toISOString() : null),
      status: status || "paid_mock",
      customerName,
      customerEmail,
      customerPhone: customerPhone || "",
      isGuest: isGuest ?? true,
    });

    res.status(201).json(order);
  } catch (e) {
    res
      .status(400)
      .json({ message: "Create guest order failed", error: e.message });
  }
};
