import React, { useState } from "react";
import { useKits } from "../../contexts/KitsContext.jsx";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal.jsx";
import DragDropImage from "./DragDropImage.jsx";
import Pagination from "./Pagination.jsx";

const PAGE_SIZE = 10;
const CrudKits = () => {
  const { kits, addKit, updateKit, deleteKit } = useKits();
  const [form, setForm] = useState({ nombre: "", precio: "", descripcion: "", categoria: "", productosIncluidos: "", image: null });
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [descExpand, setDescExpand] = useState({});

  // Paginación
  const totalPages = Math.ceil(kits.length / PAGE_SIZE);
  const kitsPage = kits.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Cambios en los inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Modal
  const openModal = (kit = null) => {
    if (kit) {
      setForm({
        nombre: kit.nombre,
        precio: kit.precio,
        descripcion: kit.descripcion,
        categoria: kit.categoria,
        productosIncluidos: kit.productosIncluidos?.join(', '),
        image: null // No se puede editar imagen existente
      });
      setEditId(kit._id);
    } else {
      setForm({ nombre: "", precio: "", descripcion: "", categoria: "", productosIncluidos: "", image: null });
      setEditId(null);
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setForm({ nombre: "", precio: "", descripcion: "", categoria: "", productosIncluidos: "", image: null });
    setEditId(null);
  };

  // Drag & drop imagen
  const handleImage = file => {
    setForm(f => ({ ...f, image: file }));
  };

  // Submit
  const handleSubmit = e => {
    e.preventDefault();
    // Validar imagen
    if (!form.image || !(form.image instanceof File)) {
      alert("Debes seleccionar una imagen para el kit.");
      return;
    }
    const kitData = {
      ...form,
      precio: Number(form.precio),
      productosIncluidos: form.productosIncluidos.split(',').map(item => item.trim()).filter(item => item !== '')
    };
    if (editId) {
      updateKit(editId, kitData);
    } else {
      await addKit(formData); // Enviar FormData
    }
    closeModal();
  };

  // Descripción resumida
  const getDesc = (desc, id) => {
    if (!desc) return "";
    if (desc.length <= 40 || descExpand[id]) return desc;
    return desc.slice(0, 40) + "...";
  };
  // Productos incluidos resumidos
  const getIncluidos = (arr, id) => {
    if (!arr || arr.length === 0) return "";
    const str = arr.join(', ');
    if (str.length <= 20 || descExpand["prod-"+id]) return str;
    return str.slice(0, 20) + "...";
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Kits</h2>
        <button onClick={() => openModal()} className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">Agregar kit</button>
      </div>
      <table className="w-full text-left border rounded overflow-hidden">
        <thead>
          <tr className="bg-gray-700 text-white">
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
          {kitsPage.map(kit => (
            <tr key={kit._id} className="border-b">
              <td className="p-0.5 border-2">{kit._id}</td>
              <td className="p-0.5 border-2">{kit.nombre}</td>
              <td className="p-0.5 border-2">{kit.precio}</td>
              <td className="p-0.5 border-2">
                {getDesc(kit.descripcion, kit._id)}
                {kit.descripcion && kit.descripcion.length > 40 && (
                  <button className="ml-2 text-xs text-indigo-600 underline" onClick={() => setDescExpand(e => ({ ...e, [kit._id]: !e[kit._id] }))}>
                    {descExpand[kit._id] ? "menos" : "más"}
                  </button>
                )}
              </td>
              <td className="p-0.5 border-2">{kit.categoria}</td>
              <td className="p-0.5 border-2">
                {getIncluidos(kit.productosIncluidos, kit._id)}
                {kit.productosIncluidos && kit.productosIncluidos.join(', ').length > 20 && (
                  <button className="ml-2 text-xs text-indigo-600 underline" onClick={() => setDescExpand(e => ({ ...e, ["prod-"+kit._id]: !e["prod-"+kit._id] }))}>
                    {descExpand["prod-"+kit._id] ? "menos" : "más"}
                  </button>
                )}
              </td>
              <td className="p-0.5 border-2">{kit.image ? <img src={kit.image} alt="img" className="h-12 mx-auto" /> : ""}</td>
              <td className="flex justify-center items-center gap-2 ">
                <button onClick={() => openModal(kit)} className= " mr-2 text-blue-600"><FaEdit /></button>
                <button onClick={() => deleteKit(kit._id)} className="text-orange-500"><FaTrashAlt /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      <Modal open={modalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required className="border px-2 py-1 rounded" />
          <input name="precio" value={form.precio} onChange={handleChange} placeholder="Precio" required type="number" className="border px-2 py-1 rounded" />
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required className="border px-2 py-1 rounded" />
          <select name="categoria" value={form.categoria} onChange={handleChange} required className="border px-2 py-1 rounded">
            <option value="">Selecciona Categoría</option>
            <option value="Nieve">Nieve</option>
            <option value="Playa">Playa</option>
            <option value="Montaña">Montaña</option>
          </select>
          <input name="productosIncluidos" value={form.productosIncluidos} onChange={handleChange} placeholder="Productos (IDs separados por comas)" required className="border px-2 py-1 rounded" />
          <DragDropImage onFile={handleImage} preview={form.image && typeof form.image !== "string" ? URL.createObjectURL(form.image) : null} />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">{editId ? "Editar" : "Agregar"}</button>
        </form>
      </Modal>
    </div>
  );
};

export default CrudKits;
