import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { useProductos } from '../../contexts/ProductsContext.jsx'


const Carrito = () => {
    const { usuario } = useContext(AuthContext);
    if (!usuario) {
        return <div className="text-center p-4">Por favor, inicia sesión para ver tu carrito.</div>;
    }
    const carritoUser = usuario.inventario;
    
    const { productos } = useProductos();
    const productosvarios = Array.isArray(productos) ? productos : [];


  return (
    <section>
      <div>
        <h2>Productos en el carrito</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center">
        {productosvarios.map((item) => (
          ( productosvarios.find(p => p._id === String(item))) &&  
          <CardUnidad id={productos._id} ImgURL={producto.image} Nombre={producto.nombre} Precio={producto.precio} />
        ))}
      </div>
        
      </div>
      <div>
        <h2>Monto Total</h2>
      </div>
    </section>
  )
}

export default Carrito