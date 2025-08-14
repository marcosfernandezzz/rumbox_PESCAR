import { useEffect, useState } from "react"
import { useKits } from "../../contexts/KitsContext.jsx"

const CrudKits = ({ onClose, kitToEdit }) => {
  const { addKit, updateKit } = useKits()
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    image: null,
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (kitToEdit) {
      setIsEditing(true)
      setForm({
        nombre: kitToEdit.nombre || "",
        precio: kitToEdit.precio || "",
        descripcion: kitToEdit.descripcion || "",
        categoria: kitToEdit.categoria || "",
        image: kitToEdit.image || null,
      })
    } else {
      setIsEditing(false)
      setForm({ nombre: "", precio: "", descripcion: "", categoria: "", image: null })
    }
  }, [kitToEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isEditing && (!form.image || !(form.image instanceof File))) {
      alert("Debes seleccionar una imagen para el kit.")
      return
    }

    try {
      if (isEditing) {
        await updateKit(kitToEdit._id, form)
        alert("Kit editado con éxito!")
      } else {
        await addKit(form)
        alert("Kit agregado con éxito!")
      }
      onClose()
    } catch (error) {
      console.error("Error al procesar kit:", error)
      alert(`Error: ${error.message || "No se pudo procesar el kit."}`)
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "image") {
      setForm({ ...form, image: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto text-gray-900 relative">
      <h1 className="text-3xl font-bold mb-6 text-center">{isEditing ? "Editar Kit" : "Agregar Kit"}</h1>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Kit</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa el nombre del kit"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa el precio"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe el kit"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar categoría</option>
            <option value="nieve">Nieve</option>
            <option value="playa">Playa</option>
            <option value="montaña">Montaña</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Imagen</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isEditing && form.image && typeof form.image === "string" && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Imagen actual: {form.image}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600"
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CrudKits