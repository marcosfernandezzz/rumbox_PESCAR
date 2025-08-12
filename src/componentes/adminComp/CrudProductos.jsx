import React, { useState, useEffect } from "react";
import { useProductos } from "../../contexts/ProductsContext.jsx";
import DragDropImage from "./DragDropImage.jsx";
import { IoClose } from "react-icons/io5"; // Icono de cerrar

const CrudProductos = ({ onClose, productToEdit }) => {
  const { addProduct, updateProduct } = useProductos();
  const [form, setForm] = useState({ 
    nombre: "", 
    precio: "", 
    precioDescuento: "", // Nuevo campo
    descuento: "", // Nuevo campo
    cantidad: "", 
    descripcion: "", 
    categoria: "", 
    image: null 
  });
  const [isEditing, setIsEditing] = useState(false); // Usar isEditing en lugar de editId

  useEffect(() => {
    if (productToEdit) {
      setIsEditing(true);
      setForm({
        nombre: productToEdit.nombre || "",
        precio: productToEdit.precio || "",
        precioDescuento: productToEdit.precioDescuento || "",
        descuento: productToEdit.descuento || "",
        cantidad: productToEdit.cantidad || "",
        descripcion: productToEdit.descripcion || "",
        categoria: productToEdit.categoria || "",
        image: productToEdit.image || null, // Mantener la imagen existente
      });
    } else {
      setIsEditing(false);
      setForm({ nombre: "", precio: "", precioDescuento: "", descuento: "", cantidad: "", descripcion: "", categoria: "", image: null });
    }
  }, [productToEdit]);

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

    // Validaciones de frontend
    if (!form.nombre || form.nombre.length < 3 || form.nombre.length > 50) {
      alert("El nombre del producto debe tener entre 3 y 50 caracteres.");
      return;
    }
    if (isNaN(form.precio) || parseFloat(form.precio) < 0) {
      alert("El precio final debe ser un número positivo.");
      return;
    }
    if (form.precioDescuento && (isNaN(form.precioDescuento) || parseFloat(form.precioDescuento) < 0)) {
      alert("El precio original debe ser un número positivo.");
      return;
    }
    if (form.descuento && (isNaN(form.descuento) || parseFloat(form.descuento) < 0 || parseFloat(form.descuento) > 100)) {
      alert("El descuento debe ser un número entre 0 y 100.");
      return;
    }
    if (isNaN(form.cantidad) || parseInt(form.cantidad) < 0) {
      alert("El stock debe ser un número entero positivo.");
      return;
    }
    if (!form.descripcion || form.descripcion.length < 10 || form.descripcion.length > 200) {
      alert("La descripción debe tener entre 10 y 200 caracteres.");
      return;
    }
    const categoriasValidas = ["Nieve", "Playa", "Montaña"];
    if (!form.categoria || !categoriasValidas.includes(form.categoria)) {
      alert("La categoría seleccionada no es válida.");
      return;
    }

    if (!isEditing && (!form.image || !(form.image instanceof File))) {
      alert("Debes seleccionar una imagen para el producto.");
      return;
    }
    // Si se está editando y no se seleccionó una nueva imagen, y la imagen original no es un string (URL), alertar.
    // Si se está editando y se seleccionó una nueva imagen, debe ser un File.
    if (isEditing && form.image && typeof form.image !== "string" && !(form.image instanceof File)) {
      alert("El campo de imagen debe ser un archivo o la URL de la imagen existente.");
      return;
    }
    // Si se está agregando y la imagen no es un File, alertar.
    if (!isEditing && form.image && !(form.image instanceof File)) {
      alert("El campo de imagen debe ser un archivo.");
      return;
    }


    console.log("Datos del formulario a enviar:", form); // Añadir este log para depuración

    try {
      if (isEditing) {
        await updateProduct(productToEdit._id, form);
        alert("Producto editado con éxito!");
      } else {
        await addProduct(form);
        alert("Producto agregado con éxito!");
      }
      onClose(); // Cerrar el modal después de la operación exitosa
    } catch (error) {
      console.error("Error al procesar producto:", error);
      alert(`Error: ${error.message || "No se pudo procesar el producto."}`);
    }
    // El formulario se reseteará automáticamente al cerrar el modal y reabrirlo para agregar
    // o al cambiar productToEdit para editar otro.
  };

  return (
  <div className="my-8 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto text-gray-900 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
        <IoClose className="text-2xl" />
      </button>
      <h1 className="text-3xl font-bold mb-6 text-center">{isEditing ? "Editar Producto" : "Agregar Producto"}</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="image" className="block text-lg font-semibold mb-2">Imagen del producto</label>
          <DragDropImage onFile={handleImage} preview={form.image && typeof form.image !== "string" ? URL.createObjectURL(form.image) : (typeof form.image === "string" ? `/img/${form.image}` : null)} />
        </div>

        <div>
          <label htmlFor="nombre" className="block text-lg font-semibold mb-2">Nombre del producto</label>
          <input name="nombre" id="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Botas Snowboard Pro" required className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="precio" className="block text-lg font-semibold mb-2">Precio Final</label>
          <input name="precio" id="precio" value={form.precio} onChange={handleChange} placeholder="Ej: 480000" required type="number" className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="precioDescuento" className="block text-lg font-semibold mb-2">Precio Original (opcional)</label>
          <input name="precioDescuento" id="precioDescuento" value={form.precioDescuento} onChange={handleChange} placeholder="Ej: 800000" type="number" className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="cantidad" className="block text-lg font-semibold mb-2">Stock</label>
          <input name="cantidad" id="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Ej: 8" required type="number" className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="descuento" className="block text-lg font-semibold mb-2">Descuento (%)</label>
          <input name="descuento" id="descuento" value={form.descuento} onChange={handleChange} placeholder="Ej: 40" type="number" className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500" />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-lg font-semibold mb-2">Descripción</label>
          <textarea name="descripcion" id="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Describe las características del producto..." required className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 h-24 resize-y" />
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

        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100">
            Cancelar
          </button>
          <button type="submit" className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-blue-500">
            {isEditing ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrudProductos;
