import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            🛒 E-Shop
        </span>

        <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/cart">
                <FaShoppingCart /> Carrito ({cartItems.length})
                </Link>
            </li>
            </ul>
            <ul className="navbar-nav ms-auto">
            {user?.isAdmin && (
            <li className="nav-item">
                <Link to="/admin" className="nav-link">Panel Admin</Link>
            </li>
            )}

            {user ? (
            <>
                <li className="nav-item">
                <span className="nav-link">Hola, {user.username}</span>
                </li>
                <li className="nav-item">
                <button onClick={logout} className="btn btn-outline-light btn-sm ms-2">Salir</button>
                </li>
            </>
            ) : (
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            )}
            </ul>
        </div>
        </nav>
    );
};

export default Navbar;
