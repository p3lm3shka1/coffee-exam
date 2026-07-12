import { Link } from "react-router-dom";

import "./OrderSuccess.scss";

const OrderSuccess = () => (
  <section className="order-success">
    <div className="order-success__wrapper">
      <h1 className="order-success__title">Thank you!</h1>
      <p className="order-success__text">
        Your order has been placed successfully.
      </p>
      <Link to="/" className="order-success__button">
        Back to Home
      </Link>
    </div>
  </section>
);

export default OrderSuccess;
