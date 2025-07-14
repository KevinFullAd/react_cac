import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as api from "../services/ProductService";

const ProductContext = createContext();
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
        const data = await api.getProducts();
        setProducts(data);
        } catch (error) {
        toast.error("Error al cargar productos");
        } finally {
        setLoading(false);
        }
    };

    const addProduct = async (product) => {
        try {
        const newProduct = await api.createProduct(product);
        setProducts(prev => [...prev, newProduct]);
        toast.success("Producto agregado");
        } catch {
        toast.error("Error al agregar producto");
        }
    };

    const updateProduct = async (id, data) => {
        try {
        const updated = await api.updateProduct(id, data);
        setProducts(prev => prev.map(p => p.id === id ? updated : p));
        toast.success("Producto actualizado");
        } catch {
        toast.error("Error al actualizar");
        }
    };

    const deleteProduct = async (id) => {
        try {
        await api.deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        toast.success("Producto eliminado");
        } catch {
        toast.error("No se pudo eliminar");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts
        }}>
        {children}
        </ProductContext.Provider>
    );
};
