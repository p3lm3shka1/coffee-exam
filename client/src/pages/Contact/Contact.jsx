import "./Contact.scss";

const Contact = () => {
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
          />

          <form className="contact__form">
            <h1 className="contact__form__title">Get in Touch</h1>
            <div className="contact__form__row">
              <div className="contact__form__field">
                <label>Name</label>
                <input type="text" placeholder="John Doe" />
              </div>
              <div className="contact__form__field">
                <label>Email</label>
                <input type="email" placeholder="john@example.com" />
              </div>
            </div>

            <div className="contact__form__field">
              <label>Message</label>
              <textarea rows={5} placeholder="Your message..." />
            </div>

            <div className="contact__form__footer">
              <button type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
