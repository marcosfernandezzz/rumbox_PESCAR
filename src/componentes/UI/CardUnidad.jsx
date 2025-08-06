import React from 'react'
import { Link } from 'react-router-dom';

const CardUnidad = ({id, ImgURL, Nombre, Precio}) =>{
  return(
  
      <div key={id} className="bg-white text-center p-4 h-75 w-60 border border-gray-300 rounded-xl shrink-0 shadow relative" >
        <Link to={`/InfoProduct/${id}`}>
          <img src={ImgURL} alt={Nombre} className="h-24 w-full object-contain rounded bg-gray-50" />
          <h3 className="text-lg font-semibold mt-2">{Nombre}</h3>
          <p className="text-lg font-bold text-blue-600 mt-2">${Precio}</p>
        </Link>
        <div className="absolute bottom-0 left-0 right-0 m-4">
          <div className="flex justify-center items-end m-4 gap-2">
            <button className="mt-3 px-3 py-1 bg-orange-500 text-white rounded hover:bg-green-600 text-sm">
                Añadir al carrito
            </button>
          </div>
        </div>
      </div> 
  );
}
export default CardUnidad;
