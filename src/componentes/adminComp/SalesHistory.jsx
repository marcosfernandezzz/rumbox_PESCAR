"use client"

import { useEffect, useState } from "react"

const SalesHistory = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        const token = storedUser ? storedUser.token : null;
        
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

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

  const formatProducts = (products) => {
    if (!products || products.length === 0) return "Sin productos"

    return products
      .map((product) => {
        const name = product.itemId?.nombre || 'Producto no encontrado';
        const quantity = product.quantity || 1
        return `${name} (x${quantity})`
      })
      .join(", ")
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
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">ID de Venta</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Usuario</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Productos</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Total</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sales.map((sale, index) => (
                <tr key={sale._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-4 px-6 text-sm text-gray-900 font-mono">{sale._id}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{sale.userId?.name || "N/A"}</td>
                  <td className="py-4 px-6 text-sm text-gray-700 max-w-xs">
                    <div className="truncate" title={formatProducts(sale.products)}>
                      {formatProducts(sale.products)}
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
