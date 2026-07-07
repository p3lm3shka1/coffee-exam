import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { useCart } from "../../context/CartContext";
import "./Cart.scss";

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, increase, decrease, total } = useCart();
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
              <div key={item._id} className="cart__item">
                <img
                  className="cart__item-image"
                  src={item.image}
                  alt={item.title}
                />
                <div className="cart__item-info">
                  <p>{item.title}</p>
                  <p>${Number(item.price).toFixed(2)}</p>
                  <div className="cart__qty">
                    <button onClick={() => decrease(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increase(item._id)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart__footer">
          <p>Total: ${total.toFixed(2)}</p>
          <Link to="/checkout" className="cart__checkout" onClick={onClose}>
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
