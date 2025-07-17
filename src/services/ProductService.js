const BASE_URL = "https://fakestoreapi.com/products";

export const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) throw new Error("Error al obtener productos");
    return await res.json();
};

export const createProduct = async (product) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("Error al crear producto");
    return await res.json();
};

export const updateProduct = async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al actualizar producto");
    return await res.json();
};

export const deleteProduct = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar producto");
    return await res.json(); // FakeStoreAPI devuelve el objeto eliminado
};
