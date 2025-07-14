import { useState } from "react";
import { useProducts } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";

const Store = () => {
    const { products } = useProducts();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("todos");

    const filtered = products.filter(p => {
        const nameMatch = p.name.toLowerCase().includes(search.toLowerCase());
        const categoryMatch = category === "todos" || p.category?.toLowerCase() === category.toLowerCase();
        return nameMatch && categoryMatch;
    });

    const categoriasUnicas = ["todos", ...new Set(products.map(p => p.category).filter(Boolean))];

    return (
        <div className="container mt-4">
        <h2 className="mb-4">🛍️ Catálogo de Productos</h2>

        <div className="row mb-4">
            <div className="col-md-6 mb-2">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </div>
            <div className="col-md-6 mb-2">
            <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                {categoriasUnicas.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
                ))}
            </select>
            </div>
        </div>

        {filtered.length === 0 ? (
            <p>No se encontraron productos.</p>
        ) : (
            <div className="row">
            {filtered.map(p => (

                <div className="col-md-4 mb-4" key={p.id}>
                    <ProductCard product={p} />
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default Store; 