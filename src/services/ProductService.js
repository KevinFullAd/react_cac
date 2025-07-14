const BASE_URL = "https://68325fb8c3f2222a8cb22230.mockapi.io/api/v1/productos"; // reemplazar con tu endpoint real

const getRandomImage = (width = 150, height = 100) => {
    return `https://picsum.photos/${width}/${height}?random=${Math.floor(Math.random() * 1000)}`;
};


export const getProducts = async () => {
    const res = await fetch(BASE_URL); 
    const products = await res.json();
    if (!res.ok) throw new Error("Error al obtener productos");
    return products.map(product => ({
        ...product,
        image: product.image || getRandomImage(300, 200) // asignar imagen
    }));
};

export const createProduct = async (product) => {  
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    });
 
    if (!res.ok) throw new Error("Error al crear producto");
    return await res.json();
};

export const updateProduct = async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar producto");
    return await res.json();
};

export const deleteProduct = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar producto");
};
