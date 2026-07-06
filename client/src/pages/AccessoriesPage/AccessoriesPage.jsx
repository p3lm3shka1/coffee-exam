import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GiCoffeeCup } from "react-icons/gi";

import { fetchProducts } from "../../api/products";
import {
  accessoriesItems,
  allAccessoriesItem,
} from "../../constants/categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import "./AccessoriesPage.scss";

const AccessoriesPage = () => {
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
      setError(e.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(activeSubcategory);
  }, [activeSubcategory]);

  return (
    <section className="accessories-page">
      <div className="accessories-page__wrapper">
        <Link to="/" className="accessories-page__backlink">
          Go Back
        </Link>

        <div className="accessories-page__hero">
          <h1 className="accessories-page__hero__title">
            Explore Our Accessories
          </h1>
          <p className="accessories-page__hero__subtitle">
            Discover our selection of premium coffee accessories, carefully
            curated for the perfect cup.
          </p>
        </div>

        <section className="accessories-page__cards">
          {allAccessoriesItem && (
            <button
              type="button"
              className={`accessories-page__cards__item ${activeSubcategory === "all" ? "is-active" : ""}`}
              onClick={() => setActiveSubcategory("all")}
            >
              <h2 className="accessories-page__cards__item__title">
                {allAccessoriesItem.name}
              </h2>
              <img
                src={allAccessoriesItem.image}
                alt={allAccessoriesItem.name}
                className="accessories-page__cards__item__image"
              />
            </button>
          )}

          {accessoriesItems.map((item) => (
            <button
              type="button"
              key={item.name}
              className={`accessories-page__cards__item ${
                activeSubcategory === item.subcategory ? "is-active" : ""
              }`}
              onClick={() => setActiveSubcategory(item.subcategory)}
            >
              <h2 className="accessories-page__cards__item__title">
                {item.name}
              </h2>
              <img
                src={item.image}
                alt={item.name}
                className="accessories-page__cards__item__image"
              />
              <p className="accessories-page__cards__item__description">
                {item.desc}
              </p>
            </button>
          ))}
        </section>

        <section className="accessories-page__products">
          <h2 className="accessories-page__products__title">
            {activeSubcategory === "all"
              ? "All Accessories"
              : `${activeSubcategory[0].toUpperCase() + activeSubcategory.slice(1)} Accessories`}
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
