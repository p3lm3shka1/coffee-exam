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

import "./App.scss";

const App = () => {
  return (
    <DarkModeProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/articles" element={<Articles />} />
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
