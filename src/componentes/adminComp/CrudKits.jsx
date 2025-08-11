import React, { useState } from "react";
import { useKits } from "../../contexts/KitsContext.jsx";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const CrudKits = () => {
  const { kits, addKit, updateKit, deleteKit } = useKits();
  const [form, setForm] = useState({ 
    nombre: "", 
    precio: "", 
    descripcion: "", 
    categoria: "", 
    productosIncluidos: "", // Se manejará como string separado por comas
    image: "" 
  });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const kitData = {
      ...form,
      precio: Number(form.precio), // Convertir a número
      productosIncluidos: form.productosIncluidos.split(',').map(item => item.trim()).filter(item => item !== '') // Convertir string a array
    };

    if (editId) {
      updateKit(editId, kitData);
      setEditId(null);
    } else {
      addKit(kitData);
    }
    setForm({ nombre: "", precio: "", descripcion: "", categoria: "", productosIncluidos: "", image: "" }); // Resetear todos los campos
  };

  const handleEdit = kit => {
    setForm({ 
      nombre: kit.nombre, 
      precio: kit.precio, 
      descripcion: kit.descripcion, 
      categoria: kit.categoria, 
      productosIncluidos: kit.productosIncluidos.join(', '), // Convertir array a string para el input
      image: kit.image 
    });
    setEditId(kit._id);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold my-4 text-center">CRUD Kits</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="border px-2 py-1 rounded" />
        <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" required type="number" className="border px-2 py-1 rounded" />
        <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required className="border px-2 py-1 rounded" />
        <select name="categoria" value={form.categoria} onChange={handleChange} required className="border px-2 py-1 rounded">
          <option value="">Selecciona Categoría</option>
          <option value="Nieve">Nieve</option>
          <option value="Playa">Playa</option>
          <option value="Montaña">Montaña</option>
        </select>
        <input name="productosIncluidos" value={form.productosIncluidos} onChange={handleChange} placeholder="Productos (IDs separados por comas)" required className="border px-2 py-1 rounded" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL de Imagen" required className="border px-2 py-1 rounded" />
        
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">{editId ? "Editar" : "Agregar"}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({nombre:"",precio:"",descripcion:"",categoria:"",productosIncluidos:"",image:""})}} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>}
      </form>
      <table className="w-full text-left border-2">
        <thead>
          <tr className="bg-gray-700 text-white  text-center">
            <th className="p-2">#ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Categoría</th>
            <th className="p-2">Productos Incluidos</th>
            <th className="p-2">Imagen</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {kits?.map(kit => (
            <tr key={kit._id} className="">
              <td className="p-0.5 border-2">{kit._id}</td>
              <td className="p-0.5 border-2">{kit.nombre}</td>
              <td className="p-0.5 border-2">{kit.precio}</td>
              <td className="p-0.5 border-2">{kit.descripcion}</td>
              <td className="p-0.5 border-2">{kit.categoria}</td>
              <td className="p-0.5 border-2">{kit.productosIncluidos?.join(', ')}</td>
              <td className="p-0.5 border-2">{kit.image}</td>
              <td className="flex justify-center items-center gap-2 border p-3">
                <button onClick={()=>handleEdit(kit)} className="mr-2  text-blue-600"><FaEdit /></button>
                <button onClick={()=>deleteKit(kit._id)} className="text-orange-500"><FaTrashAlt /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudKits;
