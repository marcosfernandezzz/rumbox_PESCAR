import React  from 'react'
/* import productosDB from '../../json/MOCK_DATA.json' */
/* import card from '../../componentes/UI/card' */

import { useProductos } from '../../contexts/ProductsContext.jsx'
import  CardUnidad  from '../../componentes/UI/CardUnidad.jsx'
import { useParams, Link } from 'react-router-dom'

export const Productos = () => {
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