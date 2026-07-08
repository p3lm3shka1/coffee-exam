import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import { HiOutlineShoppingCart, HiX } from "react-icons/hi";
import { GiCoffeeCup } from "react-icons/gi";

import "./ProductPage.scss";

const ProductPage = () => {
  const { identifier } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // console.log(
        //   "Fetching from:",
        //   `${import.meta.env.VITE_API_URL}/api/products/${identifier}`,
        // );
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products/${identifier}`,
        );
        // console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        // console.log("Product data:", data);
        setProduct(data);
      } catch (error) {
        // console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (identifier) fetchProduct();
  }, [identifier]);

  const handleQuantityChange = (value) => {
    if (value >= 1) setQuantity(value);
  };

  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

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
          <h1>Oops! Product not found</h1>

          <button className="error-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

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

            <div className="product-page__rating">
              <div className="product-page__stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
              <span className="product-page__reviews">(42 reviews)</span>
            </div>

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

            <p className="product-page__description">
              {product.description || product.longDescription}
            </p>

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

            <div className="product-page__actions">
              <div className="product-page__quantity">
                <label htmlFor="quantity">Quantity:</label>
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
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
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

            <div className="product-page__features">
              <div className="feature">
                <p>Free shipping on orders over $50</p>
              </div>
              <div className="feature"></div>
              <div className="feature">
                <p>Secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
