import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useHiddenScroll } from "../../hooks/useHiddenScroll";
import { useDarkMode } from "../../context/DarkModeProvider";

import "./Nav.scss";

import Logo from "../../assets/images/logo.svg";

import {
  HiOutlineShoppingCart,
  HiOutlineUserCircle,
  HiOutlineViewList,
  HiX,
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineSearch,
} from "react-icons/hi";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const hidden = useHiddenScroll({ threshold: 150, delta: 2 });
  const { theme, toggleTheme } = useDarkMode();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Articles", href: "/articles" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => setMenuOpen(false);

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
            <HiOutlineSearch className="navbar__search__icon" size={18} />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <ul
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          {navLinks.map((link, index) => (
            <li key={link.name}>
              <a href={link.href} onClick={handleLinkClick}>
                {link.name}
              </a>
              {index < navLinks.length - 1 && (
                <span className="navbar__links__divider">|</span>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <div className="theme-switcher">
            <button className="theme-switcher__button" onClick={toggleTheme}>
              {theme === "light" ? (
                <HiOutlineSun size={24} />
              ) : (
                <HiOutlineMoon size={24} />
              )}
            </button>
          </div>
          <button className="navbar__actions__account">
            <HiOutlineUserCircle size={24} />
          </button>

          <button className="navbar__actions__cart">
            <HiOutlineShoppingCart size={20} />
            <span>Your Cart</span>
          </button>

          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX size={26} /> : <HiOutlineViewList size={26} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
