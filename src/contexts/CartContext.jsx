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
      } catch {
        // ignore error
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
      const existingIndex = prevCart.findIndex(
        (p) =>
          p.productId === item.productId &&
          p.variant.color === item.variant.color,
      );

      const updatedCart = [...prevCart];

      if (existingIndex !== -1) {
        const existingItem = updatedCart[existingIndex];
        updatedCart[existingIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + item.quantity,
        };
      } else {
        updatedCart.push({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          variant: item.variant,
          quantity: item.quantity,
        });
      }

      return updatedCart;
    });
  };

  const updateQuantity = (productId, variant, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.variant.color === variant.color
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeFromCart = (productId, variant) => {
    setCartItems((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.productId === productId && item.variant.color === variant.color
          ),
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
