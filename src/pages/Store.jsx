import { useState } from "react";
import { useProducts } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";

const PRODUCTS_PER_PAGE = 6;

const Store = () => {
    const { products } = useProducts();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Todos");
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = products.filter(p => {
        const nameMatch = (p.title || "").toLowerCase().includes(search.toLowerCase());
        const categoryMatch = category === "Todos" || (p.category || "").toLowerCase() === category.toLowerCase();
        return nameMatch && categoryMatch;
    });

    const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginated = filtered.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const categoriasUnicas = ["Todos", ...new Set(products.map(p => p.category).filter(Boolean))];

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="container mt-4" style={{ minHeight: "80vh" }}>
            <h2 className="mb-4">🛍️ Catálogo de Productos</h2>

            <div className="row mb-4">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        {categoriasUnicas.map((cat, idx) => (
                            <option style={{ textTransform: "capitalize" }} key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {paginated.length === 0 ? (
                <p>No se encontraron productos.</p>
            ) : (
                <div className="row">
                    {paginated.map(p => (
                        <div className="col-md-4 mb-4" key={p.id}>
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center flex-wrap mt-4 gap-2">
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        ⬅️
                    </button>

                    {Array.from({ length: totalPages }, (_, idx) => {
                        const page = idx + 1;
                        return (
                            <button
                                key={page}
                                className={`btn btn-sm ${page === currentPage ? "btn-primary" : "btn-outline-primary"
                                    }`}
                                onClick={() => goToPage(page)}
                            >
                                {page}
                            </button>
                        );
                    })}

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        ➡️
                    </button>
                </div>
            )}

        </div>
    );
};

export default Store;
