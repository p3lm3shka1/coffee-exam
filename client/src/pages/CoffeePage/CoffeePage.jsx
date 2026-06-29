import { Link } from "react-router-dom";

import { coffeeItems } from "../../constants/categories";

import "./CoffeePage.scss";

const CoffeePage = () => {
  return (
    <section className="coffee-page">
      <div className="coffee-page__wrapper">
        <Link to="/" className="coffee-page__backlink">
          Go Back
        </Link>
        <div className="coffee-page__hero">
          <h1 className="coffee-page__hero__title">Explore Our Coffee</h1>
          <p className="coffee-page__hero__subtitle">
            Discover our selection of premium coffee blends, carefully curated
            for the perfect cup.
          </p>
        </div>
        <section className="coffee-page__cards">
          {coffeeItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="coffee-page__cards__item"
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
            </Link>
          ))}
        </section>
      </div>
    </section>
  );
};

export default CoffeePage;
