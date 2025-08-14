import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext"; // Importar AuthContext

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { usuario } = useContext(AuthContext); // Obtener el usuario del AuthContext
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://rumbox-pescar.onrender.com/api/products");
      const data = await res.json();
      setProductos(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Crear producto
  const addProduct = async (nuevo) => {
    try {
      const formData = new FormData();
      Object.entries(nuevo).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else {
          formData.append(key, value);
        }
      });
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${usuario?.token}`
        },
        body: formData
      });
      console.log("ProductsContext: Respuesta HTTP cruda:", res); // Log de depuración de la respuesta HTTP
      console.log("ProductsContext: res.ok:", res.ok); // Log de depuración de res.ok
      console.log("ProductsContext: res.status:", res.status); // Log de depuración de res.status

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Error desconocido o respuesta no JSON" }));
        console.error("ProductsContext: Error de respuesta del servidor:", errorData);
        throw new Error(errorData.message || `Error al agregar producto: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("ProductsContext: Respuesta del servidor al agregar producto (JSON):", data); // Log de depuración
      
      // Después de agregar, recargar la lista de productos
      await fetchProducts(); 
      // Después de agregar, recargar la lista de productos
      await fetchProducts(); 
    } catch (err) {
      console.error("Error al crear producto:", err);
      throw err; // Re-lanzar el error para que el componente que llama pueda manejarlo
    }
  };

  // Editar producto
  const updateProduct = async (id, actualizado) => {
    try {
      const formData = new FormData();
      Object.entries(actualizado).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else {
          formData.append(key, value);
        }
      });
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${usuario?.token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al editar producto");
      }
      // Después de editar, recargar la lista de productos
      await fetchProducts();
    } catch (err) {
      console.error("Error al editar producto:", err);
      throw err; // Re-lanzar el error
    }
  };

  // Borrar producto
  const deleteProduct = async (id) => {
    try {
      console.log("ProductsContext: Enviando token para deleteProduct:", usuario?.token);
      const res = await fetch(`/api/products/${id}`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${usuario?.token}` // Añadir el token
        }
      });
      if (res.ok) {
        setProductos((prev) => prev.filter(p => p._id !== id)); // Cambiar p.id a p._id
        await fetchProducts(); // Recargar la lista después de eliminar para asegurar la sincronización
      }
    } catch (err) {
      console.error("Error al borrar producto:", err);
      throw err; // Re-lanzar el error
    }
  };

  return (
    <ProductsContext.Provider value={{ productos, loading, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductsContext);
}
