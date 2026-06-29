import { Route, Routes, BrowserRouter } from "react-router-dom";
import DarkModeProvider from "./context/DarkModeProvider";

import NotFound from "./components/NotFound/NotFound";
import Nav from "./components/Navigation/Nav";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Articles from "./pages/Articles/Articles";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ArticleDetails from "./pages/Articles/ArticleDetails";
import CoffeePage from "./pages/CoffeePage/CoffeePage";
import AccessoriesPage from "./pages/AccessoriesPage/AccessoriesPage";
import EspressoPage from "./pages/CoffeePage/EspressoPage/Espresso";
import FilterPage from "./pages/CoffeePage/FilterPage/Filter";
import DecafPage from "./pages/CoffeePage/DecafPage/Decaf";

import "./App.scss";

const App = () => {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coffee" element={<CoffeePage />} />
          <Route path="/coffee/espresso" element={<EspressoPage />} />
          <Route path="/coffee/filter" element={<FilterPage />} />
          <Route path="/coffee/decaf" element={<DecafPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </DarkModeProvider>
  );
};

export default App;
