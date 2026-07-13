import Article from "../models/Article.js";

const pickLang = (lang) =>
  String(lang || "en")
    .toLowerCase()
    .startsWith("lt")
    ? "lt"
    : "en";

const localizeArticle = (article, lang) => {
  const a = article.toObject();

  if (lang === "lt") {
    a.title = a.title_lt || a.title;
    a.subtitle = a.subtitle_lt || a.subtitle;
    a.text = a.text_lt || a.text;
    a.text2 = a.text2_lt || a.text2;
    a.text3 = a.text3_lt || a.text3;
  }

  return a;
};

export const getAllArticles = async (req, res) => {
  try {
    const lang = pickLang(req.query.lang);
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles.map((article) => localizeArticle(article, lang)));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const lang = pickLang(req.query.lang);
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: "Article not found" });

    res.json(localizeArticle(article, lang));
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
