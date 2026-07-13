import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./Shop.scss";

const Shop = () => {
  const { t } = useTranslation();
  return (
    <section className="shop">
      <div className="shop__wrapper">
        <Link className="shop__backlink" to="/">
          {t("shop.go_back")}
        </Link>
        <section className="shop__links">
          <Link className="shop__links__stuff" to="/coffeePage">
            {t("shop.coffee")}
          </Link>
          <Link className="shop__links__stuff" to="/accessoriesPage">
            {t("shop.accessories")}
          </Link>
        </section>
      </div>
    </section>
  );
};

export default Shop;
