import { IoClose } from "react-icons/io5"

const CrudProductos = ({ onClose, productToEdit }) => {
  const isEditing = productToEdit !== null
  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission logic here
  }

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto text-gray-900 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
        <IoClose className="text-2xl" />
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">{isEditing ? "Editar Producto" : "Agregar Producto"}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* ... existing form fields ... */}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-blue-500"
          >
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CrudProductos
