import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        navigate("/cart");
    };

    return (
        <div className="container mt-5"> 
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
            <input className="form-control mb-2" placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required />
            <input className="form-control mb-2" placeholder="Contraseña" value={password} type="password" onChange={e => setPassword(e.target.value)} required />
            <button className="btn btn-primary" type="submit">Ingresar</button>
        </form>
        </div>
    );
};

export default Login;
