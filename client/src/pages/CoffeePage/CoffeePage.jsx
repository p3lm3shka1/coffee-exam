import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import { fetchProducts } from "../../api/products";
import { coffeeItems } from "../../constants/categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useTranslation } from "react-i18next";
import { GiCoffeeCup } from "react-icons/gi";

import "./CoffeePage.scss";

const CoffeePage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async (subcategory = "all") => {
    try {
      setLoading(true);
      setError("");

      const params = { category: "coffee", sort: "newest" };
      if (subcategory !== "all") params.subcategory = subcategory;

      const data = await fetchProducts(params);
      setProducts(data);
    } catch (e) {
      setError(e.message || t("common.something_went_wrong"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(activeSubcategory);
  }, [activeSubcategory]);

  const subcategoryTitleMap = useMemo(
    () => ({
      all: "coffee.all_products",
      espresso: "categories.espresso",
      filter: "categories.filter",
      decaf: "categories.decaf",
    }),
    [],
  );

  return (
    <section className="coffee-page">
      <div className="coffee-page__wrapper">
        <Link to="/" className="coffee-page__backlink">
          {t("common.go_back")}
        </Link>

        <div className="coffee-page__hero">
          <h1 className="coffee-page__hero__title">{t("coffee.explore")}</h1>
          <p className="coffee-page__hero__subtitle">{t("coffee.discover")}</p>
        </div>

        <section className="coffee-page__cards">
          {coffeeItems.map((item) => (
            <button
              type="button"
              key={item.subcategory}
              className={`coffee-page__cards__item ${
                activeSubcategory === item.subcategory ? "is-active" : ""
              }`}
              onClick={() => setActiveSubcategory(item.subcategory)}
            >
              <h2 className="coffee-page__cards__item__title">
                {t(item.labelKey)}
              </h2>
              <img
                src={item.image}
                alt={t(item.labelKey)}
                className="coffee-page__cards__item__image"
              />
            </button>
          ))}
        </section>

        <section className="coffee-page__products">
          <h2 className="coffee-page__products__title">
            {t(subcategoryTitleMap[activeSubcategory] || "coffee.all")}
          </h2>

          {loading && (
            <p className="coffee-page__loading">
              <GiCoffeeCup size={50} />
            </p>
          )}
          {error && <p className="coffee-page__error">{error}</p>}
          {!loading && !error && <ProductGrid products={products} />}
        </section>
      </div>
    </section>
  );
};

export default CoffeePage;
