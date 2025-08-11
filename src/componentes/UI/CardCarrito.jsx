import React from 'react';
import { TiPlus , TiMinus , TiTrash } from "react-icons/ti";

const CardCarrito = ({id, ImgURL, Nombre, Precio,cantidad, descripcion,ActualizarCantidad, ActualizarMonto, EliminarItem}) =>{

      const Mas = () => {
        ActualizarCantidad(id, cantidad + 1);
        ActualizarMonto(Precio);
    };

    const Menos = () => {
        if (cantidad > 1) {
            ActualizarCantidad(id, cantidad - 1);
            ActualizarMonto(-Precio); 
        }
    };
    
    const Eliminar = () => {
        EliminarItem(id);
    };


  return(
    
      <div key={id} className="bg-white  text-center p-2 md:p-4  h-40 w-80 md:h-44 md:w-200 border border-gray-300 rounded-xl shrink-0 shadow relative" >
          
        <div className="absolute bottom-0 left-0 right-0 m-4">
            
            <div className="flex  justify-between  mx-4 my-2 gap-0.5  items-center">
                
                <img src={`/img/${ImgURL}`} alt={Nombre} className="h-20  w-auto object-contain md:h-30 rounded bg-gray-50" />

                <div className=''>
                    <h3 className=" font-semibold mt-2 md:text-xl">{Nombre}</h3>
                    <p className='text-xs  md:text-sm  text-start  text-gray-400'>{descripcion}</p>
                    <button className='flex justify-center items-center' onClick={Eliminar}> Eliminar <TiTrash /></button>
                </div>

                <p className="text-lg md:text-xl text-start text-shadow-md font-bold text-blue-600 mt-2">${Precio}</p>
                
                <div className='flex flex-col gap-0 justify-center items-center'>
                    <button className="mt-2 px-2  md:p-0.5 md:text-lg  bg-orange-500 text-white rounded hover:bg-blue-500 text-xs"
                    onClick={Mas}>
                    <TiPlus />
                
                    </button>
                    <div>
                        {cantidad}
                    </div>
                    <button className="mt-2 px-2  md:p-0.5 md:text-lg  bg-orange-500 text-white rounded hover:bg-blue-500 text-xs"
                    onClick={Menos}>
                    <TiMinus />

                    </button>
                </div>
                <p className="text-lg md:text-xl text-start text-shadow-md font-bold text-blue-600 mt-2">${Precio*cantidad}</p>
            </div>
        </div>
      </div> 
  );
}
export default CardCarrito;
