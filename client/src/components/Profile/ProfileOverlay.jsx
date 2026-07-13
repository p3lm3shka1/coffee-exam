import { useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeProvider";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { HiX, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

import "./ProfileOverlay.scss";

const ProfileOverlay = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { user, login, register, logout } = useAuth();
  const { theme, toggleTheme } = useDarkMode();
  const [showNotification, setShowNotification] = useState(false);
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

  const handleNotification = (message) => {
    setShowNotification(message);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const loggedUser = await login(form.email, form.password);
      resetForm();
      setMode("actions");
      handleNotification(
        t("profile.welcome_back", {
          name: loggedUser.name || t("profile.user_fallback"),
        }),
      );
    } catch (err) {
      setError(err.message || t("auth.login_failed"));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const newUser = await register(form.name, form.email, form.password);
      resetForm();
      setMode("actions");
      handleNotification(
        t("profile.register_success", {
          name: newUser.name || t("profile.user_fallback"),
        }),
      );
    } catch (err) {
      setError(err.message || t("auth.register_failed"));
    }
  };

  const handleLogout = () => {
    if (!confirm(t("profile.logout_confirm"))) return;
    logout();
    setMode("actions");
    onClose();
    handleNotification(t("profile.logout_success"));
  };

  return (
    <section className="profile" onClick={onClose}>
      <div className="profile__content" onClick={(e) => e.stopPropagation()}>
        <button className="profile__close" onClick={onClose}>
          <HiX size={22} />
        </button>

        <div className="profile__theme">
          <input
            className="profile__theme__checkbox"
            type="checkbox"
            checked={theme === "dark"}
            onChange={toggleTheme}
            id="theme-toggle"
          />
          <label className="profile__theme__label" htmlFor="theme-toggle">
            <HiOutlineSun className="sun" />
            <HiOutlineMoon className="moon" />
          </label>
        </div>

        <div className="profile__header"></div>

        {user && (
          <div className="profile__user">
            <p className="profile__user__name">
              {t("profile.hello")} <strong>{user.name}</strong>
            </p>
          </div>
        )}

        {mode === "actions" && (
          <div className="profile__actions">
            {!user ? (
              <>
                <button onClick={() => setMode("login")}>
                  {t("profile.login")}
                </button>
                <button onClick={() => setMode("register")}>
                  {t("profile.registration")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="profile__profile-link"
                  onClick={onClose}
                >
                  {t("profile.profile_link")}
                </Link>
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="profile__admin-link"
                    onClick={onClose}
                  >
                    {t("profile.admin_link")}
                  </Link>
                )}
                <button onClick={handleLogout} className="profile__logout">
                  {t("profile.logout")}
                </button>
              </>
            )}
          </div>
        )}

        {mode === "login" && (
          <form className="profile__form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder={t("profile.email")}
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder={t("profile.password")}
              value={form.password}
              onChange={onChange}
              required
            />
            {error && <p className="profile__error">{error}</p>}
            <button type="submit">{t("profile.login")}</button>
            <span
              onClick={() => {
                setMode("register");
                setError("");
              }}
            >
              {t("profile.no_account")}{" "}
              <span className="profile__link">{t("profile.registration")}</span>
            </span>
          </form>
        )}

        {mode === "register" && (
          <form className="profile__form" onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder={t("profile.name")}
              value={form.name}
              onChange={onChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={t("profile.email")}
              value={form.email}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder={t("profile.password")}
              value={form.password}
              onChange={onChange}
              required
            />
            {error && <p className="profile__error">{error}</p>}
            <button type="submit">{t("profile.registration")}</button>
            <span
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              {t("profile.already_have_account")}{" "}
              <span className="profile__link">{t("profile.login")}</span>
            </span>
          </form>
        )}
      </div>

      {showNotification && (
        <div className="profile__notification">
          <div className="profile__notification__content">
            {showNotification}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileOverlay;
