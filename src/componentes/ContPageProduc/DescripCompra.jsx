import React, { useContext } from 'react'
import { useProductos } from '../../contexts/ProductsContext.jsx'
import { useKits } from '../../contexts/KitsContext';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


export const DescripCompra = () => {
    const { usuario, setUsuario } = useContext(AuthContext);
    const navigate = useNavigate();
    const { productos } = useProductos();
    const productosvarios = Array.isArray(productos) ? productos : [];
    
    const {kits}  = useKits();
    const KitsList = Array.isArray(kits) ? kits : [];

    const copiaUser = localStorage.getItem('usuario');
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

    // Calcular el total de la compra
    let totalCompra = 0;
    const productosRender = comprador.inventario.map((item) => {
        const producto = productosvarios.find(p => String(p._id) === String(item.id));
        const kit = KitsList.find(p => String(p._id) === String(item.id));
        let precioUnitario = 0;
        let nombre = "";
        let descripcion = "";
        let imagen = "";
        if (producto) {
            precioUnitario = parseFloat(producto.precio);
            nombre = producto.nombre;
            descripcion = producto.descripcion;
            imagen = producto.image;
        } else if (kit) {
            precioUnitario = parseFloat(kit.precio);
            nombre = kit.nombre;
            descripcion = kit.descripcion;
            imagen = kit.image;
        }
        const cantidad = parseInt(item.cant, 10);
        const subtotal = precioUnitario * cantidad;
        totalCompra += subtotal;
        return (
            <div key={item.id} className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-4 border border-gray-200 space-y-4 md:space-y-0 md:space-x-4">
                <img src={`/img/${imagen}`} alt={nombre} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0"/>
                <div className="flex-grow text-center md:text-left">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">{nombre}</h4>
                    <p className="text-sm text-gray-600 mb-2">{descripcion ? descripcion.slice(0, 50) + (descripcion.length > 50 ? '...' : '') : 'Sin descripción'}</p>
                    <p className="text-lg font-semibold text-green-600">Cantidad: {cantidad}</p>
                </div>
                <div className="flex flex-col items-end gap-2 min-w-[180px]">
                    <p className="text-base text-gray-700">Precio unitario: <span className="font-bold text-blue-700">${new Intl.NumberFormat('es-AR').format(precioUnitario)}</span></p>
                    <p className="text-base text-gray-700">Subtotal: <span className="font-bold text-orange-500">${new Intl.NumberFormat('es-AR').format(subtotal)}</span></p>
                </div>
            </div>
        );
    });

    const handleConfirmPurchase = async () => {
        if (!comprador || !comprador.inventario || comprador.inventario.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        const saleData = {
            userId: comprador._id,
            products: comprador.inventario.map(item => {
                const producto = productosvarios.find(p => String(p._id) === String(item.id));
                const kit = KitsList.find(k => String(k._id) === String(item.id));
                return {
                    itemId: item.id,
                    quantity: item.cant,
                    itemType: producto ? 'Product' : 'Kit',
                };
            }),
            totalAmount: totalCompra,
        };

        console.log("Token de usuario:", usuario?.token); // Agregado para depuración
        console.log("Datos de venta a enviar:", saleData); // Agregado para depuración

        try {
            const response = await fetch('/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${usuario?.token}` // Usar optional chaining por si usuario o token es null
                },
                body: JSON.stringify(saleData),
            });

            if (!response.ok) {
                throw new Error('Error al registrar la venta');
            }

            alert('¡Compra realizada con éxito!');
            
            // Limpiar el carrito
            const usuarioActualizado = { ...usuario, inventario: [] };
            setUsuario(usuarioActualizado);
            localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));

            navigate('/'); // Redirigir al inicio
        } catch (error) {
            console.error('Error en la compra:', error);
            alert('Hubo un problema al procesar tu compra. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <section className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Detalles de Compra</h2>
            <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-4 text-blue-700 border-b pb-2">Información del Comprador</h3>
                <p className="text-lg text-gray-700 mb-2"><strong>Nombre:</strong> {comprador.name}</p>
                <p className="text-lg text-gray-700"><strong>Correo:</strong> {comprador.email}</p>
            </div>
            <div>
                <div className="flex justify-between text-2xl font-semibold mb-4 text-blue-700 border-b pb-2">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700 pb-2">Productos Comprados</h3>
                    <h3 className="text-2xl font-semibold mb-4 text-blue-700 pb-2">Detalle de Precios</h3>
                </div>
                <div className="space-y-6">
                    {productosRender}
                </div>
                <div className="flex justify-end mt-8">
                    <div className="bg-blue-100 rounded-lg px-6 py-4 shadow">
                        <p className="text-2xl font-bold text-blue-700">Total de la compra: <span className="text-orange-500">${new Intl.NumberFormat('es-AR').format(totalCompra)}</span></p>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button 
                        onClick={handleConfirmPurchase}
                        className="bg-green-600 text-white px-8 py-4 rounded-lg shadow-md hover:bg-green-700 transition duration-300 text-xl font-bold"
                    >
                        Confirmar Compra
                    </button>
                </div>
            </div>
        </section>
    );
}

export default DescripCompra;
