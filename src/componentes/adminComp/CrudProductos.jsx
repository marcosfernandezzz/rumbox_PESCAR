import React, { useState } from "react";
import { useProductos } from "../../contexts/ProductsContext.jsx";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const CrudProductos = () => {
  const { productos, addProduct, updateProduct, deleteProduct } = useProductos();
  const [form, setForm] = useState({ 
    nombre: "", 
    precio: "", 
    cantidad: "", // Cambiado de stock a cantidad
    descripcion: "", 
    categoria: "", 
    image: "" 
  });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      updateProduct(editId, form);
      setEditId(null);
    } else {
      addProduct(form);
    }
    setForm({ nombre: "", precio: "", cantidad: "", descripcion: "", categoria: "", image: "" }); // Resetear todos los campos
  };

  const handleEdit = prod => {
    setForm({ 
      nombre: prod.nombre, 
      precio: prod.precio, 
      cantidad: prod.cantidad, // Cambiado de stock a cantidad
      descripcion: prod.descripcion, 
      categoria: prod.categoria, 
      image: prod.image 
    });
    setEditId(prod._id);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl text-center font-bold mb-4">CRUD Productos</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="border px-2 py-1 rounded" />
        <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" required type="number" className="border px-2 py-1 rounded" />
        <input name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" required type="number" className="border px-2 py-1 rounded" />
        <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required className="border px-2 py-1 rounded" />
        <select name="categoria" value={form.categoria} onChange={handleChange} required className="border px-2 py-1 rounded">
          <option value="">Selecciona Categoría</option>
          <option value="Nieve">Nieve</option>
          <option value="Playa">Playa</option>
          <option value="Montaña">Montaña</option>
        </select>
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL de Imagen" required className="border px-2 py-1 rounded" />
        
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">{editId ? "Editar" : "Agregar"}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({nombre:"",precio:"",cantidad:"",descripcion:"",categoria:"",image:""})}} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>}
      </form>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th className="p-2">#ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Cantidad</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Imagen</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos?.map(prod => (
            <tr key={prod._id} className="border-b">
              <td className="p-0.5 border-2">{prod._id}</td>
              <td className="p-0.5 border-2">{prod.nombre}</td>
              <td className="p-0.5 border-2">{prod.precio}</td>
              <td className="p-0.5 border-2">{prod.cantidad}</td>
              <td className="p-0.5 border-2">{prod.descripcion}</td>
              <td className="p-0.5 border-2">{prod.categoria}</td>
              <td className="p-0.5 border-2">{prod.image}</td>
              <td className="flex justify-center items-center gap-2 border p-3">
                <button onClick={()=>handleEdit(prod)} className="mr-2 text-blue-600"><FaEdit /></button>
                <button onClick={()=>deleteProduct(prod._id)} className="text-red-600"><FaTrashAlt /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudProductos;
