import { useState, useEffect } from "react";
import { useProducts } from "../contexts/ProductContext";

const ProductForm = ({ existingProduct, onCancel }) => {
    const { addProduct, updateProduct } = useProducts();

    const initialForm = {
        title: "",
        price: "",
        description: "",
        category: "otros",
        image: ""
    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (existingProduct) {
            setForm({
                title: existingProduct.title,
                price: existingProduct.price,
                description: existingProduct.description,
                category: existingProduct.category || "otros",
                image: existingProduct.image || ""
            });
        } else {
            setForm(initialForm);
        }
    }, [existingProduct]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.title.trim()) return "El título es obligatorio";
        if (+form.price <= 0) return "El precio debe ser mayor a 0";
        if (form.description.length < 10) return "La descripción debe tener al menos 10 caracteres";
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const error = validate();
        if (error) return alert(error);

        if (existingProduct) {
            updateProduct({ ...existingProduct, ...form });
            onCancel();
        } else {
            const newProduct = {
                id: Date.now(), // ID único
                ...form
            };
            addProduct(newProduct);
        }

        setForm(initialForm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h4>{existingProduct ? "Editar Producto" : "Nuevo Producto"}</h4>

            <input
                className="form-control my-2"
                name="title"
                placeholder="Título"
                value={form.title}
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

            <input
                className="form-control my-2"
                name="category"
                placeholder="Categoría"
                value={form.category}
                onChange={handleChange}
            />

            <input
                className="form-control my-2"
                name="image"
                placeholder="URL de imagen"
                value={form.image}
                onChange={handleChange}
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
