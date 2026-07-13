import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./Contact.scss";

const Contact = () => {
  const { t } = useTranslation();
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
          <h1 className="contact__left__title">{t("contact.contact_us")}</h1>

          <div className="contact__left__block">
            <h2 className="contact__left__block__heading">
              {t("contact.subtitle")}
            </h2>
            <p className="contact__left__block__text">
              {t("contact.write_to_us")}{" "}
              <a href="mailto:info@coffeeexplorer.com">
                info@coffeeexplorer.com
              </a>
            </p>
          </div>

          <div className="contact__left__block">
            <h2 className="contact__left__block__heading">Coffee Explorer</h2>
            <p className="contact__left__block__text">
              {t("contact.work_weeks")} 8:00-17:00
              <br />
              {t("contact.work_saturday")} 9:00-16:00
              <br />
              {t("contact.address_line")}
              <br />
            </p>
          </div>

          <div className="contact__left__block">
            <h2 className="contact__left__block__heading">
              {t("contact.credentials")}
            </h2>
            <p className="contact__left__block__text">
              MB Coffee Explorer
              <br />
              Reg. No. 123456789
              <br />
              {t("contact.address_line")}
              <br />
              VAT: LT1234567890123
            </p>
          </div>
        </div>

        <div className="contact__right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d147553.20047946303!2d25.088228018276077!3d54.70049582413158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd93fb5c6408f5%3A0x400d18c70e9dc40!2sVilnius%2C%20Vilniaus%20m.%20sav.!5e0!3m2!1slt!2slt!4v1783858529895!5m2!1slt!2slt"
            className="contact__map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Coffee Explorer location"
          ></iframe>

          <form className="contact__form" onSubmit={handleSubmit}>
            <h1 className="contact__form__title">{t("contact.contact_us")}</h1>

            <div className="contact__form__row">
              <div className="contact__form__field">
                <label htmlFor="name">{t("contact.name")}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("contact.name_placeholder")}
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? "is-error" : ""}
                />
              </div>

              <div className="contact__form__field">
                <label htmlFor="email">{t("contact.email")}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("contact.email_placeholder")}
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? "is-error" : ""}
                />
              </div>
            </div>

            <div className="contact__form__field">
              <label htmlFor="message">{t("contact.message")}</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t("contact.message_placeholder")}
                value={form.message}
                onChange={handleChange}
                className={errors.message ? "is-error" : ""}
              />
            </div>

            <div className="contact__form__footer">
              <button type="submit">{t("contact.send")}</button>
            </div>
          </form>
        </div>
      </div>

      {showNotification && (
        <p className="contact__notification">
          {t("contact.message_sent_successfully")}
        </p>
      )}
    </section>
  );
};

export default Contact;
