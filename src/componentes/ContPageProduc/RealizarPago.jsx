"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { IoLogoPaypal } from "react-icons/io5"
import { CiCreditCard2 } from "react-icons/ci"
import { SiMercadopago } from "react-icons/si"
import { useProductos } from "../../contexts/ProductsContext.jsx"
import { useKits } from "../../contexts/KitsContext"
import { AuthContext } from "../../contexts/AuthContext.jsx"

export const RealizarPago = () => {
  const { usuario, setUsuario } = useContext(AuthContext)
  const navigate = useNavigate()
  const { productos } = useProductos()
  const productosvarios = Array.isArray(productos) ? productos : []

  const { kits } = useKits()
  const KitsList = Array.isArray(kits) ? kits : []

  const copiaUser = localStorage.getItem("usuario")
  const comprador = copiaUser ? JSON.parse(copiaUser) : null

  const validateAndCleanCart = (inventario) => {
    return inventario.filter((item) => {
      if (!item.id || item.id === "undefined" || !item.cant) {
        console.warn("⚠️ Item inválido encontrado y removido:", item)
        return false
      }
      return true
    })
  }

  const getSafePrice = (producto, kit) => {
    let precio = 0
    if (producto && producto.precio) {
      precio = Number.parseFloat(producto.precio)
      if (isNaN(precio)) {
        console.warn("⚠️ Precio inválido en producto:", producto)
        precio = 0
      }
    } else if (kit && kit.precio) {
      precio = Number.parseFloat(kit.precio)
      if (isNaN(precio)) {
        console.warn("⚠️ Precio inválido en kit:", kit)
        precio = 0
      }
    }
    return precio
  }

  const handleConfirmPurchase = async () => {
    console.log("🛒 Iniciando proceso de compra...")

    if (!comprador || !comprador.inventario || comprador.inventario.length === 0) {
      alert("El carrito está vacío.")
      return
    }

    const inventarioLimpio = validateAndCleanCart(comprador.inventario)

    if (inventarioLimpio.length === 0) {
      alert("No hay productos válidos en el carrito.")
      return
    }

    let totalCompra = 0
    const saleProducts = []

    for (const item of inventarioLimpio) {
      const producto = productosvarios.find((p) => String(p._id) === String(item.id))
      const kit = KitsList.find((k) => String(k._id) === String(item.id))

      if (!producto && !kit) {
        console.warn("⚠️ Producto/Kit no encontrado para ID:", item.id)
        continue
      }

      const precioUnitario = getSafePrice(producto, kit)
      const cantidad = Number.parseInt(item.cant, 10)

      if (isNaN(cantidad) || cantidad <= 0) {
        console.warn("⚠️ Cantidad inválida:", item.cant)
        continue
      }

      const subtotal = precioUnitario * cantidad
      totalCompra += subtotal

      saleProducts.push({
        itemId: item.id,
        quantity: cantidad,
        itemType: producto ? "Product" : "Kit",
        unitPrice: precioUnitario,
        subtotal: subtotal,
      })

      console.log(
        `📦 Item procesado: ${producto?.nombre || kit?.nombre} - $${precioUnitario} x ${cantidad} = $${subtotal}`,
      )
    }

    if (saleProducts.length === 0) {
      alert("No se pudieron procesar los productos del carrito.")
      return
    }

    const saleData = {
      userId: comprador._id,
      products: saleProducts,
      totalAmount: Math.round(totalCompra * 100) / 100, // Redondear a 2 decimales
    }

    console.log("📦 Datos de venta:", saleData)
    console.log("💰 Total calculado:", totalCompra)

    if (isNaN(saleData.totalAmount) || saleData.totalAmount <= 0) {
      alert("Error en el cálculo del total. Por favor, revisa tu carrito.")
      return
    }

    try {
      const token = comprador?.token
      if (!token) {
        throw new Error("No se encontró el token de autenticación.")
      }

      console.log("🚀 Enviando petición a /api/sales...")
      console.log("🔑 Token:", token ? "Presente" : "Ausente")

      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(saleData),
      })

      console.log("📡 Respuesta del servidor:", response.status, response.statusText)

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.text()
          console.log("❌ Error del servidor:", errorData)

          if (response.status === 404) {
            errorMessage =
              "El servidor no está disponible. Asegúrate de que el backend esté corriendo en el puerto 3000."
          } else {
            errorMessage = errorData || errorMessage
          }
        } catch (e) {
          console.log("❌ No se pudo obtener detalles del error")
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log("✅ Respuesta exitosa:", result)

      alert("¡Compra realizada con éxito!")

      const ventaCompletada = {
        ...comprador,
        inventario: inventarioLimpio, // Mantener los productos comprados
        fechaCompra: new Date().toISOString(),
        totalPagado: totalCompra,
        ventaId: result.saleId || Date.now(), // ID de la venta del servidor o timestamp
      }
      localStorage.setItem("ultimaVenta", JSON.stringify(ventaCompletada))

      // Limpiar el carrito del usuario actual
      const usuarioActualizado = { ...comprador, inventario: [] }
      setUsuario(usuarioActualizado)
      localStorage.setItem("usuario", JSON.stringify(usuarioActualizado))

      navigate("/DescripCompra")
    } catch (error) {
      console.error("💥 Error en la compra:", error)
      alert(`Hubo un problema al procesar tu compra: ${error.message}`)
    }
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl flex flex-col items-center">
        {/* Pagos rápidos */}
        <div className="text-center mb-6 w-full">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Pagos Rápidos</h3>
          <div className="flex justify-center space-x-4 flex-wrap">
            {/* Mercado Pago */}
            <button className="flex items-center bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-sky-600 transition-colors mb-2">
              <SiMercadopago className="w-5 h-5 mr-2" />
              Mercado Pago
            </button>

            {/* PayPal */}
            <button className="flex items-center bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition-colors mb-2">
              <IoLogoPaypal className="w-5 h-5 mr-2" />
              PayPal
            </button>

            {/* Google Pay */}
            <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-colors mb-2">
              <FcGoogle className="w-5 h-5 mr-2" />
              Google Pay
            </button>
          </div>
        </div>

        {/* Separador */}
        <div className="relative my-6 w-full">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-3 text-lg font-medium text-gray-500 flex items-center">
              <CiCreditCard2 className="mr-2" /> O pagar con tarjeta
            </span>
          </div>
        </div>

        {/* Datos de la tarjeta */}
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left">Datos de la Tarjeta</h3>

          <div className="mb-3">
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">
              Número
            </label>
            <input
              type="text"
              id="numero"
              placeholder="Número de tarjeta"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-3 mb-3">
            <div className="flex-1">
              <label htmlFor="vencimiento" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Vencimiento (MM/AA)
              </label>
              <input
                type="text"
                id="vencimiento"
                placeholder="MM/AA"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                Código de Seguridad (CVC)
              </label>
              <input
                type="text"
                id="cvc"
                placeholder="CVC"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="titular" className="block text-sm font-medium text-gray-700 mb-1">
              Titular de la Tarjeta
            </label>
            <input
              type="text"
              id="titular"
              placeholder="Nombre del titular"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex space-x-3">
            <div className="flex-1">
              <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-1">
                País
              </label>
              <input
                type="text"
                id="pais"
                placeholder="Ej: Argentina"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-1">
                Provincia
              </label>
              <select
                id="provincia"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>Buenos Aires</option>
                <option>Córdoba</option>
                <option>Santa Fe</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-1">
                Código Postal
              </label>
              <input
                type="text"
                id="codigoPostal"
                placeholder="Ej: 1406"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between items-center w-full">
          <Link to="/carrito" className="text-blue-600 hover:underline flex items-center text-sm">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Volver al carrito
          </Link>
          <button
            onClick={handleConfirmPurchase}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  )
}

export default RealizarPago
