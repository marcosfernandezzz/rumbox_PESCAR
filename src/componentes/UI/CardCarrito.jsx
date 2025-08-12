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
    
      <div key={id} className="bg-white  text-center p-2 md:p-4  h-40 w-80 md:h-44 md:w-200 border border-gray-300 rounded-xl shrink-0 shadow relative" >
          
        <div className="absolute bottom-0 left-0 right-0 m-4">
            
            <div className="flex  justify-between  mx-4 my-2 gap-0.5  items-center">
                
                <img src={`/img/${ImgURL}`} alt={Nombre} className="h-20  w-auto object-contain md:h-30 rounded bg-gray-50" />

                <div className="flex-grow"> {/* Allow name/desc to take available space */}
                    <h3 className=" font-semibold mt-2 md:text-xl">{Nombre}</h3>
                    <p className='text-xs  md:text-sm  text-start  text-gray-400'>{descripcion}</p>
                    <button className='flex items-center' onClick={Eliminar}> Eliminar <TiTrash /></button>
                </div>

                <div className="flex flex-col items-center"> {/* Group price per unit and quantity */}
                    <p className="text-lg md:text-xl font-bold text-blue-600">${new Intl.NumberFormat('es-AR').format(precioNumerico)}</p>
                    <div className='flex items-center gap-1'> {/* Quantity controls */}
                        <button className="mt-2 px-2 py-1 md:p-0.5 md:text-lg  bg-orange-500 text-white rounded hover:bg-blue-500 text-xs"
                        onClick={Menos}>
                        <TiMinus />
                        </button>
                        <span className="mx-1">{cantidad}</span>
                        <button className="mt-2 px-2 py-1 md:p-0.5 md:text-lg  bg-orange-500 text-white rounded hover:bg-blue-500 text-xs"
                        onClick={Mas}>
                        <TiPlus />
                        </button>
                    </div>
                </div>
                <p className="text-lg md:text-xl font-bold text-blue-600 text-right">${new Intl.NumberFormat('es-AR').format(total)}</p> {/* Total price */}
            </div>
        </div>
      </div> 
  );
}
export default CardCarrito;
