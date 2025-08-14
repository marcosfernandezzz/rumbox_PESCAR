import { useState, useEffect } from "react"

const CrudProductos = ({ onClose, productToEdit, onSave }) => {
  const isEditing = productToEdit !== null
  
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    codigo: '',
    activo: true
  })

  // Cargar datos del producto si estamos editando
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        nombre: productToEdit.nombre || '',
        descripcion: productToEdit.descripcion || '',
        precio: productToEdit.precio || '',
        categoria: productToEdit.categoria || '',
        stock: productToEdit.stock || '',
        codigo: productToEdit.codigo || '',
        activo: productToEdit.activo !== undefined ? productToEdit.activo : true
      })
    }
  }, [productToEdit])

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Manejar envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault()
    
    // Validaciones básicas
    if (!formData.nombre.trim()) {
      alert('El nombre del producto es requerido')
      return
    }
    
    if (!formData.precio || parseFloat(formData.precio) <= 0) {
      alert('El precio debe ser mayor a 0')
      return
    }

    // Preparar datos para guardar
    const productData = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock) || 0,
      id: isEditing ? productToEdit.id : Date.now() // ID temporal para nuevos productos
    }

    // Llamar función onSave si está disponible
    if (onSave) {
      onSave(productData, isEditing)
    }

    // Cerrar modal
    onClose()
  }

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-lg max-w-md w-full mx-4 text-gray-900 relative">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {isEditing ? "Editar Producto" : "Agregar Producto"}
        </h1>

        <div className="flex flex-col gap-4">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Producto *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ingrese el nombre del producto"
            />
          </div>

          {/* Campo Código */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código
            </label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Código del producto"
            />
          </div>

          {/* Campo Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              placeholder="Descripción del producto"
            />
          </div>

          {/* Precio y Stock en la misma fila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* Campo Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">Seleccionar categoría</option>
              <option value="nieve">Nieve</option>
              <option value="playa">Playa</option>
              <option value="montaña">Montaña</option>
            </select>
          </div>

          {/* Checkbox Activo */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Producto activo
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              {isEditing ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
    </div>
  )
}

export default CrudProductos