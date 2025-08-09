import React, { useState , useContext , useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { useProductos } from '../../contexts/ProductsContext.jsx'
import { useKits } from '../../contexts/KitsContext';
import  CardCarrito  from '../../componentes/UI/CardCarrito.jsx';

const Carrito = () => {
    const { usuario } = useContext(AuthContext);
    const { productos } = useProductos();
    const {kits}  = useKits();

    
    
    const UsuarioX = localStorage.getItem('usuarioActual')
      ? JSON.parse(localStorage.getItem('usuarioActual'))
      : null;

    const carritoUser = UsuarioX && Array.isArray(UsuarioX.inventario)
      ? UsuarioX.inventario : [];
    
    const productosvarios = Array.isArray(productos) ? productos : [];
      const KitsList = Array.isArray(kits) ? kits : [];

    const [montoTotal, setMontoTotal] = useState(() => {
      let acumulador = 0;

      carritoUser.forEach((i) => {
        // Buscar si es producto
        const producto = productosvarios.find(p => String(p._id) === String(i));
        if (producto) {
          acumulador += producto.precio;
          return; // ya lo encontró, no seguimos
        }

        // Buscar si es kit
        const kit = KitsList.find(k => String(k._id) === String(i));
        if (kit) {
          acumulador += kit.precio;
        }
      });

      return acumulador; // valor inicial
    });
    


    const ActualizarMonto = (diferencia) => {
      setMontoTotal(prev => prev + diferencia);
    }

    const EliminarDelCarrito = (id) => {
      if (!usuario) return;
      
      // Filtrar inventario quitando el id que queremos eliminar
      usuario.inventario = usuario.inventario.filter(item => item !== id);

      // Guardar cambios
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));

      // Opcional: recalcular monto total
      const nuevoTotal = usuario.inventario.reduce((acc, itemID) => {
        const producto = productosvarios.find(p => String(p._id) === String(itemID));
        if (producto) return acc + producto.precio;
        const kit = KitsList.find(p => String(p._id) === String(itemID));
        if (kit) return acc + kit.precio;
        return acc;
      }, 0);
      setMontoTotal(nuevoTotal);
    };
    
 /*    useEffect(() => {
    const totalInicial = carritoUser.reduce((acc, itemID) => {
      const producto = productosvarios.find(p => String(p._id) === String(itemID));
      if (producto) return acc + producto.precio;
      const kit = KitsList.find(p => String(p._id) === String(itemID));
      if (kit) return acc + kit.precio;
      return acc;
    }, 0);
    setMontoTotal(totalInicial);
  }, [carritoUser, productosvarios, KitsList]); */
    
  if (!usuario) {
        return <div className="text-center p-4">Por favor, inicia sesión para ver tu carrito.</div>;
      }

  return (
    <section className="flex  justify-center p-4">
      <div>
        <h2>Productos en el carrito</h2>
        {console.log(usuario)}
        <div className="flex flex-col gap-2 justify-items-center">
        {carritoUser.map((itemID) => {
        const producto = productosvarios.find(p => String(p._id) === String(itemID));
            return producto ? (
              <CardCarrito
                id={producto._id}
                ImgURL={producto.image}
                Nombre={producto.nombre}
                Precio={producto.precio}
                descripcion={producto.descripcion && producto.descripcion.length > 15 ? producto.descripcion.slice(0, 35) + "..." : producto.descripcion}
                ActualizarMonto={ActualizarMonto}
                EliminarItem={EliminarDelCarrito}
              />
            ) : null;
        })}
        {carritoUser.map((itemID) => {
          const kit = KitsList.find(p => String(p._id) === String(itemID));
          return kit ? (
            <CardCarrito
              id={kit._id}
              ImgURL={kit.image}
              Nombre={kit.nombre}
              Precio={kit.precio}
              descripcion={kit.descripcion && kit.descripcion.length > 15 ? kit.descripcion.slice(0, 35) + "..." : kit.descripcion}
              ActualizarMonto={ActualizarMonto}
              EliminarItem={EliminarDelCarrito}
            />
          ) : null;
        })}

        </div>
        
      </div>
      <div className="bg-white  text-center p-2 md:p-4  h-40 w-80 md:h-44 md:w-200 border border-gray-300 rounded-xl shrink-0 shadow relative">
        <h2>El Monto Total es</h2>
        <p>$ {montoTotal}</p>
      </div>
    </section>
  )
}

export default Carrito