import ProductCard from "../ProductCard/ProductCard";

import "./ProductGrid.scss";

const ProductGrid = ({ products = [] }) => {
  if (!products.length)
    return <p className="no-products">No products found.</p>;

  return (
    <section className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
