"use client"

import { useEffect, useState } from "react"
import { useProductos } from "../../contexts/ProductsContext.jsx"
import { useKits } from "../../contexts/KitsContext.jsx"

const SalesHistory = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { productos } = useProductos()
  const { kits } = useKits()

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("authToken")
        console.log("TOKEN ENVIADO:", token)
        const response = await fetch("/api/sales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error("Error al obtener los datos de ventas")
        }
        const data = await response.json()
        setSales(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSales()
  }, [])

  const getItemName = (itemId, itemType) => {
    console.log("Buscando item:", { itemId, itemType })
    console.log("Productos disponibles:", productos.length)
    console.log("Kits disponibles:", kits.length)

    const searchId = String(itemId)
    console.log("ID a buscar (como string):", searchId)

    if (itemType === "Product") {
      console.log(
        "IDs de productos:",
        productos.map((p) => ({ id: String(p._id), nombre: p.nombre })),
      )
      const product = productos.find((p) => String(p._id) === searchId)
      console.log("Producto encontrado:", product)
      return product ? product.nombre : `Producto no encontrado (${searchId})`
    } else if (itemType === "Kit") {
      console.log(
        "IDs de kits:",
        kits.map((k) => ({ id: String(k._id), nombre: k.nombre })),
      )
      const kit = kits.find((k) => String(k._id) === searchId)
      console.log("Kit encontrado:", kit)
      return kit ? kit.nombre : `Kit no encontrado (${searchId})`
    }
    return "Item desconocido"
  }

  const formatProducts = (products) => {
    if (!products || products.length === 0) return "Sin productos"

    console.log("Productos de la venta:", products)

    return products.map((product) => {
      const name = getItemName(product.itemId, product.itemType)
      const quantity = product.quantity || 1
      return { name, quantity }
    })
  }

  if (loading) {
    return <div>Cargando historial de ventas...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Historial de Ventas</h2>
        <p className="text-gray-600">Consulta todas las ventas realizadas</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 w-1/6">ID de Venta</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 w-1/6">Usuario</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 w-2/6">Productos</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 w-1/6">Total</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 w-1/6">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.map((sale, index) => (
                <tr key={sale._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-4 px-6 text-sm text-gray-900 font-mono">{sale._id}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{sale.userId?.name || "N/A"}</td>
                  <td className="py-4 px-6 text-sm text-gray-700">
                    <div className="space-y-1">
                      {formatProducts(sale.products).map((product, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded text-xs"
                        >
                          <span className="font-medium">{product.name}</span>
                          <span className="text-gray-600">x{product.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold text-green-600">${sale.totalAmount.toFixed(2)}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {new Date(sale.createdAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {sales.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Total de ventas: {sales.length}</span>
              <span>Total recaudado: ${sales.reduce((sum, sale) => sum + sale.totalAmount, 0).toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SalesHistory
