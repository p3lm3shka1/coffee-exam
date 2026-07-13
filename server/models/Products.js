import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    title_lt: { type: String, default: "", trim: true },

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
    description_lt: { type: String, default: "", trim: true },

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

productSchema.index({ title: "text", description: "text", origin: "text" });
productSchema.index({ category: 1, subcategory: 1, createdAt: -1 });
productSchema.index({ price: 1 });

export default mongoose.model("Product", productSchema);
