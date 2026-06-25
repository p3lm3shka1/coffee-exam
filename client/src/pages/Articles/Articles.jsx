import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../api/config";

import useFetch from "../../hooks/useFetch";

import { GiCoffeeCup } from "react-icons/gi";

import "./Articles.scss";

const Articles = () => {
  const {
    data: articles,
    loading,
    error,
    timer,
  } = useFetch(`${API_URL}/api/articles`);

  if (loading)
    return (
      <div className="articles__state">
        <GiCoffeeCup className="loading-icon" />{" "}
        {timer && <p>Server is drinking coffee to wake up...</p>}
      </div>
    );
  if (error) return <div className="articles__state">Error: {error}</div>;
  if (!articles || articles.length === 0)
    return <div className="articles__state">No articles found.</div>;

  return (
    <section className="articles">
      <div className="articles__wrapper">
        <h1 className="articles__title">Articles</h1>

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
                    Read More
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
