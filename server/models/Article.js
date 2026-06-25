import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  imageURL: { type: String, required: true },
  category: { type: String, default: "coffee" },
  author: { type: String, default: "Coffee Explorer" },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
