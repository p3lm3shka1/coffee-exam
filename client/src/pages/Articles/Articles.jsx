import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Articles.scss";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/articles");
        if (!res.ok) throw new Error("Server error ");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div className="articles__state">Loading...</div>;
  if (error) return <div className="articles__state">Error: {error}</div>;
  if (articles.length === 0)
    return <div className="articles__state">No articles found.</div>;

  return (
    <section className="articles">
      <div className="articles__wrapper">
        <h1 className="articles__title">Articles</h1>

        <div className="articles__grid">
          {articles.map((article) => (
            <div key={article._id} className="articles__card">
              <div className="articles__card__image">
                <img src={article.imageURL} alt={article.title} />
              </div>
              <div className="articles__card__body">
                <span className="articles__card__category">
                  {article.category}
                </span>
                <h2 className="articles__card__title">{article.title}</h2>
                <p className="articles__card__text">{article.text}</p>
                <div className="articles__card__footer">
                  <span className="articles__card__author">
                    {article.author}
                  </span>
                  <Link
                    to={`/articles/${article._id}`}
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
