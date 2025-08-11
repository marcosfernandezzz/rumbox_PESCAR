import { createContext, useContext, useEffect, useState } from "react";

const KitsContext = createContext();

export function KitsProvider({ children }) {
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
      const res = await fetch("/api/kits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      const res = await fetch(`/api/kits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
      const res = await fetch(`/api/kits/${id}`, { method: "DELETE" });
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