import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "./ArticleDetails.scss";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/articles/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch article");
        }
        const data = await res.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!article) {
    return <p>No article found</p>;
  }

  return (
    <section className="article-details">
      <div className="article-details__wrapper">
        <h1 className="article-details__title">{article.title}</h1>
        <div className="article-details__image">
          <img src={article.imageURL} alt={article.title} />
        </div>
        <p className="article-details__text">{article.text}</p>
        <div className="article-details__footer">
          <span className="article-details__author">{article.author}</span>
          <span className="article-details__category">{article.category}</span>
        </div>
        <Link to="/articles" className="article-details__back-link">
          Back to Articles
        </Link>
      </div>
    </section>
  );
};

export default ArticleDetails;
