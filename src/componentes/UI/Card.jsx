import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useProductos } from '../../contexts/ProductsContext.jsx';
import {abrirWhatsApp} from '../../utils/Whatsapp.js'
import { IoIosCart } from "react-icons/io";

const Card = ({id, image, title, precio, descripcion, precioDescuento, descuento, cantidad, onEdit, onDelete, isAdminView}) => {
    const { usuario, setUsuario } = useContext(AuthContext);
    const { productos } = useProductos();

    const addCart = () => {
      if (!usuario) {
        alert("Por favor, inicia sesión para agregar productos al carrito.");
        return;
      }

      const producto = productos.find(p => p._id === id);
      if (!producto) return;

      const productoEnCarrito = usuario.inventario.find(item => item.id === id);
      const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.cant : 0;

      if (cantidadEnCarrito >= producto.cantidad) {
        alert("No hay suficiente stock disponible.");
        return;
      }

      let inventarioActualizado;
      if (productoEnCarrito) {
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

  const formattedPrecio = new Intl.NumberFormat('es-AR').format(precio);
  const formattedPrecioDescuento = precioDescuento ? new Intl.NumberFormat('es-AR').format(precioDescuento) : null;

  return (
      <div key={id} className="bg-white mx-auto text-center text-shadow-2xs p-4 h-80 w-46 md:h-88 md:w-60 my-2 border border-gray-300 rounded-xl shrink-0 shadow relative" >
          {descuento > 0 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{descuento}%
            </div>
          )}
          <img src={`/img/${image}`} alt={title} className="h-24  w-full object-contain md:h-30 rounded bg-gray-50" />
          <h3 className="text-lg font-semibold mt-2 md:text-xl truncate">{title}</h3>
          
          <div className="flex flex-col justify-start m-4 h-20"> {/* Altura fija para el contenido */}
              <p className='text-xs md:text-sm text-start text-gray-400 overflow-hidden text-ellipsis line-clamp-3'>{descripcion}</p>
            
            {precioDescuento ? (
              <>
                <p className="text-sm text-start text-gray-500 line-through">${formattedPrecio}</p>
<p className="text-xl text-start md:text-2xl font-semibold text-cyan-400 p-0.5 rounded-xl mt-1">${formattedPrecioDescuento}</p>
              </>
            ) : (
<p className="text-xl text-start md:text-2xl font-semibold text-blue-600 p-0.5 rounded-xl mt-1">${formattedPrecio}</p>
            )}
            
            {isAdminView && (
              <p className="text-xs text-start text-gray-600 mt-1">Stock {cantidad}</p>
            )}
          </div>
          
          <div className='flex gap-2 justify-center items-center mt-auto'> {/* mt-auto para empujar los botones hacia abajo */}
            {isAdminView ? (
              <>
                <button className="p-2 md:p-0.5 md:text-lg bg-red-500 text-white rounded hover:bg-red-600 text-xs flex-grow"
                  onClick={onDelete}>
                  Eliminar
                </button>
                <button className="p-2 md:p-0.5 md:text-lg bg-blue-500 text-white rounded hover:bg-blue-600 text-xs flex-grow"
                  onClick={onEdit}>
                  Editar
                </button>
              </>
            ) : (
              <>
<button className="p-2 md:p-1 md:text-lg bg-orange-500 text-white rounded hover:bg-blue-500 text-xs flex-grow"
                  onClick={abrirWhatsApp}>
                  Comprar Ahora!
                </button>
                <button className="bg-blue-500 text-white p-1 border rounded hover:bg-orange-500 hover:text-white text-xs md:p-1.5"
                  onClick={addCart}>
                  <IoIosCart className='text-2xl' />
                </button>
              </>
            )}
          </div>
      </div>
  )
}
export default Card;
