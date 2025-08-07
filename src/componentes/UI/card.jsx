import React from 'react'
import {abrirWhatsApp} from '../../utils/Whatsapp.js'
import { IoIosCart } from "react-icons/io";
 const Card = ({id, image, title, precio, descripcion}) => {
    const addCart = () => {
      usuario.inventario.push(id);
    }
  return (
      <div key={id} className="bg-white mx-auto text-center text-shadow-2xs p-4 h-80 w-46 md:h-88 md:w-60 my-2 border border-gray-300 rounded-xl shrink-0 shadow" >
          <img src={image} alt={title} className="h-24  w-full object-contain md:h-30 rounded bg-gray-50" />
          <h3 className="text-lg font-semibold mt-2 md:text-xl">{title}</h3>
          
          <div className="flex flex-col justify-center  m-4 ">
              <p className='text-xs  md:text-sm  text-start  text-gray-400'>{descripcion}</p>
            <p className="text-xl text-start md:text-2xl font-semibold text-cyan-400 p-0.5 rounded-xl mt-1">{precio}</p>
          </div>
          <div className='flex  gap-2 justify-center items-center'>
            <button className="mt-2 p-2  md:p-0.5 md:text-lg  bg-orange-500 text-white rounded hover:bg-blue-500 text-xs"
              onClick={abrirWhatsApp}>
              Comprar Ahora!
            </button>
            <button className="mt-2  bg-white text-orange-500 p-1 border  rounded hover:bg-blue-500 hover:text-white text-xs"
              onClick={addCart}>
              <IoIosCart className='text-2xl' />

            </button>
          </div>
      </div>
  )
}
export default Card;