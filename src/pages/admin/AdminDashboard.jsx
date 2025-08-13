import React, { useState } from "react"; // Fragment no necesita ser importado explícitamente si se usa <>...</>
import AdminNavbar from "../../componentes/adminComp/AdminNavbar.jsx";
import CrudProductos from "../../componentes/adminComp/CrudProductos.jsx"; // Mantener para el modal
import CrudKits from "../../componentes/adminComp/CrudKits.jsx";
import SalesHistory from "../../componentes/adminComp/SalesHistory.jsx";
import Modal from "../../componentes/adminComp/Modal.jsx";
import { useProductos } from '../../contexts/ProductsContext.jsx';
import { useKits } from '../../contexts/KitsContext.jsx';
import Card from '../../componentes/UI/Card.jsx';
import { IoAddCircleOutline } from "react-icons/io5";

const AdminDashboard = () => {
  const { productos, deleteProduct } = useProductos();
  const { kits, deleteKit } = useKits();
  const [showModal, setShowModal] = useState(false);
  const [showSalesHistory, setShowSalesHistory] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Productos
  const handleAddProductClick = () => {
    setEditingItem(null);
    setShowModal(true);
  };
  const handleEditProductClick = (product) => {
    setEditingItem(product);
    setShowModal(true);
  };
  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      await deleteProduct(id);
    }
  };

  // Kits
  const handleAddKitClick = () => {
    setEditingItem(null);
    setShowModal(true);
  };
  const handleEditKitClick = (kit) => {
    setEditingItem(kit);
    setShowModal(true);
  };
  const handleDeleteKit = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este kit?")) {
      await deleteKit(id);
    }
  };

  return (
    <> {/* Usar Fragment para envolver múltiples elementos */}
      <AdminNavbar />
      <div className="p-4 mx-auto max-w-7xl">
        {/* Gestión de Productos */}
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">GESTIÓN DE PRODUCTOS</h1>
              <p className="text-gray-600">Administra tu inventario de manera eficiente</p>
            </div>
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center gap-2"
              onClick={handleAddProductClick}
            >
              <IoAddCircleOutline className="text-2xl" />
              Agregar Producto
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center">
            {productos.map((producto) => (
              <Card 
                key={producto._id} 
                id={producto._id} 
                image={producto.image} 
                title={producto.nombre} 
                precio={producto.precio} 
                descripcion={producto.descripcion}
                precioDescuento={producto.precioDescuento}
                descuento={producto.descuento}
                cantidad={producto.cantidad}
                onEdit={() => handleEditProductClick(producto)}
                onDelete={() => handleDeleteProduct(producto._id)}
                isAdminView={true}
              />
            ))}
          </div>
        </>

        {/* Gestión de Kits */}
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">GESTIÓN DE KITS</h1>
              <p className="text-gray-600">Administra tus kits y combos especiales</p>
            </div>
            <button 
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center gap-2"
              onClick={handleAddKitClick}
            >
              <IoAddCircleOutline className="text-2xl" />
              Agregar Kit
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center">
            {kits.map((kit) => (
              <Card 
                key={kit._id}
                id={kit._id}
                image={kit.image}
                title={kit.nombre}
                precio={kit.precio}
                descripcion={kit.descripcion}
                cantidad={kit.productosIncluidos?.length}
                onEdit={() => handleEditKitClick(kit)}
                onDelete={() => handleDeleteKit(kit._id)}
                isAdminView={true}
              />
            ))}
          </div>
        </>
      </div>

      {/* Modal único para productos y kits */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <CrudProductos onClose={() => setShowModal(false)} productToEdit={editingItem} />
        <CrudKits onClose={() => setShowModal(false)} kitToEdit={editingItem} />
      </Modal>

      {/* Modal para el historial de ventas */}
      <Modal open={showSalesHistory} onClose={() => setShowSalesHistory(false)}>
        <SalesHistory />
      </Modal>

    </>
  );
};

export default AdminDashboard;
