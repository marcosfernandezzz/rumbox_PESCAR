import React from 'react';
import { TiPlus , TiMinus , TiTrash } from "react-icons/ti";

const CardCarrito = ({id, ImgURL, Nombre, Precio,cantidad, descripcion,ActualizarCantidad, EliminarItem}) =>{

      const Mas = () => {
        ActualizarCantidad(id, cantidad + 1);
    };

    const Menos = () => {
        // La lógica en Carrito.jsx ahora maneja el caso de cantidad <= 0
        ActualizarCantidad(id, cantidad - 1);
    };
    
    const Eliminar = () => {
        EliminarItem(id);
    };

    // Explicitly convert Precio and cantidad to numbers for calculation
    const precioNumerico = parseFloat(Precio);
    const cantidadNumerica = parseInt(cantidad, 10);
    const total = precioNumerico * cantidadNumerica;


  return(
    
            <div key={id} className="bg-white p-2 md:p-4 border border-gray-300 rounded-xl shadow flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                <img src={`/img/${ImgURL}`} alt={Nombre} className="h-20 w-20 object-contain rounded bg-gray-50 flex-shrink-0" />
                <div className="flex flex-col flex-grow items-start justify-center w-full md:w-auto">
                    <h3 className="font-semibold text-lg md:text-xl mb-1">{Nombre}</h3>
                    <p className="text-xs md:text-sm text-gray-400 mb-2">{descripcion}</p>
                    <button
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-700 border-2 border-red-600 transition-all duration-150 text-sm md:text-base mt-1"
                        style={{ boxShadow: '0 2px 8px rgba(255,0,0,0.15)' }}
                        onClick={Eliminar}
                    >
                        <span>Eliminar</span>
                        <TiTrash className="text-xl md:text-2xl" />
                    </button>
                </div>
                <div className="flex flex-col items-start justify-center min-w-[140px] md:min-w-[180px] gap-1">
                    <div>
                        <p className="text-xs text-gray-500">Precio unitario</p>
                        <p className="text-lg md:text-xl font-bold text-blue-600">${new Intl.NumberFormat('es-AR').format(precioNumerico)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Subtotal</p>
                        <p className="text-lg md:text-xl font-bold text-orange-500">${new Intl.NumberFormat('es-AR').format(total)}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-gray-500 mr-2">Cantidad</span>
                        <button className="px-2 py-1 md:p-0.5 md:text-lg bg-orange-500 text-white rounded hover:bg-blue-500 text-xs" onClick={Menos}>
                            <TiMinus />
                        </button>
                        <span className="mx-1 font-bold">{cantidad}</span>
                        <button className="px-2 py-1 md:p-0.5 md:text-lg bg-orange-500 text-white rounded hover:bg-blue-500 text-xs" onClick={Mas}>
                            <TiPlus />
                        </button>
                    </div>
                </div>
            </div>
  );
}
export default CardCarrito;
