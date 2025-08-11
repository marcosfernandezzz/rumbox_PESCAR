import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext"; // Importar AuthContext

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const { usuario } = useContext(AuthContext); // Obtener el usuario del AuthContext
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      });
  }, []);

  // Crear producto
  const addProduct = async (nuevo) => {
    try {
      console.log("ProductsContext: Enviando token para addProduct:", usuario?.token);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}` // Añadir el token
        },
        body: JSON.stringify(nuevo)
      });
      const data = await res.json();
      if (res.ok) {
        setProductos((prev) => [...prev, data.data || data]);
      }
    } catch (err) {
      console.error("Error al crear producto:", err);
    }
  };

  // Editar producto
  const updateProduct = async (id, actualizado) => {
    try {
      console.log("ProductsContext: Enviando token para updateProduct:", usuario?.token);
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}` // Añadir el token
        },
        body: JSON.stringify(actualizado)
      });
      const data = await res.json();
      console.log("ProductsContext: ID de producto a actualizar:", id);
      console.log("ProductsContext: Datos recibidos de la actualización:", data);
      if (res.ok) {
        setProductos((prev) => prev.map(p => p._id === id ? data.data || data : p)); // Cambiado p.id a p._id
      }
    } catch (err) {
      console.error("Error al editar producto:", err);
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
        setProductos((prev) => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Error al borrar producto:", err);
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
