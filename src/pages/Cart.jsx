import { useCart } from "../contexts/CartContext";

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

    return (
        <div className="container mt-5">
        <h2>Tu Carrito</h2>
        {cartItems.length === 0 ? (
            <p>El carrito está vacío</p>
        ) : (
            <ul className="list-group">
            {cartItems.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                {item.nombre} x {item.qty}
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                </li>
            ))}
            </ul>
        )}
        <button className="btn btn-warning mt-3" onClick={clearCart}>Vaciar carrito</button>
        </div>
    );
};

export default Cart;
