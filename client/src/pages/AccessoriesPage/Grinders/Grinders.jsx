import "./Grinders.scss";

const Grinders = () => {
  return (
    <section className="grinders">
      <div className="grinders__wrapper">
        <div className="grinders__hero">
          <h1 className="grinders__hero__title">Grinders</h1>
          <p className="grinders__hero__subtitle">
            Enjoy the taste of coffee without the caffeine. Our grinders are
            carefully crafted to provide a rich and satisfying flavor, perfect
            for any time of day.
          </p>
        </div>
        <div className="grinders__content">
          <h2 className="grinders__content__title">Our Grinder Selection</h2>
          <p className="grinders__content__description">
            Explore our range of grinders, each offering a unique grinding
            experience. Whether you prefer a fine grind for espresso or a coarse
            grind for French press, we have the perfect grinder for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Grinders;
