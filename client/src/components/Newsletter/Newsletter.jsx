import { useState } from "react";

import "./Newsletter.scss";

const Newsletter = () => {
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
        <h2 className="newsletter__title">Subscribe to our Newsletter</h2>
        <p className="newsletter__description">
          Get coffee updates, discounts, and new arrivals first.
        </p>
        <form className="newsletter__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className={`newsletter__input ${error ? "is-error" : ""}`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(false);
            }}
          />
          <button type="submit" className="newsletter__button">
            Subscribe
          </button>
        </form>
        {showNotification && (
          <p className="newsletter__notification">Thank you for subscribing!</p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
