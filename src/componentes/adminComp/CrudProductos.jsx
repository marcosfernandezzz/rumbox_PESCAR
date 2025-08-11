import React, { useState } from "react";
import { useProductos } from "../../contexts/ProductsContext.jsx";
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "./Modal.jsx";
import DragDropImage from "./DragDropImage.jsx";
import Pagination from "./Pagination.jsx";

const PAGE_SIZE = 10;
const CrudProductos = () => {
  const { productos, addProduct, updateProduct, deleteProduct } = useProductos();
  const [form, setForm] = useState({ nombre: "", precio: "", cantidad: "", descripcion: "", categoria: "", image: null });
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [descExpand, setDescExpand] = useState({});

  // Paginación
  const totalPages = Math.ceil(productos.length / PAGE_SIZE);
  const productosPage = productos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Cambios en los inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Modal
  const openModal = (prod = null) => {
    if (prod) {
      setForm({
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: prod.cantidad,
        descripcion: prod.descripcion,
        categoria: prod.categoria,
        image: null // No se puede editar imagen existente
      });
      setEditId(prod._id);
    } else {
      setForm({ nombre: "", precio: "", cantidad: "", descripcion: "", categoria: "", image: null });
      setEditId(null);
    }
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setForm({ nombre: "", precio: "", cantidad: "", descripcion: "", categoria: "", image: null });
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
      alert("Debes seleccionar una imagen para el producto.");
      return;
    }
    if (editId) {
      updateProduct(editId, form);
    } else {
      addProduct(form);
    }
    closeModal();
  };

  // Descripción resumida
  const getDesc = (desc, id) => {
    if (!desc) return "";
    if (desc.length <= 40 || descExpand[id]) return desc;
    return desc.slice(0, 40) + "...";
  };

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Productos</h2>
        <button onClick={() => openModal()} className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700">Agregar producto</button>
      </div>
      <table className="w-full text-left border rounded overflow-hidden">
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
          {productosPage.map(prod => (
            <tr key={prod._id} className="border-b">
              <td className="p-0.5 border-2">{prod._id}</td>
              <td className="p-0.5 border-2">{prod.nombre}</td>
              <td className="p-0.5 border-2">{prod.precio}</td>
              <td className="p-0.5 border-2">{prod.cantidad}</td>
              <td className="p-0.5 border-2">
                {getDesc(prod.descripcion, prod._id)}
                {prod.descripcion && prod.descripcion.length > 40 && (
                  <button className="ml-2 text-xs text-indigo-600 underline" onClick={() => setDescExpand(e => ({ ...e, [prod._id]: !e[prod._id] }))}>
                    {descExpand[prod._id] ? "Ver menos" : "Ver más"}
                  </button>
                )}
              </td>
              <td className="p-0.5 border-2">{prod.categoria}</td>
              <td className="p-0.5 border-2">
                {prod.image ? <img src={prod.image} alt="img" className="h-12 mx-auto" /> : ""}
              </td>
              <td className="flex justify-center items-center gap-2 border p-3">
                <button onClick={() => openModal(prod)} className="mr-2 text-blue-600"><FaEdit /></button>
                <button onClick={() => deleteProduct(prod._id)} className="text-red-600"><FaTrashAlt /></button>
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
          <input name="cantidad" value={form.cantidad} onChange={handleChange} placeholder="Cantidad" required type="number" className="border px-2 py-1 rounded" />
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" required className="border px-2 py-1 rounded" />
          <select name="categoria" value={form.categoria} onChange={handleChange} required className="border px-2 py-1 rounded">
            <option value="">Selecciona Categoría</option>
            <option value="Nieve">Nieve</option>
            <option value="Playa">Playa</option>
            <option value="Montaña">Montaña</option>
          </select>
          <DragDropImage onFile={handleImage} preview={form.image && typeof form.image !== "string" ? URL.createObjectURL(form.image) : null} />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">{editId ? "Editar" : "Agregar"}</button>
        </form>
      </Modal>
    </div>
  );
};

export default CrudProductos;
