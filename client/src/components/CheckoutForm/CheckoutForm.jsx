import { useTranslation } from "react-i18next";

const CustomerForm = ({ form, errors, setField }) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("checkout.customer_info")}</h2>

      <div className="checkout-page__row two">
        <input
          placeholder={t("checkout.first_name")}
          value={form.firstName}
          onChange={(e) => setField("firstName", e.target.value)}
          className={errors.firstName ? "is-error" : ""}
        />
        <input
          placeholder={t("checkout.last_name")}
          value={form.lastName}
          onChange={(e) => setField("lastName", e.target.value)}
          className={errors.lastName ? "is-error" : ""}
        />
      </div>

      <input
        placeholder={t("checkout.email")}
        value={form.email}
        onChange={(e) => setField("email", e.target.value)}
        className={errors.email ? "is-error" : ""}
      />

      <input
        placeholder={t("checkout.phone")}
        value={form.phone}
        onChange={(e) => setField("phone", e.target.value)}
        className={errors.phone ? "is-error" : ""}
      />

      <div className="checkout-page__row two">
        <input
          placeholder={t("checkout.city")}
          value={form.city}
          onChange={(e) => setField("city", e.target.value)}
          className={errors.city ? "is-error" : ""}
        />
        <input
          placeholder={t("checkout.region")}
          value={form.region}
          onChange={(e) => setField("region", e.target.value)}
        />
      </div>

      <input
        placeholder={t("checkout.street")}
        value={form.street}
        onChange={(e) => setField("street", e.target.value)}
        className={errors.street ? "is-error" : ""}
      />

      <div className="checkout-page__row two">
        <input
          placeholder={t("checkout.postal_code")}
          value={form.postalCode}
          onChange={(e) => setField("postalCode", e.target.value)}
          className={errors.postalCode ? "is-error" : ""}
        />
        <input value={form.country} disabled />
      </div>
    </>
  );
};

export default CustomerForm;
