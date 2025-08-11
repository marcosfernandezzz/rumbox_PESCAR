import React, { useState } from "react";
import { useKits } from "../../contexts/KitsContext.jsx";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const CrudKits = () => {
  const { kits, addKit, updateKit, deleteKit } = useKits();
  const [form, setForm] = useState({ nombre: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editId) {
      updateKit(editId, form);
      setEditId(null);
    } else {
      addKit(form);
    }
    setForm({ nombre: "" });
  };

  const handleEdit = kit => {
    setForm({ nombre: kit.nombre });
    setEditId(kit._id);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold my-4 text-center">CRUD Kits</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="border px-2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">{editId ? "Editar" : "Agregar"}</button>
        {editId && <button type="button" onClick={()=>{setEditId(null);setForm({nombre:""})}} className="bg-gray-400 text-white px-2 py-1 rounded">Cancelar</button>}
      </form>
      <table className="w-full text-left border-2">
        <thead>
          <tr className="bg-gray-700 text-white  text-center">
            <th className="border-2">#ID</th>
            <th className="border-2">Nombre</th>
            <th className="border-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {kits?.map(kit => (
            <tr key={kit._id} className="">
              <td className="p-0.5 border-2">{kit._id}</td>
              <td className="p-0.5 border-2">{kit.nombre}</td>
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
