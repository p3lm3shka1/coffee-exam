import { useState, createContext, useContext, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );

  const saveToLocalStorage = (next) => {
    setCartItems(next);
    localStorage.setItem("cartItems", JSON.stringify(next));
  };

  const addToCart = (product) => {
    const existing = cartItems.find((i) => i._id === product._id);
    if (existing) {
      saveToLocalStorage(
        cartItems.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      saveToLocalStorage([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increase = (id) =>
    saveToLocalStorage(
      cartItems.map((i) =>
        i._id === id ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );

  const decrease = (id) =>
    saveToLocalStorage(
      cartItems
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0),
    );

  const removeFromCart = (id) =>
    saveToLocalStorage(cartItems.filter((i) => i._id !== id));
  const clearCart = () => saveToLocalStorage([]);

  const total = useMemo(
    () => cartItems.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0),
    [cartItems],
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increase,
        decrease,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
