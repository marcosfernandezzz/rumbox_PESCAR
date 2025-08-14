import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useKits } from '../../contexts/KitsContext.jsx';
import { Link } from 'react-router-dom';
import { abrirWhatsApp } from '../../utils/Whatsapp.js';
import { IoIosCart } from "react-icons/io";

const CardUnidad = ({ id, ImgURL, nombre, precio, descripcion }) => {
    const { usuario, setUsuario } = useContext(AuthContext);
    const { kits } = useKits();

    const addCart = () => {
        if (!usuario) {
            alert("Por favor, inicia sesión para agregar productos al carrito.");
            return;
        }

        const kit = kits.find(k => k._id === id);
        if (!kit) return;

        const kitEnCarrito = usuario.inventario.find(item => item.id === id);
        const cantidadEnCarrito = kitEnCarrito ? kitEnCarrito.cant : 0;

        if (cantidadEnCarrito >= kit.cantidad) {
            alert("No hay suficiente stock disponible.");
            return;
        }

        let inventarioActualizado;
        if (kitEnCarrito) {
            inventarioActualizado = usuario.inventario.map(item =>
                item.id === id ? { ...item, cant: item.cant + 1 } : item
            );
        } else {
            inventarioActualizado = [...usuario.inventario, { id: id, cant: 1 }];
        }

        const usuarioActualizado = { ...usuario, inventario: inventarioActualizado };

    setUsuario(usuarioActualizado);
    localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
    if (window.rumboxToast) window.rumboxToast('¡Kit agregado al carrito!');
    };

    return (
                <div className="bg-white text-center p-2 md:p-4 h-80 w-44 md:h-88 md:w-60 border border-gray-300 rounded-xl shrink-0 shadow relative">
                        <Link to={`/InfoProduct/${id}`}>
                                <img src={`https://rumbox-pescar.onrender.com/api/images/${ImgURL}`} alt={nombre} className="h-24 w-full object-contain md:h-30 rounded bg-gray-50" />
                                <h3
                                    className="font-semibold mt-2 md:text-xl truncate max-w-[180px] line-clamp-1"
                                    title={nombre}
                                >
                                    {nombre}
                                </h3>
                        </Link>
            <div className="flex flex-col justify-start m-4 flex-grow min-h-[70px]">
                <p className='text-xs md:text-sm text-start text-gray-400 overflow-hidden text-ellipsis'>{descripcion}</p>
                <p className="text-xl text-start md:text-2xl font-semibold text-blue-600 p-0.5 rounded-xl mt-1">${new Intl.NumberFormat('es-AR').format(precio)}</p>
            </div>
            <div className='flex gap-2 justify-center items-center mt-auto'>
                <Link to={`/InfoProduct/${id}`} className="p-2 md:p-1 md:text-lg bg-orange-500 text-white rounded hover:bg-orange-800 text-xs flex-grow cursor-pointer">
                    Ver más
                </Link>
                <button className="bg-blue-500 text-white p-1 border rounded hover:bg-blue-800 hover:text-white text-xs md:p-1.5 cursor-pointer"
                    onClick={addCart}>
                    <IoIosCart className='text-2xl' />
                </button>
            </div>
        </div>
    );
}
export default CardUnidad;
