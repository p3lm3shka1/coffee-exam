import "./ProductCard.scss";

import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
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
            {weight && <span>Weight: {weight}</span>}
            {origin && <span>Origin: {origin}</span>}
          </div>
        )}

        {isAccessories && (
          <div className="product-card__details">
            {material && <span>Material: {material}</span>}
            {brand && <span>Brand: {brand}</span>}
          </div>
        )}

        <div className="product-card__bottom">
          <strong>${price.toFixed(2)}</strong>
          <span
            className={`product-card__${inStock ? "in-stock" : "out-stock"}`}
          >
            {inStock ? "In stock" : "Out of stock"}
          </span>
        </div>
      </div>
      <div className="product-card__overlay">
        <Link
          className="product-card__overlay-link"
          to={`/products/${product._id}`}
        >
          Product Details
        </Link>
      </div>
    </section>
  );
};

export default ProductCard;
