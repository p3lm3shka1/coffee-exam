import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true, min: 0 },

    category: {
      type: String,
      enum: ["coffee", "accessories"],
      required: true,
    },

    subcategory: {
      type: String,
      enum: [
        "espresso",
        "filter",
        "decaf",
        "filters",
        "grinders",
        "brewing",
        null,
      ],
      required: true,
    },

    image: { type: String, default: "" },
    description: { type: String, default: "", trim: true },

    weight: { type: String, default: null },
    origin: { type: String, default: null },
    roastLevel: {
      type: String,
      enum: ["light", "medium", "dark", null],
      default: null,
    },

    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
);

productSchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }
  next();
});

productSchema.index({ title: "text", description: "text", origin: "text" });
productSchema.index({ category: 1, subcategory: 1, createdAt: -1 });
productSchema.index({ price: 1 });

export default mongoose.model("Product", productSchema);
