import React, { useState } from "react"; // Fragment no necesita ser importado explícitamente si se usa <>...</>
import AdminNavbar from "../../componentes/adminComp/AdminNavbar.jsx";
import CrudProductos from "../../componentes/adminComp/CrudProductos.jsx"; // Mantener para el modal
import CrudKits from "../../componentes/adminComp/CrudKits.jsx"; // Mantener para el modal
import Modal from "../../componentes/adminComp/Modal.jsx"; // Importar el componente Modal
import { useProductos } from '../../contexts/ProductsContext.jsx'; // Para obtener los productos
import Card from '../../componentes/UI/Card.jsx'; // Para mostrar los productos
import { IoAddCircleOutline } from "react-icons/io5"; // Icono para el botón de agregar

const AdminDashboard = () => {
  const { productos, deleteProduct } = useProductos();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleAddProductClick = () => {
    setEditingProduct(null); // Asegurarse de que no estamos en modo edición
    setShowAddProductModal(true);
  };

  const handleEditProductClick = (product) => {
    setEditingProduct(product);
    setShowEditProductModal(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      await deleteProduct(id);
      // La lista se recargará automáticamente gracias al ProductsContext
    }
  };

  return (
    <> {/* Usar Fragment para envolver múltiples elementos */}
      <AdminNavbar />
      <div className="p-4 mx-auto max-w-7xl"> {/* Aumentar el ancho máximo */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">GESTIÓN DE PRODUCTOS</h1>
            <p className="text-gray-600">Administra tu inventario de manera eficiente</p>
          </div>
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center gap-2"
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
              precioDescuento={producto.precioDescuento} // Pasar precioDescuento
              descuento={producto.descuento} // Pasar descuento
              cantidad={producto.cantidad} // Pasar cantidad para stock
              onEdit={() => handleEditProductClick(producto)} // Pasar función de edición
              onDelete={() => handleDeleteProduct(producto._id)} // Pasar función de eliminación
              isAdminView={true} // Indicar que es la vista de admin
            />
          ))}
        </div>
      </div>

      {/* Modal para Agregar Producto */}
      <Modal open={showAddProductModal} onClose={() => setShowAddProductModal(false)}>
        <CrudProductos onClose={() => setShowAddProductModal(false)} />
      </Modal>

      {/* Modal para Editar Producto */}
      <Modal open={showEditProductModal} onClose={() => setShowEditProductModal(false)}>
        <CrudProductos onClose={() => setShowEditProductModal(false)} productToEdit={editingProduct} />
      </Modal>

    </>
  );
};

export default AdminDashboard;
