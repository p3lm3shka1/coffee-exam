import "./About.scss";

import coffeeImage from "../../assets/images/about-image.jpg";
import avatarImage from "../../assets/images/about-avatar.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="about__wrapper">
        <h1 className="about__title">
          About Coffee <span>Explorer</span>
        </h1>

        <div className="about__grid">
          <div className="about__grid__text">
            <h1 className="about__grid__title">Mission</h1>
            <p className="about__grid__description">
              Our mission is to bring coffee lovers closer to exceptional
              experiences. We carefully select quality beans, brewing equipment,
              and accessories to help everyone enjoy a perfect cup at home.
              Whether you're just discovering coffee or already have years of
              experience, we're here to inspire your journey.
            </p>
          </div>
          <div className="about__grid__image">
            <img src={coffeeImage} alt="Coffee" />
          </div>

          <div className="about__grid__image">
            <img src={avatarImage} alt="Avatar" />
          </div>
          <div className="about__grid__text">
            <h1 className="about__grid__title">About</h1>
            <p className="about__grid__description">
              Hi! I'm the person behind this project. Coffee has been part of my
              life for years. I worked as a barista for over three years, where
              I learned that every great cup starts with quality beans, the
              right technique, and attention to detail. That experience inspired
              me to create this website — to share products I genuinely believe
              in and help others discover the joy of brewing great coffee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
