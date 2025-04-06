import { createContext, useEffect, useState, useRef } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const isUpdating = useRef(false);
  const cartRef = useRef(cartItems);

  useEffect(() => {
    cartRef.current = cartItems;
  }, [cartItems]);

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

  useEffect(() => {
    if (isInitialized && !isUpdating.current) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  const addToCart = (item) => {
    setCartItems((prevCart) => {
      // Cari apakah item sudah ada di cart
      const existingIndex = prevCart.findIndex(
        (p) =>
          p.productId === item.productId &&
          p.variant.color === item.variant.color,
      );

      // Salin cart lama
      const updatedCart = [...prevCart];

      if (existingIndex !== -1) {
        // Jika item sudah ada, update quantity dengan yang baru
        const existingItem = updatedCart[existingIndex];
        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        };
      } else {
        // Jika item belum ada, tambahkan baru
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

export default CartContext;
