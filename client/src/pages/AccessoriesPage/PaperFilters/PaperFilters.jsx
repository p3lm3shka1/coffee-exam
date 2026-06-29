import "./PaperFilters.scss";

const PaperFilters = () => {
  return (
    <section className="paper-filters">
      <div className="paper-filters__wrapper">
        <div className="paper-filters__hero">
          <h1 className="paper-filters__hero__title">Filter Coffee</h1>
          <p className="paper-filters__hero__subtitle">
            Enjoy the taste of coffee without the caffeine. Our filter blends
            are carefully crafted to provide a rich and satisfying flavor,
            perfect for any time of day.
          </p>
        </div>
        <div className="paper-filters__content">
          <h2 className="paper-filters__content__title">
            Our Filter Selection
          </h2>
          <p className="paper-filters__content__description">
            Explore our range of filter coffee options, each offering a unique
            flavor profile. Whether you prefer a smooth and mellow taste or a
            bold and robust experience, we have the perfect filter blend for
            you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaperFilters;
