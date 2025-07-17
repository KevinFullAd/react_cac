import { useCart } from "../contexts/CartContext";

const CartPage = () => {
    const {
        cartItems,
        removeFromCart,
        clearCart,
        getCartTotalItems,
        getCartTotalPrice,
    } = useCart();

    if (cartItems.length === 0)
        return <p className="text-center" style={{ fontSize: "1.5rem", color: "#888"}}>Tu carrito está vacío 🛒</p>;

    return (
        <div className="container">
            <h2>Tu Carrito ({getCartTotalItems()} items)</h2>
            <ul className="list-group mb-3">
                {cartItems.map((item) => (
                    <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{item.title || item.name}</strong> x {item.qty}
                        </div>
                        <div>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                            <button
                                className="btn btn-sm btn-danger ms-3"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="d-flex justify-content-between align-items-center">
                <strong>Total: ${getCartTotalPrice().toFixed(2)}</strong>
                <div>
                    <button className="btn btn-warning me-2" onClick={clearCart}>
                        Vaciar Carrito
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={() => (alert("Compra finalizada. Gracias por tu compra!"), clearCart())}
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
