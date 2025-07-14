import { useProducts } from "../contexts/ProductContext";

const ProductList = ({ onEdit }) => {
    const { products, deleteProduct } = useProducts();

    if (products.length === 0) return <p>No hay productos cargados.</p>;

    return (
        <div className="list-group">
        {products.map(prod => (
            <div
            key={prod.id}
            className="list-group-item d-flex justify-content-between align-items-center"
            >
            <div>
                <strong>{prod.name}</strong> — ${prod.price}
                <br />
                <small>{prod.description}</small>
            </div>
            <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(prod)}>
                Editar
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => {
                if (confirm(`¿Eliminar ${prod.name}?`)) deleteProduct(prod.id);
                }}>
                Eliminar
                </button>
            </div>
            </div>
        ))}
        </div>
    );
};

export default ProductList;
