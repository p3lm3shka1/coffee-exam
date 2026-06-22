import { Link } from "react-router-dom";

import Swiper from "../../components/Swiper/SwiperComponent";

import "./Home.scss";

const coffeeItems = [
  { id: 1, name: "Espresso Blend", price: "€12.99" },
  { id: 2, name: "Arabica Single Origin", price: "€15.99" },
  { id: 3, name: "Dark Roast", price: "€11.99" },
  { id: 4, name: "Cold Brew Mix", price: "€13.99" },
  { id: 5, name: "Light Roast", price: "€14.99" },
];

const accessoryItems = [
  { id: 1, name: "French Press", price: "€24.99" },
  { id: 2, name: "Coffee Grinder", price: "€49.99" },
  { id: 3, name: "Tamper Set", price: "€19.99" },
  { id: 4, name: "Moka Pot", price: "€29.99" },
  { id: 5, name: "Milk Frother", price: "€15.99" },
];

const Home = () => {
  return (
    <section className="home">
      <div className="home__wrapper">
        <div className="home__hero">
          <h1 className="home__hero__title">
            Welcome to Coffee <span>Explorer</span>
          </h1>
          <p className="home__hero__subtitle">
            Your daily caffeine provider discover blends, gear and more.
          </p>
          <Link to="/shop" className="home__hero__button">
            Explore Now
          </Link>
        </div>

        <div className="home__section">
          <h2 className="home__section__title">Our Coffee Blends</h2>
          <Swiper items={coffeeItems} />
        </div>

        <div className="home__section">
          <h2 className="home__section__title">Coffee Accessories</h2>
          <Swiper items={accessoryItems} />
        </div>
      </div>
    </section>
  );
};

export default Home;
