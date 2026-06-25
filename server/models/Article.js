import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageurl: { type: String, required: true },
  text: { type: String, required: true },
  imageurl2: { type: String },
  subtitle: { type: String },
  text2: { type: String },
  text3: { type: String },
  category: { type: String, default: "coffee" },
  author: { type: String, default: "Coffee Explorer" },
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
