import { useTranslation } from "react-i18next";

const OrderSummary = ({ cartItems, total, loading, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <section className="checkout-page__right">
      <h2>{t("checkout.your_order")}</h2>

      <div className="checkout-page__items">
        {cartItems.map((item) => (
          <div className="checkout-page__item" key={item._id}>
            <span>{item.title}</span>
            <span>x{item.quantity || 1}</span>
            <span>
              €{(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="checkout-page__total">
        <span>{t("checkout.total")}</span>
        <strong>€{total.toFixed(2)}</strong>
      </div>

      <button
        type="button"
        className="checkout-page__submit"
        disabled={loading}
        onClick={onSubmit}
      >
        {loading ? t("payment.processing") : t("checkout.pay_now")}
      </button>
    </section>
  );
};

export default OrderSummary;
