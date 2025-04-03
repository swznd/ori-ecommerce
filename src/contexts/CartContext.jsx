import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // 🛒 Tambahkan item ke cart
  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  // 🧪 Debug: cek cart berubah
  useEffect(() => {
    console.log('🛒 Cart updated:', cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 🔁 Custom hook untuk akses context lebih mudah
export const useCart = () => useContext(CartContext);
