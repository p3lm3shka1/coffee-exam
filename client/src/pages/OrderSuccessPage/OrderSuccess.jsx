import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./OrderSuccess.scss";

const OrderSuccess = () => {
  const { t } = useTranslation();
  return (
    <section className="order-success">
      <div className="order-success__wrapper">
        <h1 className="order-success__title">{t("orderSuccess.title")}</h1>
        <p className="order-success__text">{t("orderSuccess.text")}</p>
        <Link to="/" className="order-success__button">
          {t("orderSuccess.back_home")}
        </Link>
      </div>
    </section>
  );
};

export default OrderSuccess;
