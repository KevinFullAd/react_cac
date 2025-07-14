import { useState } from "react";
import { useProducts } from "../contexts/ProductContext";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { Helmet } from "react-helmet";

const AdminPanel = () => {
    const { products, loading } = useProducts();
    const [editingProduct, setEditingProduct] = useState(null); // producto a editar

    return (
        <div className="container">
        <Helmet>
            <title>Admin | E-Shop</title>
        </Helmet>

        <h2 className="my-4">Panel de Administración</h2>

        {/* Formulario para agregar o editar */}
        <ProductForm
            existingProduct={editingProduct}
            onCancel={() => setEditingProduct(null)}
        />

        <hr className="my-4" />

        <h4>Productos existentes</h4>
        {loading ? (
            <p>Cargando productos...</p>
        ) : (
            <ProductList onEdit={setEditingProduct} />
        )}
        </div>
    );
};

export default AdminPanel;
