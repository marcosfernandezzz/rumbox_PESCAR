import React, { useState } from "react";
import { useProductos } from "../../contexts/ProductsContext.jsx";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const CrudProductos = () => {
  const { productos, addProduct, updateProduct, deleteProduct } = useProductos();
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "" });
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
    setForm({ nombre: "", precio: "", stock: "" });
  };

  const handleEdit = prod => {
    setForm({ nombre: prod.nombre, precio: prod.precio, stock: prod.stock });
    setEditId(prod._id);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl text-center font-bold mb-4">CRUD Productos</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="border px-2" />
        <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" required type="number" className="border px-2" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required type="number" className="border px-2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">{editId ? "Editar" : "Agregar"}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({nombre:"",precio:"",stock:""})}} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>}
      </form>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-700 text-white">
            <th>#ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos?.map(prod => (
            <tr key={prod._id} className="border-b">
              <td className="p-0.5 border-2">{prod._id}</td>
              <td className="p-0.5 border-2">{prod.nombre}</td>
              <td className="p-0.5 border-2">{prod.precio}</td>
              <td className="p-0.5 border-2">{prod.stock}</td>
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
