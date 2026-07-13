import { useTranslation } from "react-i18next";

import "./About.scss";

import coffeeImage from "../../assets/images/about-image.jpg";
import avatarImage from "../../assets/images/about-avatar.jpg";

const About = () => {
  const { t } = useTranslation();
  return (
    <section className="about">
      <div className="about__wrapper">
        <h1 className="about__title">
          {t("about.title")}
          <span>Explorer</span>
        </h1>

        <div className="about__grid">
          <div className="about__grid__text">
            <h1 className="about__grid__title">{t("about.our_mission")}</h1>
            <p className="about__grid__description">
              {t("about.mission_desc")}
            </p>
          </div>
          <div className="about__grid__image">
            <img src={coffeeImage} alt="Coffee" />
          </div>

          <div className="about__grid__image">
            <img src={avatarImage} alt="Avatar" />
          </div>
          <div className="about__grid__text">
            <h1 className="about__grid__title">{t("about.our_story")}</h1>
            <p className="about__grid__description">{t("about.story_desc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
