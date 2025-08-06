import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { useProductos } from '../../contexts/ProductsContext.jsx'
import  CardUnidad  from '../../componentes/UI/CardUnidad.jsx';

const Carrito = () => {
    const { usuario } = useContext(AuthContext);
    const { productos } = useProductos();
    
    if (!usuario) {
        return <div className="text-center p-4">Por favor, inicia sesión para ver tu carrito.</div>;
      }
    const carritoUser = Array.isArray(usuario.inventario) ? usuario.inventario : [];
    
    
    const productosvarios = Array.isArray(productos) ? productos : [];


  return (
    <section>
      <div>
        <h2>Productos en el carrito</h2>
        {console.log(usuario)}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center">
        {carritoUser.map((itemID) => {
        const producto = productosvarios.find(p => String(p._id) === String(itemID));
            return producto ? (
              <CardUnidad
                id={producto._id}
                ImgURL={producto.image}
                Nombre={producto.nombre}
                Precio={producto.precio}
              />
            ) : null;
        })}
      </div>
        
      </div>
      <div>
        <h2>Monto Total</h2>
      </div>
    </section>
  )
}

export default Carrito