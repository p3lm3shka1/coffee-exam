import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GiCoffeeCup } from "react-icons/gi";

import "./NotFound.scss";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="notfound">
      <GiCoffeeCup className="notfound__icon" />
      <h1 className="notfound__text">{t("notfound.message")}</h1>
      <Link to="/" className="notfound__link">
        {t("notfound.goBack")}
      </Link>
    </div>
  );
};

export default NotFound;
