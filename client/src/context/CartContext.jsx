import { useState, createContext, useContext, useMemo } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || [],
  );

  const saveToLocalStorage = (items) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addToCart = (product, qty = 1) => {
    const limitedQty = Math.min(Math.max(qty, 1), 99);

    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i._id === product._id);

      let updated;
      if (existing) {
        updated = prevItems.map((i) =>
          i._id === product._id
            ? { ...i, quantity: Math.min(i.quantity + limitedQty, 99) }
            : i,
        );
      } else {
        updated = [...prevItems, { ...product, quantity: limitedQty }];
      }

      saveToLocalStorage(updated);
      return updated;
    });
  };

  const increase = (id) => {
    setCartItems((prevItems) => {
      const updated = prevItems.map((i) =>
        i._id === id ? { ...i, quantity: Math.min(i.quantity + 1, 99) } : i,
      );
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const decrease = (id) => {
    setCartItems((prevItems) => {
      const updated = prevItems
        .map((i) =>
          i._id === id ? { ...i, quantity: Math.max(i.quantity - 1, 1) } : i,
        )
        .filter((i) => i.quantity > 0);
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updated = prevItems.filter((i) => i._id !== id);
      saveToLocalStorage(updated);
      return updated;
    });
  };

  const clearCart = () => {
    const updated = [];
    saveToLocalStorage(updated);
    setCartItems(updated);
  };

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
