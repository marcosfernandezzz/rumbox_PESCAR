import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // 🔁 Al cargar la app, revisamos si ya hay un usuario guardado
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      const parsedUser = JSON.parse(usuarioGuardado);
      setUsuario(parsedUser);
      console.log("AuthContext: Usuario cargado desde localStorage:", parsedUser);
    }
  }, []);

  const login = (datosUsuarioConToken) => { // Cambiar el nombre del parámetro para mayor claridad
    // Asegurarse de que el inventario siempre sea un array y que el token esté incluido
    const usuarioNormalizado = {
      ...datosUsuarioConToken,
      inventario: Array.isArray(datosUsuarioConToken.inventario) ? datosUsuarioConToken.inventario : [],
    };
    setUsuario(usuarioNormalizado);
    localStorage.setItem("usuario", JSON.stringify(usuarioNormalizado));
    console.log("AuthContext: Usuario logueado:", usuarioNormalizado);
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
