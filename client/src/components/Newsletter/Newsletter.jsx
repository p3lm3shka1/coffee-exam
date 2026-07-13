import { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Newsletter.scss";

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [error, setError] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      setError(true);
      return;
    }
    setError(false);
    setShowNotification(true);
    setEmail("");
    setTimeout(() => {
      setShowNotification(false);
    }, 2200);
  };

  return (
    <section className="newsletter">
      <div className="newsletter__wrapper">
        <h2 className="newsletter__title">{t("newsletter.title")}</h2>
        <p className="newsletter__description">{t("newsletter.description")}</p>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className={`newsletter__input ${error ? "is-error" : ""}`}
            placeholder={t("newsletter.placeholder")}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
          <button type="submit" className="newsletter__button">
            {t("newsletter.subscribe")}
          </button>
        </form>
        {showNotification && (
          <p className="newsletter__notification">{t("newsletter.success")}</p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
