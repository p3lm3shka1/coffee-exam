import { useState } from "react";

import "./Contact.scss";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const [showNotification, setShowNotification] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = {
      name: !form.name.trim(),
      email: !validateEmail(form.email),
      message: !form.message.trim(),
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    setShowNotification(true);
    setForm({ name: "", email: "", message: "" });

    setTimeout(() => {
      setShowNotification(false);
    }, 2200);
  };

  return (
    <section className="contact">
      <div className="contact__wrapper">
        <div className="contact__left">
          <h1 className="contact__left__title">Contact Us</h1>

          <div className="contact__left__block">
            <h2 className="contact__left__block__heading">Any Questions?</h2>
            <p className="contact__left__block__text">
              Write to us in the contact form, or send directly to{" "}
              <a href="mailto:info@coffeeexplorer.com">
                info@coffeeexplorer.com
              </a>
            </p>
          </div>

          <div className="contact__left__block">
            <h2 className="contact__left__block__heading">Coffee Explorer</h2>
            <p className="contact__left__block__text">
              Mon-Fri 8:00-17:00
              <br />
              Saturday 9:00-16:00
              <br />
              123 Coffee Street, Vilnius
              <br />
            </p>
          </div>

          <div className="contact__left__block">
            <h2 className="contact__left__block__heading">Credentials</h2>
            <p className="contact__left__block__text">
              MB Coffee Explorer
              <br />
              Reg. No. 123456789
              <br />
              123 Coffee St, LT-12345 Vilnius
              <br />
              VAT: LT1234567890123
            </p>
          </div>
        </div>

        <div className="contact__right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515696.4656081739!2d-90.06191022149919!3d31.882962117860856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8882cf7f94f04001%3A0x647a5b60087cd76c!2sS%20C%20Rd%2057A%2C%20Mississippi%2C%20Jungtin%C4%97s%20Valstijos!5e0!3m2!1slt!2slt!4v1782155598688!5m2!1slt!2slt"
            className="contact__map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Coffee Explorer location"
          />

          <form className="contact__form" onSubmit={handleSubmit}>
            <h1 className="contact__form__title">Get in Touch</h1>

            <div className="contact__form__row">
              <div className="contact__form__field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "is-error" : ""}
                />
              </div>

              <div className="contact__form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "is-error" : ""}
                />
              </div>
            </div>

            <div className="contact__form__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Your message..."
                value={form.message}
                onChange={handleChange}
                className={errors.message ? "is-error" : ""}
              />
            </div>

            <div className="contact__form__footer">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>

      {showNotification && (
        <p className="contact__notification">Message sent successfully!</p>
      )}
    </section>
  );
};

export default Contact;
