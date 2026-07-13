import { useTranslation } from "react-i18next";

import "./LangSwitcher.scss";

const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const isLT = i18n.language?.toLowerCase().startsWith("lt");

  const toggleLanguage = () => {
    const next = isLT ? "en" : "lt";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  return (
    <button type="button" className="lang-switcher" onClick={toggleLanguage}>
      {isLT ? "LT" : "EN"}
    </button>
  );
};

export default LangSwitcher;
