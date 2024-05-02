"use client";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };
  const addToCart = async ({
    product_id,
    name,
    price,
    image,
    quantity = 1,
  }) => {
    const items = {
      product_id,
      name,
      price,
      image,
      quantity,
    };
    console.log(items);
    const isItemExist = cart?.cartItems?.find(
      (i) => i?.product_id === items.product_id
    );
    let newCartItems;
    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product_id === isItemExist.product_id ? items : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), items];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItem = cart?.cartItems?.filter((i) => i.product_id != id);
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItem }));
    setCartToState();
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, deleteItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
