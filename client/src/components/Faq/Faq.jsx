import { useState } from "react";
import { useTranslation } from "react-i18next";

import "./Faq.scss";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useTranslation();

  const faqItems = [
    {
      question: t("faq.q1"),
      answer: t("faq.a1"),
    },
    {
      question: t("faq.q2"),
      answer: t("faq.a2"),
    },
    {
      question: t("faq.q3"),
      answer: t("faq.a3"),
    },
  ];

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq">
      <div className="faq__wrapper">
        <h2 className="faq__title">{t("faq.title")}</h2>
        <p className="faq__subtitle">{t("faq.subtitle")}</p>

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
