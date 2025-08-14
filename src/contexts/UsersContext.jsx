import { createContext, useContext, useEffect, useState } from "react";
const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [Users, setUsers] = useState([]);
  

  useEffect(() => {
  fetch("https://rumbox-pescar.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : data.data || []);
        console.log(data);
        
      })
      .catch((error) => {
        console.error("Error al cargar datos de Usuarios", error);
        
      });
  }, []);

  return (
    <UsersContext.Provider value={{ Users }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}