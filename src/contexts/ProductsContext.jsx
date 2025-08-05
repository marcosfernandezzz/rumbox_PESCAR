import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(Array.isArray(data) ? data : data.data || []);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar productos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ productos, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductsContext);
}