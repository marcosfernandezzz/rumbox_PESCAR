import React, { useContext } from 'react'
/* import productosDB from '../../json/MOCK_DATA.json' */
/* import card from '../../componentes/UI/card' */

import { useProductos } from '../../contexts/ProductsContext.jsx'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function CardUnidad(props) {
  return(
  
      <div key={props.id} className="bg-white text-center p-4 h-75 w-60 border border-gray-300 rounded-xl shrink-0 shadow relative" >
        <Link to={`/InfoProduct/${props.id}`}>
          <img src={props.ImgURL} alt={props.Nombre} className="h-24 w-full object-contain rounded bg-gray-50" />
          <h3 className="text-lg font-semibold mt-2">{props.Nombre}</h3>
          <p className="text-lg font-bold text-blue-600 mt-2">${props.Precio}</p>
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


function Filtros() {
  return(

    <div className="flex flex-col bg-white text-center p-4 border border-gray-300 rounded-xl shrink-0 shadow relative">
      <Link to="/productos" ><div className="">Limpiar Filtros</div></Link>
      <Link to="/productos/Nieve" ><div className="">Nieve</div></Link>
      <Link to="/productos/Montaña" ><div className="">Montaña</div></Link>
      <Link to="/productos/Playa" ><div className="">Playa</div></Link>
    </div>
  );
}


export const Productos = () => {
  /* 
  const { usuario } = useContext(AuthContext);
  */  
  const { productos } = useProductos();
  const productosvarios = Array.isArray(productos) ? productos : [];

  let { zonaActual } = useParams();
  if (zonaActual == undefined) {
    zonaActual = true;
  }

  // Depuración: mostrar los ids de los productos

  return (
    <section className="flex justify-center gap-4 mx-auto max-w-7xl">
      <div className="w-60 shrink-0">
        <Filtros />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center">
        {productosvarios.map((producto) => (
          ( (zonaActual == producto.categoria || zonaActual == true) && producto.activo) &&  
          <CardUnidad id={producto._id} ImgURL={producto.image} Nombre={producto.nombre} Precio={producto.precio} />
        ))}
      </div>
    </section>
  );
}

export default Productos;

/* 
<div key={producto.id} className="bg-white text-center p-4 h-75 w-60 border border-gray-300 rounded-xl shrink-0 shadow relative" >
                                <img src={producto.ImgURL} alt={producto.Nombre} className="h-24 w-full object-contain rounded bg-gray-50" />
                                <h3 className="text-lg font-semibold mt-2">{producto.Nombre}</h3>
                                
                                <p className="text-lg font-bold text-blue-600 mt-2">${producto.Precio}</p>
                                <div className="absolute bottom-0 left-0 right-0 m-4">
                                  <div className="flex justify-center items-end m-4 gap-2">
                                    <Link to={`/InfoProduct/${producto.id}`}>
                                        <button className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                                            Ver más
                                        </button>
                                    </Link>
                                    <button className="mt-3 px-3 py-1 bg-orange-500 text-white rounded hover:bg-green-600 text-sm">
                                        Añadir al carrito
                                        
                                    </button>
                                  </div>
                                </div>
                              </div> 
                              
*/