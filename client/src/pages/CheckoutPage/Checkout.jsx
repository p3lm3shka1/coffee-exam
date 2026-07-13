import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

import "./Checkout.scss";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    country: false,
    city: false,
    address: false,
    zip: false,
  });

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

  const handleContinue = (e) => {
    e.preventDefault();

    const nextErrors = {
      name: !form.name.trim(),
      phone: !form.phone.trim(),
      country: !form.country.trim(),
      city: !form.city.trim(),
      address: !form.address.trim(),
      zip: !form.zip.trim(),
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    localStorage.setItem("shippingAddress", JSON.stringify(form));
    navigate("/payment");
  };

  if (!cartItems.length) {
    return (
      <section className="checkout-page">
        <div className="checkout-page__wrapper">
          <h1 className="checkout-page__title">{t("checkout.title")}</h1>
          <p className="checkout-page__empty">{t("checkout.empty_cart")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-page__wrapper">
        <h1 className="checkout-page__title">{t("checkout.title")}</h1>

        <div className="checkout-page__grid">
          <form className="checkout-page__form" onSubmit={handleContinue}>
            <h2 className="checkout-page__subtitle">
              {t("checkout.shipping_address")}
            </h2>

            <input
              name="name"
              placeholder={t("checkout.full_name")}
              value={form.name}
              onChange={handleChange}
              className={errors.name ? "is-error" : ""}
            />
            <input
              name="phone"
              placeholder={t("checkout.phone")}
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? "is-error" : ""}
            />
            <input
              name="country"
              placeholder={t("checkout.country")}
              value={form.country}
              onChange={handleChange}
              className={errors.country ? "is-error" : ""}
            />
            <input
              name="city"
              placeholder={t("checkout.city")}
              value={form.city}
              onChange={handleChange}
              className={errors.city ? "is-error" : ""}
            />
            <input
              name="address"
              placeholder={t("checkout.address")}
              value={form.address}
              onChange={handleChange}
              className={errors.address ? "is-error" : ""}
            />
            <input
              name="zip"
              placeholder={t("checkout.zip")}
              value={form.zip}
              onChange={handleChange}
              className={errors.zip ? "is-error" : ""}
            />

            <button type="submit">{t("checkout.continue_to_payment")}</button>
          </form>

          <aside className="checkout-page__summary">
            <h2 className="checkout-page__subtitle">
              {t("checkout.order_summary")}
            </h2>
            {cartItems.map((item) => (
              <div className="checkout-page__item" key={item._id}>
                <span>
                  {item.title} x {item.quantity || 1}
                </span>
                <span>
                  $
                  {(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="checkout-page__total">
              <strong>{t("checkout.total")}</strong>
              <strong>${total.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
