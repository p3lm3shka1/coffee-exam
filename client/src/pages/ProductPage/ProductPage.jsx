import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { HiOutlineShoppingCart, HiX } from "react-icons/hi";
import { GiCoffeeCup } from "react-icons/gi";

import Swiper from "../../components/Swiper/SwiperComponent";

import "./ProductPage.scss";

const ProductPage = () => {
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
          `${import.meta.env.VITE_API_URL}/api/products/${id}`,
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
  }, [id]);

  useEffect(() => {
    if (product?.title) {
      document.title = product.title + " | Coffee Explorer";
    }
  }, [product]);

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
          <GiCoffeeCup size={100} />
          <h1>Oops! Product not found</h1>
          <button className="error-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const isCoffee = product.category === "coffee";

  return (
    <section className="product-page">
      <div className="product-page__wrapper">
        <button className="product-page__back" onClick={() => navigate(-1)}>
          Go Back
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
              <h1 className="product-page__title">{product.title}</h1>
              {product.category && (
                <span className="product-page__category">
                  {product.category}
                </span>
              )}
            </div>
            <p className="product-page__subtitle">
              100% Arabica {product.origin && `from ${product.origin}`}
            </p>

            <p className="product-page__description">
              {product.description || product.longDescription}
            </p>

            {isCoffee &&
              (product.weight || product.origin || product.roastLevel) && (
                <div className="product-page__coffee-specs">
                  {product.weight && (
                    <div className="spec-item">
                      <strong>Weight:</strong>
                      <span>{product.weight}</span>
                    </div>
                  )}
                  {product.origin && (
                    <div className="spec-item">
                      <strong>Origin:</strong>
                      <span>{product.origin}</span>
                    </div>
                  )}
                  {product.roastLevel && (
                    <div className="spec-item">
                      <strong>Roast Level:</strong>
                      <span className="roast-badge">{product.roastLevel}</span>
                    </div>
                  )}
                </div>
              )}

            {product.specs && (
              <div className="product-page__specs">
                <h3>Specifications</h3>
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
              {product.originalPrice && (
                <span className="product-page__price-original">
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
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

              <button
                className="product-page__add-to-cart"
                onClick={handleAddToCart}
              >
                <HiOutlineShoppingCart size={20} />
                Add to Cart
              </button>
            </div>

            {product.inStock === false && (
              <div className="product-page__out-of-stock">Out of Stock</div>
            )}

            {showNotification && (
              <div className="product-page__notification">
                <div className="notification-content">
                  <HiX className="close-icon" />
                  Added {quantity} item(s) to cart!
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
