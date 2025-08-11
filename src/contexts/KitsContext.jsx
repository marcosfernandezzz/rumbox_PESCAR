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
      console.log("KitsContext: Enviando token para addKit:", usuario?.token);
      const res = await fetch("/api/kits", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}` // Añadir el token
        },
        body: JSON.stringify(nuevo)
      });
      const data = await res.json();
      if (res.ok) {
        setKits((prev) => [...prev, data.data || data]);
      }
    } catch (err) {
      console.error("Error al crear kit:", err);
    }
  };

  // Editar kit
  const updateKit = async (id, actualizado) => {
    try {
      console.log("KitsContext: Enviando token para updateKit:", usuario?.token);
      const res = await await fetch(`/api/kits/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${usuario?.token}` // Añadir el token
        },
        body: JSON.stringify(actualizado)
      });
      const data = await res.json();
      if (res.ok) {
        setKits((prev) => prev.map(k => k.id === id ? data.data || data : k));
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
