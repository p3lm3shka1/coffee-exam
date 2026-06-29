import "./Espresso.scss";

const Espresso = () => {
  return (
    <section className="espresso">
      <div className="espresso__wrapper">
        <div className="espresso__hero">
          <h1 className="espresso__hero__title">Espresso Coffee</h1>
          <p className="espresso__hero__subtitle">
            Bold and rich, best enjoyed in small, concentrated doses or with
            milk. Our espresso blends are carefully crafted to provide a robust
            and satisfying flavor, perfect for any time of day.
          </p>
        </div>
        <div className="espresso__content">
          <h2 className="espresso__content__title">Our Espresso Selection</h2>
          <p className="espresso__content__description">
            Explore our range of espresso coffee options, each offering a unique
            flavor profile. Whether you prefer a smooth and mellow taste or a
            bold and robust experience, we have the perfect espresso blend for
            you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Espresso;
