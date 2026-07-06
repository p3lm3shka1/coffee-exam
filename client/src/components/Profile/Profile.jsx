import { useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeProvider";
import { useAuth } from "../../context/AuthContext";

import {
  HiX,
  HiOutlineUserCircle,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi";

import "./Profile.scss";

const Profile = ({ isOpen, onClose }) => {
  const { user, login, register, logout } = useAuth();
  const { theme, toggleTheme } = useDarkMode();

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
      const loggedUser = await login(form.email, form.password);
      resetForm();
      setMode("actions");
      alert(`Login successful! Welcome back ${loggedUser.name || "User"}.`);
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const newUser = await register(form.name, form.email, form.password);
      resetForm();
      setMode("actions");
      alert(
        `Registration successful! Welcome ${newUser.name || "User"}! Please log in.`,
      );
    } catch (err) {
      setError(err.message || "Register failed");
    }
  };

  const handleLogout = () => {
    if (!confirm("Are you sure you want to logout?")) return;
    logout();
    setMode("actions");
    onClose();
    alert("You have been logged out.");
  };

  return (
    <div className="profile" onClick={onClose}>
      <div className="profile__content" onClick={(e) => e.stopPropagation()}>
        <button className="profile__close" onClick={onClose}>
          <HiX size={22} />
        </button>

        <div className="profile__theme">
          <input type="checkbox" onClick={toggleTheme} />
          {theme === "light" ? (
            <HiOutlineSun size={24} />
          ) : (
            <HiOutlineMoon size={24} />
          )}
          {theme === "light" ? <p>Light Mode</p> : <p>Dark Mode</p>}
        </div>

        <div className="profile__header"></div>

        {user && (
          <div className="profile__user">
            <p className="profile__user__name">
              Welcome, <strong>{user.name}</strong>
            </p>
            <p>
              Role: <strong>{user.role}</strong>
            </p>
            <p>
              Email: <strong>{user.email}</strong>
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
              <>
                {user && user.role === "admin" && (
                  <Link to="/admin" className="profile__admin-link">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout}>Logout</button>
              </>
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
