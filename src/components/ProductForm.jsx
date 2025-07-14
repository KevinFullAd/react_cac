import { useState, useEffect } from "react";
import { useProducts } from "../contexts/ProductContext";

const ProductForm = ({ existingProduct, onCancel }) => {
    const { addProduct, updateProduct } = useProducts();

    const initialForm = { name: "", price: "", description: "" };
    const [form, setForm] = useState(initialForm);

    // Si cambia el producto existente, actualiza el formulario o límpialo si no hay ninguno
    useEffect(() => {
        if (existingProduct) {
            setForm({
                name: existingProduct.name,
                price: existingProduct.price,
                description: existingProduct.description,
            });
        } else {
            setForm(initialForm); // limpia si ya no hay producto seleccionado
        }
    }, [existingProduct]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.name.trim()) return "El nombre es obligatorio";
        if (+form.price <= 0) return "El precio debe ser mayor a 0";
        if (form.description.length < 10) return "La descripción debe tener al menos 10 caracteres";
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validate();
        if (error) return alert(error);

        if (existingProduct) {
            updateProduct(existingProduct.id, form);
            onCancel(); // para cerrar modo edición
        } else {
            addProduct(form);
        }

        // Limpia el formulario después de cualquier acción
        setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>{existingProduct ? "Editar Producto" : "Nuevo Producto"}</h4>

            <input
                className="form-control my-2"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                required
            />

            <input
                className="form-control my-2"
                name="price"
                type="number"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
                required
            />

            <textarea
                className="form-control my-2"
                name="description"
                placeholder="Descripción"
                rows="3"
                value={form.description}
                onChange={handleChange}
                required
            />

            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                    {existingProduct ? "Actualizar" : "Agregar"}
                </button>
                {existingProduct && (
                    <button className="btn btn-secondary" type="button" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProductForm;
