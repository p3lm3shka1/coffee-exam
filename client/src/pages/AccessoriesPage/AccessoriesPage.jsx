import { Link } from "react-router-dom";

import { accessoriesItems } from "../../constants/categories";

import "./AccessoriesPage.scss";

const AccessoriesPage = () => {
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
          {accessoriesItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="accessories-page__cards__item"
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
            </Link>
          ))}
        </section>
      </div>
    </section>
  );
};

export default AccessoriesPage;
