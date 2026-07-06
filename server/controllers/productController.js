import Products from "../models/Products.js";

export const getProducts = async (req, res) => {
  try {
    const { category, subcategory, search, minPrice, maxPrice, sort } =
      req.query;

    const filter = {};

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;

    if (search && search.trim()) {
      filter.$text = { $search: search.trim() };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice !== undefined && minPrice !== "")
        filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined && maxPrice !== "")
        filter.price.$lte = Number(maxPrice);
    }

    let query = Products.find(filter);

    if (search && search.trim()) {
      query = query
        .select({
          score: { $meta: "textScore" },
          title: 1,
          price: 1,
          category: 1,
          subcategory: 1,
          image: 1,
          description: 1,
          weight: 1,
          origin: 1,
          roastLevel: 1,
          inStock: 1,
          createdAt: 1,
          updatedAt: 1,
        })
        .sort({ score: { $meta: "textScore" } });
    } else {
      if (sort === "price_asc") query = query.sort({ price: 1 });
      else if (sort === "price_desc") query = query.sort({ price: -1 });
      else if (sort === "oldest") query = query.sort({ createdAt: 1 });
      else query = query.sort({ createdAt: -1 });
    }

    const products = await query;
    res.json(products);
  } catch (e) {
    console.error("getProducts error:", e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.status(201).json(product);
  } catch (e) {
    res.status(400).json({ message: "Invalid product data", error: e.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (e) {
    res.status(400).json({ message: "Update failed", error: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (e) {
    res.status(400).json({ message: "Delete failed", error: e.message });
  }
};
