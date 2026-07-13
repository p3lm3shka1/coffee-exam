import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { GiCoffeeCup } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import { fetchProducts } from "../../api/products";
import { accessoriesItems } from "../../constants/categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import "./AccessoriesPage.scss";

const AccessoriesPage = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [activeSubcategory, setActiveSubcategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async (subcategory = "all") => {
    try {
      setLoading(true);
      setError("");
      const params = { category: "accessories", sort: "newest" };
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
      all: "accessories.all_products",
      brewing: "categories.brewing_equipment",
      grinders: "categories.grinders",
      filters: "categories.paper_filters",
    }),
    [],
  );

  return (
    <section className="accessories-page">
      <div className="accessories-page__wrapper">
        <Link to="/" className="accessories-page__backlink">
          {t("common.go_back")}
        </Link>

        <div className="accessories-page__hero">
          <h1 className="accessories-page__hero__title">
            {t("accessories.explore")}
          </h1>
          <p className="accessories-page__hero__subtitle">
            {t("accessories.discover")}
          </p>
        </div>

        <section className="accessories-page__cards">
          {accessoriesItems.map((item) => (
            <button
              type="button"
              key={item.subcategory}
              className={`accessories-page__cards__item ${
                activeSubcategory === item.subcategory ? "is-active" : ""
              }`}
              onClick={() => setActiveSubcategory(item.subcategory)}
            >
              <h2 className="accessories-page__cards__item__title">
                {t(item.labelKey)}
              </h2>
              <img
                src={item.image}
                alt={t(item.labelKey)}
                className="accessories-page__cards__item__image"
              />
            </button>
          ))}
        </section>

        <section className="accessories-page__products">
          <h2 className="accessories-page__products__title">
            {t(
              subcategoryTitleMap[activeSubcategory] ||
                "accessories.all_products",
            )}
          </h2>

          {loading && (
            <p className="accessories-page__loading">
              <GiCoffeeCup size={50} />
            </p>
          )}
          {error && <p className="accessories-page__error">{error}</p>}
          {!loading && !error && <ProductGrid products={products} />}
        </section>
      </div>
    </section>
  );
};

export default AccessoriesPage;
