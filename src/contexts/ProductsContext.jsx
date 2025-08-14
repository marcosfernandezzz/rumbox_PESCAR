"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { AuthContext } from "./AuthContext" // Import AuthContext

const ProductsContext = createContext()

export const useProductos = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error("useProductos debe ser usado dentro de un ProductsProvider")
  }
  return context
}

export function ProductsProvider({ children }) {
  const { usuario } = useContext(AuthContext) // Obtener el usuario del AuthContext
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  // Cargar productos al inicializar
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProductos(Array.isArray(data) ? data : data.data || [])
    } catch (error) {
      console.error("Error al cargar productos:", error)
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (productData) => {
    try {
      const formData = new FormData()

      // Agregar todos los campos del producto al FormData
      Object.keys(productData).forEach((key) => {
        if (productData[key] !== null && productData[key] !== undefined) {
          formData.append(key, productData[key])
        }
      })

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al agregar producto")
      }

      const newProduct = await response.json()
      setProductos((prev) => [...prev, newProduct])
      return newProduct
    } catch (error) {
      console.error("Error agregando producto:", error)
      throw error
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      const formData = new FormData()

      // Agregar todos los campos del producto al FormData
      Object.keys(productData).forEach((key) => {
        if (productData[key] !== null && productData[key] !== undefined) {
          formData.append(key, productData[key])
        }
      })

      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al actualizar producto")
      }

      const updatedProduct = await response.json()
      setProductos((prev) => prev.map((p) => (p._id === id ? updatedProduct : p)))
      return updatedProduct
    } catch (error) {
      console.error("Error actualizando producto:", error)
      throw error
    }
  }

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al eliminar producto")
      }

      setProductos((prev) => prev.filter((p) => p._id !== id))
    } catch (error) {
      console.error("Error eliminando producto:", error)
      throw error
    }
  }

  const getProductById = (id) => {
    return productos.find((p) => p._id === id)
  }

  const getProductsByCategory = (categoria) => {
    return productos.filter((p) => p.categoria === categoria)
  }

  const value = {
    productos,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    fetchProducts,
  }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export default ProductsContext
