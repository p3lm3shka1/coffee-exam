import "./Brewing.scss";

const Brewing = () => {
  return (
    <section className="brewing">
      <div className="brewing__wrapper">
        <div className="brewing__hero">
          <h1 className="brewing__hero__title">Brewing Methods</h1>
          <p className="brewing__hero__subtitle">
            Discover various brewing methods to enhance your coffee experience.
            Each method is carefully crafted to provide a rich and satisfying
            flavor, perfect for any time of day.
          </p>
        </div>
        <div className="brewing__content">
          <h2 className="brewing__content__title">Our Brewing Methods</h2>
          <p className="brewing__content__description">
            Explore our range of brewing methods, each offering a unique flavor
            profile. Whether you prefer a smooth and mellow taste or a bold and
            robust experience, we have the perfect brewing method for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Brewing;
