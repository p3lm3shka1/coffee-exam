import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { HiOutlineSearch } from "react-icons/hi";

import "./SearchBar.scss";

const SearchBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products?search=${query}`,
        );
        const data = await res.json();
        setSearchResults(data.slice(0, 5));
      } catch (e) {
        console.error("Search error:", e);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      searchInputRef.current?.focus();
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const handleSearchResultClick = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <button
        className="search-bar__icon-btn"
        onClick={() => setSearchOpen(!searchOpen)}
        title="Search"
      >
        <HiOutlineSearch size={20} />
      </button>

      {searchOpen && (
        <div className="search-bar__container">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-bar__input"
          />
          {searchQuery && (
            <button
              className="search-bar__clear"
              onClick={() => {
                setSearchQuery("");
                setSearchResults([]);
              }}
            >
              ✕
            </button>
          )}

          {searchResults.length > 0 && (
            <div className="search-bar__results">
              {searchResults.map((product) => (
                <Link
                  key={product._id}
                  to={`/products/${product._id}`}
                  className="search-bar__result-item"
                  onClick={handleSearchResultClick}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="search-bar__result-image"
                  />
                  <div className="search-bar__result-info">
                    <h4>{product.title}</h4>
                    <span>${Number(product.price).toFixed(2)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
