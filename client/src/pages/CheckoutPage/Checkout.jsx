import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../api/orders";
import { API_URL } from "../../api/config";
import { useTranslation } from "react-i18next";

import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

import "./Checkout.scss";

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const token = user?.token || null;

  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")?.[0] || "",
    lastName: user?.name?.split(" ")?.slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    country: "Lithuania",
    city: "",
    region: "",
    street: "",
    postalCode: "",
    notes: "",
  });

  const [payment, setPayment] = useState({
    method: "apple-pay",
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const total = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const setPaymentField = (name, value) => {
    setPayment((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const next = {
      firstName: !form.firstName.trim(),
      lastName: !form.lastName.trim(),
      email: !form.email.trim(),
      phone: !form.phone.trim(),
      city: !form.city.trim(),
      street: !form.street.trim(),
      postalCode: !form.postalCode.trim(),
      cardName: !payment.cardName.trim(),
      cardNumber: !payment.cardNumber.trim(),
      expiryMonth: !payment.expiryMonth.trim(),
      expiryYear: !payment.expiryYear.trim(),
      cvv: !payment.cvv.trim(),
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const createGuestOrder = async (payload) => {
    const res = await fetch(`${API_URL}/api/orders/guest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Guest order failed");
    return res.json();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!cartItems.length) return;
    if (!validate()) return;

    const shippingAddress = {
      country: form.country,
      city: form.city,
      region: form.region,
      street: form.street,
      postalCode: form.postalCode,
      phone: form.phone,
      notes: form.notes,
    };

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        title: item.title,
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
        image: item.image,
      })),
      shippingAddress,
      paymentMethod: payment.method || "mock-card",
      totalPrice: Number(total.toFixed(2)),
      isPaid: true,
      paidAt: new Date().toISOString(),
      status: "paid_mock",
      customerName: `${form.firstName} ${form.lastName}`.trim(),
      customerEmail: form.email,
      customerPhone: form.phone,
      isGuest: !token,
    };

    try {
      setLoading(true);
      if (token) await createOrder(orderPayload, token);
      else await createGuestOrder(orderPayload);
      setTimeout(() => {
        clearCart();
        navigate("/order-success");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert(t("common.something_went_wrong"));
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <section className="checkout-page">
        <div className="checkout-page__empty">
          <h1>{t("checkout.title")}</h1>
          <p>{t("cart.empty")}</p>
          <Link to="/shop" className="checkout-page__back">
            {t("common.continue_shopping")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-page__wrapper">
        <h1 className="checkout-page__title">{t("checkout.title")}</h1>

        <form className="checkout-page__layout" onSubmit={onSubmit}>
          <div className="checkout-page__left">
            <CheckoutForm form={form} errors={errors} setField={setField} />
            <PaymentForm
              payment={payment}
              errors={errors}
              setPaymentField={setPaymentField}
              agree={agree}
              setAgree={setAgree}
            />
          </div>

          <OrderSummary
            cartItems={cartItems}
            total={total}
            loading={loading}
            onSubmit={onSubmit}
          />
        </form>
      </div>
    </section>
  );
};

export default Checkout;
