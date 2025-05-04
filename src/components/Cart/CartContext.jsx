// src/components/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id && item.selectedSize === product.selectedSize && item.selectedColor === product.selectedColor);

      if (existingItemIndex !== -1) {
        // If the item exists, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // Otherwise, add the new product with a quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const getCartItems = () => {
    return cartItems;
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
