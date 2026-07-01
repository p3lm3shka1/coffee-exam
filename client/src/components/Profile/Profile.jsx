import { useState } from "react";
import { HiX, HiOutlineUserCircle } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";

import "./Profile.scss";

const Profile = ({ isOpen, onClose }) => {
  const { user, login, register, logout } = useAuth();

  const [mode, setMode] = useState("actions");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({ name: "", email: "", password: "" });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(form.email, form.password);
      resetForm();
      setMode("actions");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await register(form.name, form.email, form.password);
      resetForm();
      setMode("actions");
    } catch (err) {
      setError(err.message || "Register failed");
    }
  };

  const handleLogout = () => {
    logout();
    setMode("actions");
    onClose();
  };

  return (
    <div className="profile" onClick={onClose}>
      <div className="profile__content" onClick={(e) => e.stopPropagation()}>
        <button className="profile__close" onClick={onClose}>
          <HiX size={22} />
        </button>

        <div className="profile__header">
          <h3>Profile</h3>
        </div>

        {user && (
          <div className="profile__user">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        )}

        {mode === "actions" && (
          <div className="profile__actions">
            {!user ? (
              <>
                <button onClick={() => setMode("login")}>Login</button>
                <button onClick={() => setMode("register")}>
                  Registration
                </button>
              </>
            ) : (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        )}

        {mode === "login" && (
          <form className="profile__form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />
            {error && <p className="profile__error">{error}</p>}
            <button type="submit">Login</button>
            <span
              onClick={() => {
                setMode("register");
                setError("");
              }}
            >
              No account? <span className="profile__link">Register</span>
            </span>
          </form>
        )}

        {mode === "register" && (
          <form className="profile__form" onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />
            {error && <p className="profile__error">{error}</p>}
            <button type="submit">Registration</button>
            <span
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              Already have account? <span className="profile__link">Login</span>
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
