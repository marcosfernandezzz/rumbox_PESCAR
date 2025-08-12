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
    };

    return (
        <div className="bg-white text-center p-2 md:p-4 h-80 w-44 md:h-88 md:w-60 border border-gray-300 rounded-xl shrink-0 shadow relative">
            <Link to={`/InfoProduct/${id}`}>
                <img src={`/img/${ImgURL}`} alt={nombre} className="h-24 w-full object-contain md:h-30 rounded bg-gray-50" />
                <h3 className="font-semibold mt-2 md:text-xl">{nombre}</h3>
            </Link>
            <div className="flex flex-col justify-start m-4 h-20">
                <p className='text-xs md:text-sm text-start text-gray-400 overflow-hidden text-ellipsis line-clamp-3'>{descripcion}</p>
                <p className="text-xl text-start md:text-2xl font-semibold text-blue-600 p-0.5 rounded-xl mt-1">${new Intl.NumberFormat('es-AR').format(precio)}</p>
            </div>
            <div className='flex gap-2 justify-center items-center mt-auto'>
                <button className="p-2 md:p-1 md:text-lg bg-orange-500 text-white rounded hover:bg-blue-500 text-xs flex-grow"
                    onClick={abrirWhatsApp}>
                    Comprar Ahora!
                </button>
                <button className="bg-blue-500 text-white p-1 border rounded hover:bg-orange-500 hover:text-white text-xs md:p-1.5"
                    onClick={addCart}>
                    <IoIosCart className='text-2xl' />
                </button>
            </div>
        </div>
    );
}
export default CardUnidad;
