import { useProducts } from "../contexts/ProductContext";

const ProductList = ({ onEdit }) => {
    const { products, deleteProduct } = useProducts();

    if (products.length === 0) return <p>No hay productos cargados.</p>;

    return (
        <div className="list-group">
            {products.map((prod) => (
                <div
                    key={prod.id}
                    className="list-group-item d-flex justify-content-between align-items-start flex-wrap py-3"
                >
                    <div className="me-auto" style={{ maxWidth: "900px" }}>
                        <h5 className="mb-1">{prod.name || prod.title}</h5>
                        <p className="mb-1 text-muted">${prod.price}</p>
                        <small className="text-secondary">{prod.description}</small>
                    </div>

                    <div className="btn-group">
                        <button
                            className="btn btn-sm btn-outline-warning"
                            onClick={() => onEdit(prod)}
                        >
                            Editar
                        </button>
                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => {
                                if (confirm(`¿Eliminar ${prod.name}?`)) deleteProduct(prod.id);
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
