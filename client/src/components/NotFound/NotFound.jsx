import { Link, useNavigate } from "react-router-dom";

import { GiCoffeeCup } from "react-icons/gi";

import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="notfound">
      <GiCoffeeCup className="notfound__icon" />
      <h1 className="notfound__text">Oops! Product not found</h1>
      <Link to="/" className="notfound__link" onClick={() => navigate(-1)}>
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
