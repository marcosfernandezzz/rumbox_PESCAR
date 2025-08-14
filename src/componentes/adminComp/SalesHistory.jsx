import { useEffect, useState } from "react"
import { useProductos } from "../../contexts/ProductsContext.jsx"
import { useKits } from "../../contexts/KitsContext.jsx"

const SalesHistory = () => {
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { productos } = useProductos()
  const { kits } = useKits()

  // Estado para controlar si los datos de contexto están listos
  const [contextDataReady, setContextDataReady] = useState(false)

  // Verificar si los datos del contexto están listos
  useEffect(() => {
    if (productos.length > 0 || kits.length > 0) {
      setContextDataReady(true)
      console.log("Datos del contexto listos:", { productos: productos.length, kits: kits.length })
    }
  }, [productos, kits])

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("authToken")
        console.log("TOKEN ENVIADO:", token)
        
        const response = await fetch("https://rumbox-pescar.onrender.com/api/sales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        
        if (!response.ok) {
          throw new Error("Error al obtener los datos de ventas")
        }
        
        const data = await response.json()
        console.log("Datos de ventas recibidos:", data)
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
    console.log("Buscando item:", { itemId, itemType, contextDataReady })
    console.log("ItemId tipo:", typeof itemId, "Valor completo:", JSON.stringify(itemId))
    
    if (!contextDataReady) {
      return `Cargando... (${itemType})`
    }

    // Normalizar el ID para comparación
    const normalizeId = (id) => {
      // Caso 1: Object con $oid (MongoDB ObjectId serializado)
      if (typeof id === 'object' && id !== null && id.$oid) {
        return String(id.$oid).trim()
      }
      // Caso 2: Object con _id (documento completo)
      if (typeof id === 'object' && id !== null && id._id) {
        return normalizeId(id._id) // Recursión para manejar _id que también puede ser objeto
      }
      // Caso 3: String normal
      if (typeof id === 'string') {
        return id.trim()
      }
      // Caso 4: Otros tipos, convertir a string
      return String(id).trim()
    }

    const searchId = normalizeId(itemId)
    console.log("ID normalizado a buscar:", searchId)

    if (itemType === "Product" || itemType === "product") {
      console.log("Productos disponibles:", productos.map(p => ({
        id: normalizeId(p._id),
        nombre: p.nombre
      })))
      
      const product = productos.find(p => normalizeId(p._id) === searchId)
      console.log("Producto encontrado:", product)
      return product ? product.nombre : `Producto no encontrado (${searchId})`
    } 
    
    if (itemType === "Kit" || itemType === "kit") {
      console.log("Kits disponibles:", kits.map(k => ({
        id: normalizeId(k._id),
        nombre: k.nombre
      })))
      
      const kit = kits.find(k => normalizeId(k._id) === searchId)
      console.log("Kit encontrado:", kit)
      return kit ? kit.nombre : `Kit no encontrado (${searchId})`
    }
    
    return `Item desconocido (${itemType}): ${searchId}`
  }

  const formatProducts = (products) => {
    if (!products || products.length === 0) return []

    console.log("Formateando productos de la venta:", products)

    return products.map((product, index) => {
      // Intentar diferentes propiedades para obtener el ID del item
      const itemId = product.itemId || product.item || product.productId || product._id
      const itemType = product.itemType || product.type || 'unknown'
      
      console.log("Producto individual:", { product, itemId, itemType })
      
      const name = getItemName(itemId, itemType)
      const quantity = product.quantity || 1
      return { 
        id: `${JSON.stringify(itemId)}-${index}`, 
        name, 
        quantity 
      }
    })
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando historial de ventas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">Error al cargar datos</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (sales.length === 0) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Historial de Ventas</h2>
          <p className="text-gray-600">Consulta todas las ventas realizadas</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">No hay ventas registradas aún.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Historial de Ventas</h2>
        <p className="text-gray-600">Consulta todas las ventas realizadas</p>
        {!contextDataReady && (
          <div className="mt-2 text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded">
            ⚠️ Cargando datos de productos y kits...
          </div>
        )}
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
              {sales.map((sale, index) => {
                const formattedProducts = formatProducts(sale.products)
                return (
                  <tr key={sale._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-4 px-6 text-sm text-gray-900 font-mono">
                      {String(sale._id).slice(-8)}...
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {sale.userId?.name || sale.customerName || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-700">
                      {formattedProducts.length > 0 ? (
                        <div className="space-y-1">
                          {formattedProducts.map((product) => (
                            <div
                              key={product.id}
                              className="flex justify-between items-center bg-gray-100 px-2 py-1 rounded text-xs"
                            >
                              <span className="font-medium">{product.name}</span>
                              <span className="text-gray-600">x{product.quantity}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 italic">Sin productos</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-green-600">
                      {formatPrice(sale.totalAmount)}
                    </td>
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
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total de ventas: {sales.length}</span>
            <span>
              Total recaudado: {formatPrice(sales.reduce((sum, sale) => sum + sale.totalAmount, 0))}
            </span>
          </div>
        </div>
      </div>

      {/* Debug info - remover en producción */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-xs text-gray-600">
          <strong>Debug:</strong> Productos: {productos.length}, Kits: {kits.length}, 
          Context Ready: {contextDataReady ? 'Sí' : 'No'}
        </div>
      )}
    </div>
  )
}

export default SalesHistory