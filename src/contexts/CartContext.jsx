import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        if (!product || !product.id) {
            toast.error("Producto no válido");
            return;
        }

        const existingItem = cartItems.find(item => item.id === product.id);

        if (existingItem) {
            const updatedItems = cartItems.map(item =>
                item.id === product.id ? { ...item, qty: item.qty + 1 } : item
            );
            setCartItems(updatedItems);
            toast.success(`Se agregó otra unidad de ${product.name}`);
        } else {
            const updatedItems = [...cartItems, { ...product, qty: 1 }];
            setCartItems(updatedItems);
            toast.success(`${product.name} se agregó al carrito 🛒`);
        }
    };

    const removeFromCart = (productId) => {
        const productToRemove = cartItems.find(item => item.id === productId);

        if (!productToRemove) {
            toast.error("Producto no encontrado");
            return;
        }

        const updatedItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedItems);
        toast.error(`${productToRemove.name} se eliminó del carrito ❌`);
    };

    const clearCart = () => {
        setCartItems([]);
        toast.warning("Carrito vaciado 🗑️");
    };

    const getCartTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    };

    const getCartTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotalItems,
                getCartTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
