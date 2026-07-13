import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useHiddenScroll } from "../../hooks/useHiddenScroll";

import ProfileOverlay from "../Profile/ProfileOverlay";
import Cart from "../Cart/Cart";
import SearchBar from "../SearchBar/SearchBar";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import { useTranslation } from "react-i18next";

import "./Nav.scss";

import Logo from "../../assets/images/logo.png";

import {
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
  HiOutlineViewList,
  HiX,
} from "react-icons/hi";

const Nav = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const hidden = useHiddenScroll({ threshold: 150, delta: 2 });
  const [subMenu, setSubMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.shop"), href: "/shop", hasSubmenu: true },
    { name: t("nav.articles"), href: "/articles" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const shopSubmenu = [
    { name: t("nav.coffee_blends"), href: "/coffee" },
    { name: t("nav.accessories"), href: "/accessories" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
    setSubMenu(false);
  };

  return (
    <motion.nav
      className="navbar"
      animate={{ y: hidden ? -140 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="navbar__wrapper">
        <div className="navbar__left">
          <div className="navbar__logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="navbar__search">
            <SearchBar />
          </div>
        </div>

        <ul
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          {navLinks.map((link, index) => (
            <li
              key={link.name}
              className={link.hasSubmenu ? "navbar__links__item--has-sub" : ""}
            >
              {link.hasSubmenu ? (
                <button
                  className="navbar__links__shop-btn"
                  onClick={() => setSubMenu(!subMenu)}
                >
                  {link.name}
                </button>
              ) : (
                <Link to={link.href} onClick={handleLinkClick}>
                  {link.name}
                </Link>
              )}

              {index < navLinks.length - 1 && (
                <span className="navbar__links__divider">|</span>
              )}

              {link.hasSubmenu && (
                <ul
                  className={`navbar__links__submenu ${subMenu ? "navbar__links__submenu--open" : ""}`}
                >
                  {shopSubmenu.map((sub) => (
                    <li key={sub.name}>
                      <Link to={sub.href} onClick={handleLinkClick}>
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <LangSwitcher className="navbar__actions__lang" />
          <button
            className="navbar__actions__account"
            onClick={() => setProfileOpen(true)}
          >
            <HiOutlineUserCircle size={24} />
          </button>

          <button
            className="navbar__actions__cart"
            onClick={() => setCartOpen(true)}
          >
            <HiOutlineShoppingCart size={20} />
            <span>{t("cart.title")}</span>
          </button>

          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={26} /> : <HiOutlineViewList size={26} />}
          </button>
        </div>
      </div>
      <ProfileOverlay
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </motion.nav>
  );
};

export default Nav;
