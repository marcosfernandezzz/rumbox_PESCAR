"use client"

import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [loading, setLoading] = useState(true)

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("usuario")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUsuario(userData)
      }
    } catch (error) {
      console.error("Error al cargar usuario desde localStorage:", error)
      localStorage.removeItem("usuario")
    } finally {
      setLoading(false)
    }
  }, [])

  // Función de login
  const login = (userData) => {
    setUsuario(userData)
    localStorage.setItem("usuario", JSON.stringify(userData))
    if (userData.token) {
      localStorage.setItem("authToken", userData.token)
    }
  }

  // Función de logout
  const logout = () => {
    setUsuario(null)
    localStorage.removeItem("usuario")
    localStorage.removeItem("authToken")
    localStorage.removeItem("ultimaVenta")
  }

  // Actualizar usuario
  const updateUsuario = (updatedData) => {
    const newUserData = { ...usuario, ...updatedData }
    setUsuario(newUserData)
    localStorage.setItem("usuario", JSON.stringify(newUserData))
  }

  const value = {
    usuario,
    setUsuario: updateUsuario,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
