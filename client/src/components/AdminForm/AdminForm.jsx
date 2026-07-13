import { useTranslation } from "react-i18next";
import "./AdminForm.scss";

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

const AdminForm = ({ form, editingId, onChange, onSubmit, onCancelEdit }) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit} className="admin-form">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={onChange}
        required
      />
      <input
        name="price"
        type="number"
        min="0"
        step="0.01"
        placeholder="Price"
        value={form.price}
        onChange={onChange}
        required
      />

      <select
        name="category"
        value={form.category}
        onChange={onChange}
        required
      >
        <option value="coffee">Coffee</option>
        <option value="accessories">Accessories</option>
      </select>

      <select
        name="subcategory"
        value={form.subcategory}
        onChange={onChange}
        required
      >
        {subcategories[form.category].map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={onChange}
      />
      <input
        name="weight"
        placeholder="Weight (e.g. 250g)"
        value={form.weight}
        onChange={onChange}
      />
      <input
        name="origin"
        placeholder="Origin (e.g. Ethiopia)"
        value={form.origin}
        onChange={onChange}
      />

      <select name="roastLevel" value={form.roastLevel} onChange={onChange}>
        <option value="">Roast level (optional)</option>
        <option value="light">Light</option>
        <option value="medium">Medium</option>
        <option value="dark">Dark</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={onChange}
        rows={4}
      />

      <label className="admin-form__checkbox">
        <input
          name="inStock"
          type="checkbox"
          checked={form.inStock}
          onChange={onChange}
        />
        In stock
      </label>

      <div className="admin-form__actions">
        <button type="submit">
          {editingId ? "Update product" : "Add product"}
        </button>
        {editingId && (
          <button type="button" onClick={onCancelEdit}>
            Cancel edit
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminForm;
