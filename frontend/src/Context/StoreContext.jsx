import React, { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { food_list } from "../assets/assets";
import { login, signup } from "./api";

export const StoreContext = createContext(null);



const StoreContextProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
     const [user, setUser] = useState(null);
     const [token, setToken] = useState(null);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems({ ...cartItems, [itemId]: 1 });
        } else {
            setCartItems({ ...cartItems, [itemId]: cartItems[itemId] + 1 });
        }
    };

    const removeFromCart = (itemId) => {
        if (cartItems[itemId] === 1) {
            const newCartItems = { ...cartItems };
            delete newCartItems[itemId];
            setCartItems(newCartItems);
        } else {
            setCartItems({ ...cartItems, [itemId]: cartItems[itemId] - 1 });
        }
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const item in cartItems) {
            const foodItem = food_list.find((food) => food._id === item);
            total += foodItem.price * cartItems[item];
        }
        return total*10;
    };

     const handleSignup = async (userData) => {
       try {
         const data = await signup(userData);
         setUser(data.user);
         setToken(data.token);
         localStorage.setItem("token", data.token); // Store token in localStorage
       } catch (error) {
         console.error("Signup failed:", error.message);
       }
     };

     const handleLogin = async (credentials) => {
       try {
         const data = await login(credentials);
         setUser(data.user);
         setToken(data.token);
         localStorage.setItem("token", data.token); // Store token in localStorage
       } catch (error) {
         console.error("Login failed:", error.message);
       }
     };

     const handleLogout = () => {
       setUser(null);
       setToken(null);
       localStorage.removeItem("token");
     };
    const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      handleSignup,
      handleLogin,
      handleLogout,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreContextProvider;
