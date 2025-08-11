import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // 🔁 Al cargar la app, revisamos si ya hay un usuario guardado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = (datosUsuario) => {
    // Asegurarse de que el inventario siempre sea un array
    const usuarioNormalizado = {
      ...datosUsuario,
      inventario: Array.isArray(datosUsuario.inventario) ? datosUsuario.inventario : [],
    };
    setUsuario(usuarioNormalizado);
    localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
