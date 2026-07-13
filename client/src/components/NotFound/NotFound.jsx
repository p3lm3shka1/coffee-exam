import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import notfoundLogo from "../../assets/logos/404.png";

import "./NotFound.scss";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="notfound">
      <img src={notfoundLogo} alt="Not Found" className="notfound__logo" />
      <h1 className="notfound__text">{t("notfound.message")}</h1>
      <Link to="/" className="notfound__link">
        {t("notfound.goBack")}
      </Link>
    </div>
  );
};

export default NotFound;
