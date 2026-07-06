import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { fetchProducts } from "../../api/products";
import { coffeeItems, allCoffeeItem } from "../../constants/categories";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

import { GiCoffeeCup } from "react-icons/gi";

import "./CoffeePage.scss";

const CoffeePage = () => {
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
      setError(e.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(activeSubcategory);
  }, [activeSubcategory]);

  return (
    <section className="coffee-page">
      <div className="coffee-page__wrapper">
        <Link to="/" className="coffee-page__backlink">
          Go Back
        </Link>

        <div className="coffee-page__hero">
          <h1 className="coffee-page__hero__title">Explore Our Coffee</h1>
          <p className="coffee-page__hero__subtitle">
            Discover our selection of premium coffee blends.
          </p>
        </div>

        <section className="coffee-page__cards">
          {allCoffeeItem && (
            <button
              className={`coffee-page__cards__item ${activeSubcategory === "all" ? "is-active" : ""}`}
              onClick={() => setActiveSubcategory("all")}
            >
              <h2 className="coffee-page__cards__item__title">
                {allCoffeeItem.name}
              </h2>
              <img
                src={allCoffeeItem.image}
                alt={allCoffeeItem.name}
                className="coffee-page__cards__item__image"
              />
            </button>
          )}

          {coffeeItems.map((item) => (
            <button
              key={item.name}
              className={`coffee-page__cards__item ${
                activeSubcategory === item.subcategory ? "is-active" : ""
              }`}
              onClick={() => setActiveSubcategory(item.subcategory)}
            >
              <h2 className="coffee-page__cards__item__title">{item.name}</h2>
              <img
                src={item.image}
                alt={item.name}
                className="coffee-page__cards__item__image"
              />
              <p className="coffee-page__cards__item__description">
                {item.desc}
              </p>
            </button>
          ))}
        </section>

        <section className="coffee-page__products">
          <h2 className="coffee-page__products__title">
            {activeSubcategory === "all"
              ? "All Coffee Products"
              : `${activeSubcategory[0].toUpperCase() + activeSubcategory.slice(1)} Coffee`}
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
