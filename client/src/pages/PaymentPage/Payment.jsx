import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../api/orders";
import { useTranslation } from "react-i18next";

import { FaApplePay, FaGooglePay, FaPaypal } from "react-icons/fa";

import paymentImage from "../../assets/logos/payments.png";

import "./Payment.scss";

const Payment = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const token = user?.token || null;

  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardName: false,
    cardNumber: false,
    expiryMonth: false,
    expiryYear: false,
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
      expiryMonth: !form.expiryMonth.trim(),
      expiryYear: !form.expiryYear.trim(),
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
        <h1 className="payment-page__title">{t("payment.title")}</h1>

        <form className="payment-page__form" onSubmit={handlePay}>
          <div className="payment-page__image">
            <img src={paymentImage} alt="Payment Methods" />
          </div>
          <div className="payment-page__fields">
            <input
              name="cardName"
              placeholder={t("payment.card_holder")}
              value={form.cardName}
              onChange={handleChange}
              className={errors.cardName ? "is-error" : ""}
            />

            <input
              name="cardNumber"
              placeholder={t("payment.card_number")}
              value={form.cardNumber}
              onChange={handleChange}
              maxLength={16}
              inputMode="numeric"
              className={errors.cardNumber ? "is-error" : ""}
            />

            <div className="payment-page__row">
              <input
                name="expiryMonth"
                placeholder={t("payment.expiryM")}
                value={form.expiryMonth}
                onChange={handleChange}
                maxLength={2}
                inputMode="numeric"
                className={errors.expiryMonth ? "is-error" : ""}
              />

              <input
                name="expiryYear"
                placeholder={t("payment.expiryY")}
                value={form.expiryYear}
                onChange={handleChange}
                maxLength={2}
                inputMode="numeric"
                className={errors.expiryYear ? "is-error" : ""}
              />

              <input
                name="cvv"
                placeholder={t("payment.cvv")}
                value={form.cvv}
                onChange={handleChange}
                maxLength={3}
                inputMode="numeric"
                className={errors.cvv ? "is-error" : ""}
              />
            </div>
          </div>

          <p className="payment-page__alt-title">{t("payment.alt_title")}</p>

          <div className="payment-page__alt-methods">
            <button
              type="button"
              className={`payment-page__alt-button ${selectedMethod === "apple-pay" ? "is-active" : ""}`}
              onClick={() => setSelectedMethod("apple-pay")}
            >
              <FaApplePay
                className="payment-page__alt-button--apple"
                size={30}
              />
            </button>

            <button
              type="button"
              className={`payment-page__alt-button ${selectedMethod === "google-pay" ? "is-active" : ""}`}
              onClick={() => setSelectedMethod("google-pay")}
            >
              <FaGooglePay
                className="payment-page__alt-button--google"
                size={30}
              />
            </button>

            <button
              type="button"
              className={`payment-page__alt-button ${selectedMethod === "paypal" ? "is-active" : ""}`}
              onClick={() => setSelectedMethod("paypal")}
            >
              <FaPaypal
                className="payment-page__alt-button--paypal"
                size={30}
              />
            </button>
          </div>

          <button
            className="payment-page__submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? t("payment.processing")
              : t("payment.pay", { total: total.toFixed(2) })}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
