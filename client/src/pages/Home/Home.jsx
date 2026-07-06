import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Swiper from "../../components/Swiper/SwiperComponent";
import { fetchProducts } from "../../api/products";

import { GiCoffeeCup } from "react-icons/gi";

import "./Home.scss";

const Home = () => {
  const [coffeeItems, setCoffeeItems] = useState([]);
  const [accessoryItems, setAccessoryItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coffee, accessories] = await Promise.all([
          fetchProducts({ category: "coffee" }),
          fetchProducts({ category: "accessories" }),
        ]);
        setCoffeeItems(coffee);
        setAccessoryItems(accessories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <GiCoffeeCup />
      </div>
    );
  }

  return (
    <section className="home">
      <div className="home__wrapper">
        <div className="home__hero">
          <h1 className="home__hero__title">
            Welcome to Coffee <span>Explorer</span>
          </h1>
          <p className="home__hero__subtitle">
            Your daily caffeine provider. Discover blends, gear, and more.
          </p>
          <div className="home__hero__buttons">
            <Link className="home__hero__button" to="/coffee">
              Coffee
            </Link>
            <Link className="home__hero__button" to="/accessories">
              Accessories
            </Link>
          </div>
        </div>

        <div className="home__section">
          <h2 className="home__section__title">Our Coffee Blends</h2>
          {coffeeItems.length > 0 && <Swiper items={coffeeItems} />}
        </div>

        <div className="home__section">
          <h2 className="home__section__title">Coffee Accessories</h2>
          {accessoryItems.length > 0 && <Swiper items={accessoryItems} />}
        </div>
      </div>
    </section>
  );
};

export default Home;
