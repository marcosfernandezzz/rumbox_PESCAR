import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
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
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado)
      });
      const data = await res.json();
      if (res.ok) {
        setProductos((prev) => prev.map(p => p.id === id ? data.data || data : p));
      }
    } catch (err) {
      console.error("Error al editar producto:", err);
    }
  };

  // Borrar producto
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
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