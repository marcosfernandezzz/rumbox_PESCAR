import React  from 'react'
/* import productosDB from '../../json/MOCK_DATA.json' */
/* import card from '../../componentes/UI/card' */
import { RiResetRightFill } from "react-icons/ri";

import { useProductos } from '../../contexts/ProductsContext.jsx'
import Card from '../../componentes/UI/Card.jsx'
import { useParams, Link } from 'react-router-dom'

export const Productos = () => {
  const { productos } = useProductos();
  const productosvarios = Array.isArray(productos) ? productos : [];
  let { zonaActual, descuentoActivo } = useParams();

  if (zonaActual === undefined) {
    zonaActual = true;
  }

  const productosFiltrados = productosvarios.filter(producto => {
    const cumpleCategoria = (zonaActual === true || zonaActual === producto.categoria);
    const cumpleActivo = producto.activo;
    const cumpleDescuento = (descuentoActivo === 'descuento' ? producto.descuento > 0 : true);
    return cumpleCategoria && cumpleActivo && cumpleDescuento;
  });

  console.log("Productos recibidos en Productos.jsx:", productosvarios); // Log de depuración
  return (
    <section className="flex justify-center gap-4 mx-auto max-w-7xl">
      
      <div className='flex flex-col p-4 mt-4'>

        <h2 className='text-start ml-10 p-4 font-bold text-shadow-2xs text-3xl md:text-4xl'>Catalogo Completo!</h2>
        <div className="">
          <Filtros />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4 justify-items-center">
          {productosFiltrados.map((producto) => (
            <Card 
              key={producto._id} 
              id={producto._id} 
              image={producto.image} 
              title={producto.nombre} 
              precio={producto.precio} 
              precioDescuento={producto.precioDescuento}
              descuento={producto.descuento}
              descripcion={producto.descripcion && producto.descripcion.length > 15 ? producto.descripcion.slice(0, 35) + "..." : producto.descripcion} />
          ))}
        </div>
      </div>

    </section>
  );
}

export default Productos;

function Filtros() {
  return(
    <div className='rounded-xs  border-black bg-gray-100'>
      <div className='text-center text-2xl'>
        <h3 className='font-semibold text-shadow-md'>Categorias</h3>
      </div>
      <div className="flex justify-around  text-center p-2 text-shadow-md md:text-xl  ">
      
      
      <Link to="/productos/Nieve" ><div className="">Nieve</div></Link>
      <Link to="/productos/Montaña" ><div className="">Montaña</div></Link>
      <Link to="/productos/Playa" ><div className="">Playa</div></Link>
      <Link to="/productos/descuento" ><div className="">Descuentos</div></Link>
      <Link to="/productos" ><p><RiResetRightFill /></p> </Link>
    </div>
    </div>
    
  );
}
