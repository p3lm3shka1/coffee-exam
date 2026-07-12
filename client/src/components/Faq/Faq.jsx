import { useState } from "react";

import "./Faq.scss";

const faqItems = [
  {
    question: "How long does delivery take?",
    answer:
      "Usually 2-5 business days within the EU. International orders may take 7-14 business days.",
  },
  {
    question: "How much does shipping cost?",
    answer:
      "Shipping cost is calculated at checkout based on your location. Free shipping is available for orders over €50.",
  },
  {
    question: "Can I return coffee or accessories?",
    answer:
      "Accessories can be returned within 30 days. Coffee can be returned only if the package is unopened.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq">
      <div className="faq__wrapper">
        <h2 className="faq__title">Have questions?</h2>
        <p className="faq__subtitle">Quick answers before your order</p>

        <div className="faq__list">
          {faqItems.map((item, index) => (
            <div
              key={item.question}
              className={`faq__item ${openIndex === index ? "is-open" : ""}`}
            >
              <button
                type="button"
                className="faq__question"
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
                <span className="faq__icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              <div className="faq__answer-wrap">
                <p className="faq__answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
