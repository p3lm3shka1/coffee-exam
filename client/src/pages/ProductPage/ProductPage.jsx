import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { HiOutlineShoppingCart, HiX } from "react-icons/hi";
import { GiCoffeeCup } from "react-icons/gi";

import notfoundLogo from "../../assets/logos/404.png";

import "./ProductPage.scss";

const ProductPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("lt") ? "lt" : "en";
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${id}?lang=${lang}`,
        );
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, lang]);

  const handleQuantityChange = (value) => {
    if (value >= 1) setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart(product, quantity);

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="product-page product-page--loading">
        <GiCoffeeCup size={50} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page product-page--error">
        <div className="error-content">
          <img src={notfoundLogo} alt="Not Found" className="error-logo" />
          <h1>{t("product.error_title")}</h1>
          <button className="error-button" onClick={() => navigate(-1)}>
            {t("product.go_back")}
          </button>
        </div>
      </div>
    );
  }

  const isCoffee = product.category === "coffee";
  const isInStock = product.inStock !== false;

  const title = product.title || "";
  const description = product.description || product.longDescription || "";

  return (
    <section className="product-page">
      <div className="product-page__wrapper">
        <button className="product-page__back" onClick={() => navigate(-1)}>
          {t("product.go_back")}
        </button>

        <div className="product-page__container">
          <div className="product-page__image-section">
            <div className="product-page__image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="product-page__image"
              />
            </div>
          </div>

          <div className="product-page__info-section">
            <div className="product-page__header">
              <h1 className="product-page__title">{title}</h1>
              {product.category && (
                <span className="product-page__category">
                  {t(`common.category_${product.category}`)}
                </span>
              )}
            </div>

            {isCoffee && (
              <p className="product-page__subtitle">
                {product.origin
                  ? t("product.subtitle_arabica_from", {
                      origin: product.origin,
                    })
                  : t("product.subtitle_arabica")}
              </p>
            )}

            <p className="product-page__description">{description}</p>

            {isCoffee &&
              (product.weight || product.origin || product.roastLevel) && (
                <div className="product-page__coffee-specs">
                  {product.weight && (
                    <div className="spec-item">
                      <strong>{t("product.weight")}:</strong>
                      <span>{product.weight}</span>
                    </div>
                  )}
                  {product.origin && (
                    <div className="spec-item">
                      <strong>{t("product.origin")}:</strong>
                      <span>{product.origin}</span>
                    </div>
                  )}
                  {product.roastLevel && (
                    <div className="spec-item">
                      <strong>{t("product.roast_level")}:</strong>
                      <span className="roast-badge">{product.roastLevel}</span>
                    </div>
                  )}
                </div>
              )}

            {product.specs && (
              <div className="product-page__specs">
                <h3>{t("product.specifications")}</h3>
                <ul>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="product-page__price">
              <span className="product-page__price-value">
                ${Number(product.price).toFixed(2)}
              </span>
            </div>

            <div className="product-page__actions">
              <div className="product-page__quantity">
                <div className="quantity-control">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="qty-btn"
                  >
                    &#x2212;
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    min="1"
                    max="99"
                    value={quantity}
                    onChange={(e) => {
                      const value = Math.min(
                        Math.max(Number(e.target.value), 1),
                        99,
                      );
                      handleQuantityChange(value);
                    }}
                    className="qty-input"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="qty-btn"
                  >
                    &#x002B;
                  </button>
                </div>
              </div>

              {!isInStock && (
                <>
                  <div className="product-page__out-of-stock">
                    {t("product.out_of_stock")}
                  </div>
                </>
              )}
              {isInStock && (
                <button
                  className="product-page__add-to-cart"
                  onClick={handleAddToCart}
                >
                  <HiOutlineShoppingCart size={20} />
                  {t("product.add_to_cart")}
                </button>
              )}
            </div>

            {showNotification && (
              <div className="product-page__notification">
                <div className="notification-content">
                  {t("product.added_to_cart", { count: quantity })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
