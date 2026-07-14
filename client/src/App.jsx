import { Route, Routes } from "react-router-dom";
import DarkModeProvider from "./context/DarkModeProvider";
import AdminRoute from "./routes/AdminRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
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
import ProductPage from "./pages/ProductPage/ProductPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage/Checkout";
import OrderSuccess from "./pages/OrderSuccessPage/OrderSuccess";

import "./App.scss";

const App = () => {
  return (
    <DarkModeProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coffee" element={<CoffeePage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="*" element={<NotFound />} />

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
      <Footer />
    </DarkModeProvider>
  );
};

export default App;
