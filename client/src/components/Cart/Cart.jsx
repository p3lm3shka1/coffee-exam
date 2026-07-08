import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { useCart } from "../../context/CartContext";
import "./Cart.scss";

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, increase, decrease, removeFromCart, total } = useCart();

  if (!isOpen) return null;

  return (
    <section className="cart" onClick={onClose}>
      <div className="cart__content" onClick={(e) => e.stopPropagation()}>
        <div className="cart__header">
          <h3>Cart</h3>
          <button className="cart__header__close" onClick={onClose}>
            <HiX size={24} />
          </button>
        </div>

        <div className="cart__items">
          {cartItems.length === 0 ? (
            <p className="cart__empty">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="cart__item">
                <Link
                  to={`/products/${item._id}`}
                  className="cart__item__image-link"
                  onClick={onClose}
                >
                  <img
                    className="cart__item__image"
                    src={item.image}
                    alt={item.title}
                  />
                </Link>

                <div className="cart__item__info">
                  <div className="cart__item__header">
                    <Link
                      to={`/products/${item._id}`}
                      className="cart__item__title-link"
                      onClick={onClose}
                    >
                      <h4>{item.title}</h4>
                    </Link>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="cart__item__delete"
                      title="Remove item"
                    >
                      <HiOutlineTrash size={18} />
                    </button>
                  </div>

                  <div className="cart__item__footer">
                    <div className="cart__qty">
                      <button
                        onClick={() => decrease(item._id)}
                        className="cart__qty__btn"
                      >
                        &#x2212;
                      </button>
                      <span className="cart__qty__value">{item.quantity}</span>
                      <button
                        onClick={() => increase(item._id)}
                        className="cart__qty__btn"
                      >
                        &#x002B;
                      </button>
                    </div>
                    <span className="cart__item__price">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart__footer">
            <div className="cart__total">
              <span>Total:</span>
              <strong>${total.toFixed(2)}</strong>
            </div>
            <Link to="/checkout" className="cart__checkout" onClick={onClose}>
              Checkout
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
