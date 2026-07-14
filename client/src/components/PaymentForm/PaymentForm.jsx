import { useTranslation } from "react-i18next";
import {
  FaCcMastercard,
  FaApplePay,
  FaGooglePay,
  FaPaypal,
} from "react-icons/fa";

const PaymentForm = ({ payment, errors, setPaymentField, agree, setAgree }) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("checkout.payment")}</h2>

      <div className="checkout-page__pay-methods">
        <button
          type="button"
          className={payment.method === "mastercard" ? "is-active" : ""}
          onClick={() => setPaymentField("method", "mastercard")}
        >
          <FaCcMastercard size={30} />
        </button>
        <button
          type="button"
          className={payment.method === "apple-pay" ? "is-active" : ""}
          onClick={() => setPaymentField("method", "apple-pay")}
        >
          <FaApplePay size={30} />
        </button>
        <button
          type="button"
          className={payment.method === "google-pay" ? "is-active" : ""}
          onClick={() => setPaymentField("method", "google-pay")}
        >
          <FaGooglePay size={30} />
        </button>
        <button
          type="button"
          className={payment.method === "paypal" ? "is-active" : ""}
          onClick={() => setPaymentField("method", "paypal")}
        >
          <FaPaypal size={30} />
        </button>
      </div>

      <div className="checkout-page__row two">
        <input
          placeholder={t("payment.card_holder")}
          value={payment.cardName}
          onChange={(e) => setPaymentField("cardName", e.target.value)}
          className={errors.cardName ? "is-error" : ""}
        />
        <input
          placeholder={t("payment.card_number")}
          value={payment.cardNumber}
          onChange={(e) => setPaymentField("cardNumber", e.target.value)}
          maxLength={16}
          className={errors.cardNumber ? "is-error" : ""}
        />
      </div>

      <div className="checkout-page__row three">
        <input
          placeholder={t("payment.expiryM")}
          value={payment.expiryMonth}
          onChange={(e) => setPaymentField("expiryMonth", e.target.value)}
          maxLength={2}
          className={errors.expiryMonth ? "is-error" : ""}
        />
        <input
          placeholder={t("payment.expiryY")}
          value={payment.expiryYear}
          onChange={(e) => setPaymentField("expiryYear", e.target.value)}
          maxLength={2}
          className={errors.expiryYear ? "is-error" : ""}
        />
        <input
          placeholder={t("payment.cvv")}
          value={payment.cvv}
          onChange={(e) => setPaymentField("cvv", e.target.value)}
          maxLength={3}
          className={errors.cvv ? "is-error" : ""}
        />
      </div>
    </>
  );
};

export default PaymentForm;
