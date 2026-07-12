import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../api/orders";

import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaApplePay,
  FaGooglePay,
  FaPaypal,
} from "react-icons/fa";

import "./Payment.scss";

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const token = user?.token || null;

  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardName: false,
    cardNumber: false,
    expiry: false,
    cvv: false,
  });

  const [selectedMethod, setSelectedMethod] = useState("apple-pay");
  const [loading, setLoading] = useState(false);

  const shippingAddress = JSON.parse(
    localStorage.getItem("shippingAddress") || "null",
  );

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handlePay = async (e) => {
    e.preventDefault();

    const nextErrors = {
      cardName: !form.cardName.trim(),
      cardNumber: !form.cardNumber.trim(),
      expiry: !form.expiry.trim(),
      cvv: !form.cvv.trim(),
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    if (!shippingAddress || !cartItems.length) return;

    if (!token) {
      navigate("/login");
      return;
    }

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        title: item.title,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
        image: item.image,
      })),
      shippingAddress,
      paymentMethod: selectedMethod || "mock-card",
      totalPrice: Number(total.toFixed(2)),
      isPaid: true,
      paidAt: new Date().toISOString(),
      status: "paid_mock",
    };

    try {
      setLoading(true);
      await createOrder(orderPayload, token);
      clearCart();
      localStorage.removeItem("shippingAddress");
      navigate("/order-success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="payment-page">
      <div className="payment-page__wrapper">
        <h1 className="payment-page__title">Payment</h1>

        <form className="payment-page__form" onSubmit={handlePay}>
          <div className="payment-page__logos">
            <FaCcVisa className="payment-page__logo payment-page__logo--visa" />
            <FaCcMastercard className="payment-page__logo payment-page__logo--mastercard" />
            <FaCcAmex className="payment-page__logo payment-page__logo--amex" />
            <FaCcDiscover className="payment-page__logo payment-page__logo--discover" />
            <FaApplePay className="payment-page__logo payment-page__logo--apple" />
            <FaGooglePay className="payment-page__logo payment-page__logo--google" />
            <FaPaypal className="payment-page__logo payment-page__logo--paypal" />
          </div>

          <div className="payment-page__fields">
            <input
              name="cardName"
              placeholder="Card holder"
              value={form.cardName}
              onChange={handleChange}
              className={errors.cardName ? "is-error" : ""}
            />
            <input
              name="cardNumber"
              placeholder="Card number"
              value={form.cardNumber}
              onChange={handleChange}
              className={errors.cardNumber ? "is-error" : ""}
            />

            <div className="payment-page__row">
              <input
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={handleChange}
                className={errors.expiry ? "is-error" : ""}
              />
              <input
                name="cvv"
                placeholder="CVV"
                value={form.cvv}
                onChange={handleChange}
                className={errors.cvv ? "is-error" : ""}
              />
            </div>
          </div>

          <p className="payment-page__alt-title">
            or try different payment methods
          </p>

          <div className="payment-page__alt-methods">
            <button
              type="button"
              className={`payment-page__alt-button ${selectedMethod === "apple-pay" ? "is-active" : ""}`}
              onClick={() => setSelectedMethod("apple-pay")}
            >
              <FaApplePay
                className="payment-page__alt-button--apple"
                size={42}
              />
            </button>

            <button
              type="button"
              className={`payment-page__alt-button ${selectedMethod === "google-pay" ? "is-active" : ""}`}
              onClick={() => setSelectedMethod("google-pay")}
            >
              <FaGooglePay
                className="payment-page__alt-button--google"
                size={42}
              />
            </button>

            <button
              type="button"
              className={`payment-page__alt-button ${selectedMethod === "paypal" ? "is-active" : ""}`}
              onClick={() => setSelectedMethod("paypal")}
            >
              <FaPaypal
                className="payment-page__alt-button--paypal"
                size={38}
              />
            </button>
          </div>

          <button
            className="payment-page__submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
