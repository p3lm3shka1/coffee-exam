import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../api/config";

import useFetch from "../../hooks/useFetch";

import { GiCoffeeCup } from "react-icons/gi";

import "./ArticleDetails.scss";

const ArticleDetails = () => {
  const { slug } = useParams();
  const {
    data: article,
    loading,
    error,
  } = useFetch(`${API_URL}/api/articles/${slug}`);

  if (loading)
    return (
      <div className="article-page__state">
        <GiCoffeeCup className="loading-icon" />
        Loading...
      </div>
    );
  if (error) return <div className="article-page__state">Error: {error}</div>;
  if (!article) return null;

  return (
    <section className="article-page">
      <div className="article-page__wrapper">
        <Link to="/articles" className="article-page__back">
          Back to Articles
        </Link>

        <h1 className="article-page__title">{article.title}</h1>

        <div className="article-page__hero">
          <img src={article.imageurl} alt={article.title} />
        </div>
        <p className="article-page__text">{article.text}</p>

        {article.subtitle && (
          <h2 className="article-page__subtitle">{article.subtitle}</h2>
        )}
        {article.imageurl2 && (
          <div className="article-page__hero">
            <img src={article.imageurl2} alt={article.subtitle} />
          </div>
        )}
        {article.text2 && <p className="article-page__text">{article.text2}</p>}
        {article.text3 && <p className="article-page__text">{article.text3}</p>}

        <div className="article-page__meta">
          <span>{article.author}</span>
        </div>
      </div>
    </section>
  );
};

export default ArticleDetails;
