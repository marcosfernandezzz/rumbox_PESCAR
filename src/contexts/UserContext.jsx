
import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";

const UserContext = createContext();

export function UserProvider({ children }) {
  const { usuario: authUsuario } = useContext(AuthContext);
  const [usuario, setUsuario] = useState(null);

  // Sincroniza el usuario de AuthContext al inicializar
  useEffect(() => {
    if (authUsuario) setUsuario(authUsuario);
  }, [authUsuario]);

  // PATCH para actualizar usuario
  const updateUser = async (userId, updateBody) => {
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateBody),
      });
      if (!response.ok) {
        throw new Error('No se pudo actualizar el usuario.');
      }
      const data = await response.json();
      setUsuario(data);
      return data;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      throw error;
    }
  };

  // Función para agregar un producto al inventario del usuario
  const addToCart = async (productId) => {
    console.log("Intentando agregar al carrito", productId, usuario);
    if (!usuario) return;
    const nuevoInventario = Array.isArray(usuario.inventario)
      ? [...usuario.inventario, productId]
      : [productId];
    setUsuario({ ...usuario, inventario: nuevoInventario });
    // Persiste el cambio en el backend
    await updateUser(usuario._id, { inventario: nuevoInventario });
  };

  return (
    <UserContext.Provider value={{ usuario, setUsuario, updateUser, addToCart }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}