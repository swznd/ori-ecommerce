import { createContext, useContext, useEffect, useState, useRef } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const isUpdating = useRef(false);

  // 🚀 Load data dari localStorage saat pertama kali
  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 💾 Simpan cart ke localStorage setelah initialized
  useEffect(() => {
    if (isInitialized && !isUpdating.current) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // 🛒 Tambahkan item ke cart (gabung jika sama)
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (p) =>
          p.productId === item.productId &&
          p.variant.color === item.variant.color,
      );

      const updatedCart = [...prev];

      if (existingIndex !== -1) {
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + item.quantity,
        };
      } else {
        updatedCart.push(item);
      }

      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// 🔁 Hook agar mudah digunakan di komponen
export const useCart = () => useContext(CartContext);
