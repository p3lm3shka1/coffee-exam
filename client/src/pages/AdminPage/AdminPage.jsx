import { useEffect, useMemo, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/products";
import { useAuth } from "../../context/AuthContext";

import "./AdminPage.scss";

import AdminForm from "../../components/AdminForm/AdminForm";

const subcategories = {
  coffee: [
    { value: "espresso", label: "Espresso" },
    { value: "filter", label: "Filter" },
    { value: "decaf", label: "Decaf" },
  ],
  accessories: [
    { value: "filters", label: "Filters" },
    { value: "brewing", label: "Brewing" },
    { value: "grinders", label: "Grinders" },
  ],
};

const initialForm = {
  title: "",
  price: "",
  category: "coffee",
  subcategory: "espresso",
  image: "",
  description: "",
  inStock: true,
  weight: "",
  origin: "",
  roastLevel: "",
};

const AdminPage = () => {
  const { user } = useAuth();
  const token = user?.token;

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchProducts({ search, sort: "newest" });
      setProducts(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "category") {
      const nextSub = subcategories[value][0]?.value || "";
      setForm((prev) => ({
        ...prev,
        category: value,
        subcategory: nextSub,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setError("No auth token");

    try {
      setError("");
      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await updateProduct(editingId, payload, token);
      } else {
        await createProduct(payload, token);
      }

      resetForm();
      await loadProducts();
    } catch (e) {
      setError(e.message);
    }
  };

  const onEdit = (p) => {
    setEditingId(p._id);
    setForm({
      title: p.title || "",
      price: p.price ?? "",
      category: p.category || "coffee",
      subcategory:
        p.subcategory || (p.category === "coffee" ? "espresso" : "filters"),
      image: p.image || "",
      description: p.description || "",
      inStock: !!p.inStock,
      weight: p.weight || "",
      origin: p.origin || "",
      roastLevel: p.roastLevel || "",
    });
  };

  const onDelete = async (id) => {
    if (!token) return setError("No auth token");
    if (!confirm("Delete this product?")) return;

    try {
      setError("");
      await deleteProduct(id, token);
      await loadProducts();
    } catch (e) {
      setError(e.message);
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const s = search.toLowerCase();
    return products.filter(
      (p) =>
        p.title?.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s),
    );
  }, [products, search]);

  return (
    <section className="admin">
      <h1 className="admin__title">Admin Panel</h1>
      <div className="admin__wrapper">
        <AdminForm
          form={form}
          editingId={editingId}
          onChange={onChange}
          onSubmit={onSubmit}
          onCancelEdit={resetForm}
        />
        <div className="admin__info">
          <div className="admin__stats">
            <p>
              Total products: <strong>{products.length}</strong>
            </p>
            <p>
              Filtered products: <strong>{filtered.length}</strong>
            </p>
          </div>
          <input
            className="admin__search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="admin__reload" onClick={loadProducts}>
            Reload
          </button>

          {loading && <p className="admin__loading">Loading...</p>}
          {error && <p className="admin__error">{error}</p>}

          <div className="admin__list">
            {filtered.map((p) => (
              <div key={p._id} className="admin__card">
                <strong>{p.title}</strong> — ${p.price} — <em>{p.category}</em>
                <p>{p.description}</p>
                <p>Weight: {p.weight}</p>
                <p>Origin: {p.origin}</p>
                <p>Roast Level: {p.roastLevel}</p>
                <p>Stock: {p.inStock ? "Yes" : "No"}</p>
                <div className="admin__card-actions">
                  <button onClick={() => onEdit(p)}>Edit</button>
                  <button onClick={() => onDelete(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
