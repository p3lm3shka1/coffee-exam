import { Route, Routes, BrowserRouter } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import Home from "./pages/Home/Home";

import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
