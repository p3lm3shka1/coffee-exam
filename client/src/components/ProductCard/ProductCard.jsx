import "./ProductCard.scss";

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const {
    title,
    price,
    image,
    inStock,
    category,
    subcategory,
    weight,
    origin,
    roastLevel,
    material,
    brand,
  } = product;

  const [showNotification, setShowNotification] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const isCoffee = category === "coffee";
  const isAccessories = category === "accessories";

  return (
    <section className="product-card">
      <img className="product-card__image" src={image} alt={title} />

      <div className="product-card__body">
        <p className="product-card__meta">
          {category} / {subcategory}
        </p>
        <h3 className="product-card__title">{title}</h3>

        {isCoffee && (
          <div className="product-card__details">
            {weight && (
              <span>
                {t("product.weight")}: {weight}
              </span>
            )}
            {origin && (
              <span>
                {t("product.origin")}: {origin}
              </span>
            )}
          </div>
        )}

        {isAccessories && (
          <div className="product-card__details">
            {material && (
              <span>
                {t("product.material")}: {material}
              </span>
            )}
            {brand && (
              <span>
                {t("product.brand")}: {brand}
              </span>
            )}
          </div>
        )}

        <div className="product-card__bottom">
          <strong>${price.toFixed(2)}</strong>
          <span
            className={`product-card__${inStock ? "in-stock" : "out-stock"}`}
          >
            {inStock ? t("product.in_stock") : t("product.out_of_stock")}
          </span>
        </div>
      </div>
      <div className="product-card__overlay">
        <Link
          className="product-card__overlay-link"
          to={`/products/${product._id}`}
        >
          {t("product.details")}
        </Link>
        <button
          className="product-card__overlay__add"
          onClick={handleAddToCart}
        >
          {t("product.add_to_cart")}
        </button>
      </div>
      {showNotification && (
        <div className="product-card__notification">
          <div className="notification-content">
            {t("product.added_to_cart", { count: 1 })}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductCard;
