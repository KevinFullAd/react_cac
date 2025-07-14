import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductContext";

const Home = () => {
    const { products } = useProducts();
    const destacados = products.slice(0, 3); // primeros 3

    return (
        <div className="container mt-5 text-center">
        <h1 className="mb-4">Bienvenido a E-Shop</h1>
        <p>Los mejores productos a un click de distancia 🚀</p>
        <Link to="/tienda" className="btn btn-primary mt-3">Ver Productos</Link>

        <hr className="my-5" />

        <h3>🔥 Productos Destacados</h3>
        <div className="row mt-4">
            {destacados.map(p => (
            <div className="col-md-4 mb-4" key={p.id}>
                <div className="card h-100">
                <img src={p.image || "https://via.placeholder.com/300"} className="card-img-top" alt={p.name} />
                <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p><strong>${p.price}</strong></p>
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default Home;
