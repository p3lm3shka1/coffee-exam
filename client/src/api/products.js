const API_URL = import.meta.env.VITE_API_URL;

const authHeader = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams();

  if (params.category) query.append("category", params.category);
  if (params.subcategory) query.append("subcategory", params.subcategory);
  if (params.search) query.append("search", params.search);
  if (params.sort) query.append("sort", params.sort);

  if (params.minPrice !== undefined && params.minPrice !== "") {
    query.append("minPrice", params.minPrice);
  }
  if (params.maxPrice !== undefined && params.maxPrice !== "") {
    query.append("maxPrice", params.maxPrice);
  }

  const qs = query.toString();
  const response = await fetch(`${API_URL}/api/products${qs ? `?${qs}` : ""}`);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed to fetch products");
  return data;
};

export const createProduct = async (product, token) => {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify(product),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed to create product");
  return data;
};

export const updateProduct = async (id, product, token) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "PUT",
    headers: authHeader(token),
    body: JSON.stringify(product),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed to update product");
  return data;
};

export const deleteProduct = async (id, token) => {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: authHeader(token),
  });
  const data = await response.json();

  if (!response.ok) throw new Error(data.message || "Failed to delete product");
  return data;
};
