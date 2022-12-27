import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";


const Context = createContext();

export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;


    const add = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
        setTotalQuantities((prevQuantity) => prevQuantity + quantity);

        if(checkProductInCart)
        {
            const updatedCartItems = cartItems.map((item) => {
                if(item._id === product._id)
                {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                }
            })
            setCartItems(updatedCartItems);
            toast.success(`${qty} ${product.name} added to the cart.`);
        }
        else
        {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }])        
            toast.success(`${qty} ${product.name} added to the cart.`);
        }

    }

    const remove = (product) => {

        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevPrice) => prevPrice - foundProduct.quantity * foundProduct.price);
        setTotalQuantities((prevQuantity) => prevQuantity - foundProduct.quantity);
        setCartItems(newCartItems);

    }

    const toggleCartItemQuantity = (id, value) => {

        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);            
        const newCartItems = cartItems.filter((item) => item._id !== id);

        if(value === 'ins')
        {        
            setCartItems((prevItems) => {
                prevItems[index] = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }];
                return prevItems;
            })
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevQuantity) => prevQuantity + 1);
        }
        else if(value === 'dec')
        {
            if(foundProduct.quantity > 1)
            {
                setCartItems((prevItems) => {
                    prevItems[index] = [...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }];
                    return prevItems;
                });
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevQuantity) => prevQuantity - 1);
            }
        }
    }

    const insQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty -1 < 1)
            {
                return 1;
            }
            return prevQty - 1;
        });
    }


    return (
        <Context.Provider value={{ showCart, cartItems, totalPrice, totalQuantities, qty, insQty, decQty, add, setShowCart, toggleCartItemQuantity, remove, setCartItems, setTotalPrice, setTotalQuantities }}>
            { children }
        </Context.Provider>
    )

}

export const useStateContext = () => useContext(Context);