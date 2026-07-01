import { useState } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";

import "./Cart.scss";

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  if (!isOpen) return null;

  return (
    <section className="cart" onClick={onClose}>
      <div className="cart__content" onClick={(e) => e.stopPropagation()}>
        <button className="cart__close" onClick={onClose}>
          <HiX size={22} />
        </button>
        <div className="cart__header">
          <h3>Your Cart</h3>
        </div>
        <div className="cart__items">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart__item">
                <p>{item.name}</p>
                <p>{item.price}</p>
              </div>
            ))
          )}
        </div>
        <div className="cart__footer">
          <Link to="/checkout" className="cart__checkout" onClick={onClose}>
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
