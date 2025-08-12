import React, { useState } from "react";
import { useKits } from "../../contexts/KitsContext.jsx";
import DragDropImage from "./DragDropImage.jsx";

const CrudKits = () => {
  const { addKit, updateKit } = useKits(); // No necesitamos deleteKit ni kits para esta vista
  const [form, setForm] = useState({ nombre: "", precio: "", descripcion: "", categoria: "", productosIncluidos: "", image: null });
  const [editId, setEditId] = useState(null); // Mantener editId para la lógica de agregar/editar

  // Cambios en los inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Drag & drop imagen
  const handleImage = file => {
    setForm(f => ({ ...f, image: file }));
  };

  // Submit
  const handleSubmit = async e => {
    e.preventDefault();

    if (!editId && (!form.image || !(form.image instanceof File))) {
      alert("Debes seleccionar una imagen para el kit.");
      return;
    }
    if (editId && form.image === null) {
      // Si se está editando y no se seleccionó una nueva imagen, no es necesario que sea un File
    } else if (form.image && !(form.image instanceof File)) {
      alert("El campo de imagen debe ser un archivo.");
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      if (form[key] !== null && form[key] !== undefined) {
        if (key === "productosIncluidos") {
          form[key].split(',').map(item => item.trim()).filter(item => item !== '').forEach(prodId => {
            formData.append(key, prodId);
          });
        } else if (key === "precio") {
          formData.append(key, Number(form[key]));
        } else {
          formData.append(key, form[key]);
        }
      }
    }

    if (editId) {
      await updateKit(editId, form); // Pasar el objeto 'form' directamente
      alert("Kit editado con éxito!");
    } else {
      await addKit(form); // Pasar el objeto 'form' directamente
      alert("Kit agregado con éxito!");
    }
    // Resetear el formulario después de agregar/editar
    setForm({ nombre: "", precio: "", descripcion: "", categoria: "", productosIncluidos: "", image: null });
    setEditId(null);
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">{editId ? "Editar Kit" : "Agregar Kit"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="image" className="block text-lg font-semibold mb-2">Imagen del kit</label>
          <DragDropImage onFile={handleImage} preview={form.image && typeof form.image !== "string" ? URL.createObjectURL(form.image) : null} />
        </div>

        <div>
          <label htmlFor="nombre" className="block text-lg font-semibold mb-2">Nombre del kit</label>
          <input name="nombre" id="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre del kit" required className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="precio" className="block text-lg font-semibold mb-2">Precio</label>
          <input name="precio" id="precio" value={form.precio} onChange={handleChange} placeholder="Precio" required type="number" className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-lg font-semibold mb-2">Descripción</label>
          <textarea name="descripcion" id="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 h-24 resize-y" />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-lg font-semibold mb-2">Categoría</label>
          <select name="categoria" id="categoria" value={form.categoria} onChange={handleChange} required className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500">
            <option value="">Selecciona Categoría</option>
            <option value="Nieve">Nieve</option>
            <option value="Playa">Playa</option>
            <option value="Montaña">Montaña</option>
          </select>
        </div>

  {/* Campo de productos incluidos oculto */}
        
        <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-blue-500 transition duration-300">{editId ? "Editar Kit" : "Agregar Kit"}</button>
      </form>
    </div>
  );
};

export default CrudKits;
