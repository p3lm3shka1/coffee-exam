import "./Decaf.scss";

const Decaf = () => {
  return (
    <section className="decaf">
      <div className="decaf__wrapper">
        <div className="decaf__hero">
          <h1 className="decaf__hero__title">Decaf Coffee</h1>
          <p className="decaf__hero__subtitle">
            Enjoy the taste of coffee without the caffeine. Our decaf blends are
            carefully crafted to provide a rich and satisfying flavor, perfect
            for any time of day.
          </p>
        </div>
        <div className="decaf__content">
          <h2 className="decaf__content__title">Our Decaf Selection</h2>
          <p className="decaf__content__description">
            Explore our range of decaf coffee options, each offering a unique
            flavor profile. Whether you prefer a smooth and mellow taste or a
            bold and robust experience, we have the perfect decaf blend for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Decaf;
