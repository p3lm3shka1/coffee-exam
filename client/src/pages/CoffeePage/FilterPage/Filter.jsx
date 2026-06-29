import "./Filter.scss";

const Filter = () => {
  return (
    <section className="filter">
      <div className="filter__wrapper">
        <div className="filter__hero">
          <h1 className="filter__hero__title">Filter Coffee</h1>
          <p className="filter__hero__subtitle">
            Enjoy the taste of coffee without the caffeine. Our filter blends
            are carefully crafted to provide a rich and satisfying flavor,
            perfect for any time of day.
          </p>
        </div>
        <div className="filter__content">
          <h2 className="filter__content__title">Our Filter Selection</h2>
          <p className="filter__content__description">
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

export default Filter;
