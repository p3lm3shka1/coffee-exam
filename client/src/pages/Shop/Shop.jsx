import { Link } from "react-router-dom";

import "./Shop.scss";

const Shop = () => {
  return (
    <section className="shop">
      <div className="shop__wrapper">
        <Link className="shop__backlink" to="/">
          Go Back
        </Link>
        <section className="shop__links">
          <Link className="shop__links__stuff" to="/coffeePage">
            Coffee
          </Link>
          <Link className="shop__links__stuff" to="/accessoriesPage">
            Accessories
          </Link>
        </section>
      </div>
    </section>
  );
};

export default Shop;
