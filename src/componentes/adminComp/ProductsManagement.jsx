"use client"

import { useState } from "react"
import { useProductos } from "../../contexts/ProductsContext.jsx"
import CrudProductos from "./CrudProductos.jsx"
import Modal from "./Modal.jsx"
import SalesHistory from "./SalesHistory.jsx"
import Pagination from "./Pagination.jsx"
import { FaHistory } from "react-icons/fa"
import { s } from "motion/react-client"

const ProductsManagement = () => {
  const { productos, deleteProduct } = useProductos()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showSalesHistoryModal, setShowSalesHistoryModal] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 8

  const totalPages = Math.ceil(productos.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const currentProducts = productos.slice(startIndex, startIndex + productsPerPage)

  const handleEdit = (product) => {
    setProductToEdit(product)
    setShowEditModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      await deleteProduct(id)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">GESTIÓN DE PRODUCTOS</h1>
          <p className="text-gray-600">Administra tu inventario de manera eficiente</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Agregar Producto
        </button>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowSalesHistoryModal(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center gap-3 shadow-lg"
        >
          <FaHistory className="text-xl" />
          Ver Historial de Ventas
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {currentProducts.map((producto) => (
          <div key={producto._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {producto.image ? (
                <img
                  src={`https://rumbox-pescar.onrender.com/api/images/${producto.image}`}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400">Sin imagen</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 truncate">{producto.nombre}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{producto.descripcion}</p>

              <div className="mb-3">
                {producto.precioDescuento && producto.descuento ? (
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                      -{producto.descuento}%
                    </span>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{formatPrice(producto.precio)}</div>
                      <div className="text-sm text-gray-500 line-through">{formatPrice(producto.precioDescuento)}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-lg font-bold text-blue-600">{formatPrice(producto.precio)}</div>
                )}
              </div>

              <div className="text-sm text-gray-600 mb-4">Stock: {producto.cantidad}</div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(producto._id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded font-semibold hover:bg-red-600 transition duration-300"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEdit(producto)}
                  className="flex-1 bg-blue-500 text-white py-2 px-3 rounded font-semibold hover:bg-blue-600 transition duration-300"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && <Pagination page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}

      {/* Modales */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
        <CrudProductos onClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <CrudProductos onClose={() => setShowEditModal(false)} productToEdit={productToEdit} />
      </Modal>

      <Modal open={showSalesHistoryModal} onClose={() => setShowSalesHistoryModal(false)} size="large">
        <SalesHistory />
      </Modal>
    </div>
  )
}

export default ProductsManagement
