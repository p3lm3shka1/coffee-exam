import { Link } from "react-router-dom";

import "./CoffeePage.scss";

const coffeeItems = [
  {
    name: "Espresso",
    image: espressoImage,
    desc: "Bold and rich, best enjoyed in small, concentrated doses or with milk.",
    link: "/coffee/espresso",
  },
  {
    name: "Filter",
    image: filterImage,
    desc: "Smooth and balanced, ideal for a relaxing coffee break.",
    link: "/coffee/filter",
  },
  {
    name: "Decaf",
    image: decafImage,
    desc: "Enjoy the taste of coffee without the caffeine.",
    link: "/coffee/decaf",
  },
];

import espressoImage from "../../assets/logos/espresso-logo.png";
import filterImage from "../../assets/logos/filter-logo.png";
import decafImage from "../../assets/logos/decaf-logo.png";

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
