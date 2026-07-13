import { Link } from "react-router-dom";
import { API_URL } from "../../api/config";
import useFetch from "../../hooks/useFetch";
import { GiCoffeeCup } from "react-icons/gi";
import { useTranslation } from "react-i18next";

import "./Articles.scss";

const Articles = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("lt") ? "lt" : "en";

  const {
    data: articles,
    loading,
    error,
    getTimer,
  } = useFetch(`${API_URL}/api/articles?lang=${lang}`);

  if (loading) {
    return (
      <div className="articles__state">
        {getTimer && <GiCoffeeCup className="loading-icon" />}
      </div>
    );
  }

  if (error)
    return (
      <div className="articles__state">{t("common.something_went_wrong")}</div>
    );
  if (!articles || articles.length === 0) {
    return (
      <div className="articles__state">{t("articles.no_articles_found")}</div>
    );
  }

  return (
    <section className="articles" key={lang}>
      <div className="articles__wrapper">
        <h1 className="articles__title">{t("articles.title")}</h1>

        <div className="articles__grid">
          {articles.map((article) => (
            <div key={article._id} className="articles__card">
              <div className="articles__card__image">
                <img src={article.imageurl} alt={article.title} />
              </div>
              <div className="articles__card__body">
                <h2 className="articles__card__title">{article.title}</h2>
                <p className="articles__card__text">{article.text}</p>
                <div className="articles__card__footer">
                  <span className="articles__card__author">
                    {article.author}
                  </span>
                  <Link
                    to={`/articles/${article.slug}`}
                    className="articles__card__link"
                  >
                    {t("articles.read_more")}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
