import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const localData = localStorage.getItem("products");
        if (localData) {
            setProducts(JSON.parse(localData));
        } else {
            fetch("https://fakestoreapi.com/products")
                .then(res => res.json())
                .then(data => {
                    setProducts(data);
                    localStorage.setItem("products", JSON.stringify(data));
                });
        }
    }, []);

    const addProduct = (product) => {
        const updated = [...products, product];
        setProducts(updated);
        localStorage.setItem("products", JSON.stringify(updated));
        toast.success(`Producto ${product.title || product.name} agregado con éxito`);
    };

    const updateProduct = (updatedProduct) => {
        const updated = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
        setProducts(updated);
        localStorage.setItem("products", JSON.stringify(updated));
        toast.success(`Producto ${updatedProduct.title || updatedProduct.name} actualizado con éxito`);
    };

    const deleteProduct = (id) => {
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
        toast.success(`Producto eliminado con éxito`);
        localStorage.setItem("products", JSON.stringify(updated));
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            updateProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};
