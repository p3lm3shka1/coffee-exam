import { Route, Routes, BrowserRouter } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Arcticles from "./pages/Articles/Articles";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/articles" element={<Arcticles />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
