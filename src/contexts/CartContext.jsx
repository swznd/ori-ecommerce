import { createContext, useEffect, useState, useRef } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [note, setNote] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const isUpdating = useRef(false);
  const cartRef = useRef(cartItems);

  // Keep latest cartItems in ref
  useEffect(() => {
    cartRef.current = cartItems;
  }, [cartItems]);

  // Load cart & note from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedNote = localStorage.getItem('cartNote');

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch {
        // ignore error
      }
    }

    if (storedNote) {
      setNote(storedNote);
    }

    setIsInitialized(true);
  }, []);

  // Auto save cartItems to localStorage
  useEffect(() => {
    if (isInitialized && !isUpdating.current) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // Auto save note to localStorage
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cartNote', note);
    }
  }, [note, isInitialized]);

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
          details: item.details,
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
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        note, // expose note
        setNote, // expose setNote
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
