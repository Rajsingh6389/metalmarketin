import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find((p) => p.id === product.id);
    if (exists) {
      setCart(cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
  };
  const updateCart = (product, quantity) => {
    if (quantity <= 0) {
      removeFromCart(product.id);
    } else {
      setCart(cart.map(p =>
        p.id === product.id ? { ...p, quantity } : p
      ));
    }
  };

  const removeFromCart = (id) => setCart(cart.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart,updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
