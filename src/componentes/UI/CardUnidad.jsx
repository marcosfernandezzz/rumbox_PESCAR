import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom';
import {abrirWhatsApp} from '../../utils/Whatsapp.js'
import { IoIosCart } from "react-icons/io";
import e from 'cors';

const CardUnidad = ({id, ImgURL, Nombre, Precio, descripcion, productosIncluidos}) =>{
    const { usuario } = useContext(AuthContext);
    const addCart = (id) => {
      const copiaUser = localStorage.getItem('usuarioActual');
      if (!copiaUser){
        if (!usuario.inventario.find(item => item.id === id)) {
        usuario.inventario.push({
          "id": id,
          "cant": 1 
        });
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        } else {
          const productoExistente = usuario.inventario.find(item => item.id === id);
          productoExistente.cant += 1;
          localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        }
      } else {
        const usuarioActual = JSON.parse(copiaUser);
        if (!usuarioActual.inventario.find(item => item.id === id)) {
          usuarioActual.inventario.push({
            "id": id,
            "cant": 1 
          });
          localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        } else {
          const productoExistente = usuarioActual.inventario.find(item => item.id === id);
          productoExistente.cant += 1;
          localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
        }
      }
    }
    
  return(
    
      <div key={id} className="bg-white  text-center p-2 md:p-4  h-80 w-44 md:h-88 md:w-60 border border-gray-300 rounded-xl shrink-0 shadow relative" >
        <Link to={`/InfoProduct/${id}`}>
          <img src={`/img/${ImgURL}`} alt={Nombre} className="h-24  w-full object-contain md:h-30 rounded bg-gray-50" />
          <h3 className=" font-semibold mt-2 md:text-xl">{Nombre}</h3>
          
        </Link>
      <div className="absolute bottom-0 left-0 right-0 m-4">

        <div className="flex flex-col    mx-4 my-2 gap-0.5">
          
          <p className='text-xs  md:text-sm  text-start  text-gray-400'>{descripcion}</p>
          <p className="text-lg md:text-xl text-start text-shadow-md font-bold text-blue-600 mt-2">${Precio}</p>
          <div className='flex  gap-2 justify-center items-center'>
            <button className="mt-2 px-2  md:p-0.5 md:text-lg  bg-orange-500 text-white rounded hover:bg-blue-500 text-xs"
              onClick={abrirWhatsApp}>
              Comprar Ahora!
            </button>
            <button className="mt-2  bg-white text-orange-500 p-1 border  rounded hover:bg-blue-500 hover:text-white text-xs"
              onClick={() => addCart(id)}>
              <IoIosCart className='text-2xl' />

            </button>
          </div>
        </div>
      </div>
      </div> 
  );
}
export default CardUnidad;
