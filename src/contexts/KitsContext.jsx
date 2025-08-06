import { createContext, useContext, useEffect, useState } from "react";

const KitsContext = createContext();

export function KitsProvider({ children }) {
  const [kits, setKits] = useState([]);
  

  useEffect(() => {
    fetch("/api/kits")
      .then((res) => res.json())
      .then((data) => {
        setKits(Array.isArray(data) ? data : data.data || []);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
      });
  }, []);

  return (
    <KitsContext.Provider value={{ kits }}>
      {children}
    </KitsContext.Provider>
  );
}

export function useKits() {
  return useContext(KitsContext);
}