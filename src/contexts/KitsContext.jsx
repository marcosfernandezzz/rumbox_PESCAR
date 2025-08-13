import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext"; // Importar AuthContext

const KitsContext = createContext();

export function KitsProvider({ children }) {
  const { usuario } = useContext(AuthContext); // Obtener el usuario del AuthContext
  const [kits, setKits] = useState([]);

  useEffect(() => {
    fetch("/api/kits")
      .then((res) => res.json())
      .then((data) => {
        setKits(Array.isArray(data) ? data : data.data || []);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });
  }, []);

  // Crear kit
  const addKit = async (nuevo) => {
    try {
      const formData = new FormData();
      Object.entries(nuevo).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (key === "productosIncluidos" && Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else if (key === "productosIncluidos" && typeof value === 'string') {
          value.split(',').map(item => item.trim()).filter(item => item !== '').forEach(prodId => {
            formData.append(key, prodId);
          });
        } else {
          formData.append(key, value);
        }
      });

      const res = await fetch("/api/kits", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${usuario?.token}`
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Error al agregar kit");
      }
      setKits((prev) => [...prev, data.data || data]);
    } catch (err) {
      console.error("Error al crear kit:", err);
    }
  };

  // Editar kit
  const updateKit = async (id, actualizado) => {
    try {
      const formData = new FormData();
      Object.entries(actualizado).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append("image", value);
        } else if (key === "productosIncluidos" && Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else if (key === "productosIncluidos" && typeof value === 'string') {
          value.split(',').map(item => item.trim()).filter(item => item !== '').forEach(prodId => {
            formData.append(key, prodId);
          });
        } else {
          formData.append(key, value);
        }
      });

      const res = await fetch(`/api/kits/${id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${usuario?.token}`
        },
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setKits((prev) => prev.map(k => k._id === id ? data.data || data : k));
      }
    } catch (err) {
      console.error("Error al editar kit:", err);
    }
  };

  // Borrar kit
  const deleteKit = async (id) => {
    try {
      console.log("KitsContext: Enviando token para deleteKit:", usuario?.token);
      const res = await fetch(`/api/kits/${id}`, { 
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${usuario?.token}` // Añadir el token
        }
      });
      if (res.ok) {
        setKits((prev) => prev.filter(k => k.id !== id));
      }
    } catch (err) {
      console.error("Error al borrar kit:", err);
    }
  };

  return (
    <KitsContext.Provider value={{ kits, addKit, updateKit, deleteKit }}>
      {children}
    </KitsContext.Provider>
  );
}

export function useKits() {
  return useContext(KitsContext);
}
