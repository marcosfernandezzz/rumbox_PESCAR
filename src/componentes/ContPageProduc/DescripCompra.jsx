import React from 'react'
import { useProductos } from '../../contexts/ProductsContext.jsx'
import { useKits } from '../../contexts/KitsContext';


export const DescripCompra = () => {

    const { productos } = useProductos();
    const productosvarios = Array.isArray(productos) ? productos : [];
    
    const {kits}  = useKits();
    const KitsList = Array.isArray(kits) ? kits : [];

    const copiaUser = localStorage.getItem('usuarioActual');
    const comprador = copiaUser ? JSON.parse(copiaUser) : null;

    // Si no hay comprador o inventario, mostrar un mensaje
    if (!comprador || !comprador.inventario || comprador.inventario.length === 0) {
        return (
            <section className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">No hay compras realizadas</h2>
                    <p className="text-gray-600">Por favor, realiza una compra para ver los detalles aquí.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Detalles de Compra</h2>
            
            <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700 border-b pb-2">Información del Comprador</h3>
                <p className="text-lg text-gray-700 mb-2"><strong>Nombre:</strong> {comprador.name}</p>
                <p className="text-lg text-gray-700"><strong>Correo:</strong> {comprador.email}</p>
            </div>

            <div>
                <div className="flex justific-between text-2xl font-semibold mb-4 text-blue-700 border-b pb-2">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700 pb-2">Productos Comprados</h3>
                    
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700 pb-2">Precio Unitario  -  Precio x Cantidad</h3>

                </div>
                
                <div className="space-y-6">
                    {comprador.inventario.map((item) => {
                        const producto = productosvarios.find(p => String(p._id) === String(item.id));
                        const kit = KitsList.find(p => String(p._id) === String(item.id));
                        
                        if (producto) {
                            return (
                                <div key={item.id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 border border-gray-200 space-y-4 md:space-y-0 md:space-x-4">
                                    <img src={`/img/${producto.image}`} alt={producto.nombre} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0"/>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="text-xl font-bold text-gray-800 mb-1">{producto.nombre}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{producto.descripcion ? producto.descripcion.slice(0, 50) + (producto.descripcion.length > 50 ? '...' : '') : 'Sin descripción'}</p>
                                        <p className="text-lg font-semibold text-green-600">Cantidad: {item.cant}</p>
                                    </div>
                                    <div className="flex flex-p-5">
                                        <p className="text-xl font-bold text-blue-700">${producto.precio}</p>
                                        <p className="text-xl font-bold text-blue-700">${producto.precio * item.cant}</p>
                                    </div>
                                </div>
                            );
                        } else if (kit) {
                            return (
                                <div key={item.id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 border border-gray-200 space-y-4 md:space-y-0 md:space-x-4">
                                    <img src={`/img/${kit.image}`} alt={kit.nombre} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0"/>
                                    <div className="flex-grow text-center md:text-left">
                                        <h4 className="text-xl font-bold text-gray-800 mb-1">{kit.nombre}</h4>
                                        <p className="text-sm text-gray-600 mb-2">{kit.descripcion ? kit.descripcion.slice(0, 50) + (kit.descripcion.length > 50 ? '...' : '') : 'Sin descripción'}</p>
                                        <p className="text-lg font-semibold text-green-600">Cantidad: {item.cant}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="text-xl font-bold text-blue-700">${kit.precio}</p>
                                        <p className="text-xl font-bold text-blue-700">${kit.precio * item.cant}</p>
                                    </div>
                                </div>
                            );
                        }
                        return null; // Si no es producto ni kit, no renderiza nada
                    })}
                </div>
            </div>
        </section>

    );
}

export default DescripCompra;
