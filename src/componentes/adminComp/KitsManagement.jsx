"use client"

import { useState } from "react"
import { useKits } from "../../contexts/KitsContext.jsx"
import CrudKits from "./CrudKits.jsx"
import Modal from "./Modal.jsx"
import SalesHistory from "./SalesHistory.jsx"
import Pagination from "./Pagination.jsx"
import { FaHistory } from "react-icons/fa"

const ProductImage = ({ src, alt, className }) => {
  const imageUrl = src?.startsWith("http") ? src : `https://rumbox-pescar.onrender.com/api/images/${src}`

  return (
    <img
      src={imageUrl || "/placeholder.svg?height=200&width=200&query=kit+producto"}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = "/generic-unavailable-image.png"
      }}
    />
  )
}

const KitsManagement = () => {
  const { kits, deleteKit } = useKits()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showSalesHistoryModal, setShowSalesHistoryModal] = useState(false)
  const [kitToEdit, setKitToEdit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const kitsPerPage = 8

  const totalPages = Math.ceil(kits.length / kitsPerPage)
  const startIndex = (currentPage - 1) * kitsPerPage
  const currentKits = kits.slice(startIndex, startIndex + kitsPerPage)

  const handleEdit = (kit) => {
    setKitToEdit(kit)
    setShowEditModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este kit?")) {
      await deleteKit(id)
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
          <h1 className="text-3xl font-bold text-gray-800">GESTIÓN DE KITS</h1>
          <p className="text-gray-600">Administra tus kits de productos</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300 flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Agregar Kit
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
        {currentKits.map((kit) => (
          <div key={kit._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {kit.image ? (
                <ProductImage src={kit.image} alt={kit.nombre} className="w-full h-full object-cover" />
              ) : (
                <div className="text-gray-400">Sin imagen</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 truncate">{kit.nombre}</h3>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">{kit.descripcion}</p>

              <div className="text-lg font-bold text-blue-600 mb-4">{formatPrice(kit.precio)}</div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(kit._id)}
                  className="flex-1 bg-red-500 text-white py-2 px-3 rounded font-semibold hover:bg-red-600 transition duration-300"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => handleEdit(kit)}
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
        <CrudKits onClose={() => setShowAddModal(false)} />
      </Modal>

      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <CrudKits onClose={() => setShowEditModal(false)} kitToEdit={kitToEdit} />
      </Modal>

      <Modal open={showSalesHistoryModal} onClose={() => setShowSalesHistoryModal(false)} size="large">
        <SalesHistory />
      </Modal>
    </div>
  )
}

export default KitsManagement
