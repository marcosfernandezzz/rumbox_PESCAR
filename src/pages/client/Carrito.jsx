import React, { useState , useContext , useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { useProductos } from '../../contexts/ProductsContext.jsx'
import { useKits } from '../../contexts/KitsContext';
import  CardCarrito  from '../../componentes/UI/CardCarrito.jsx';

const Carrito = () => {
    const { usuario, setUsuario } = useContext(AuthContext); // <-- Obtén setUsuario para actualizar
    const { productos } = useProductos();
    const { kits } = useKits();

    const [carritoUser, setCarritoUser] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);

    const productosvarios = Array.isArray(productos) ? productos : [];
    const KitsList = Array.isArray(kits) ? kits : [];

    // Este useEffect se ejecuta una vez al inicio para cargar el carrito
    // y cada vez que el 'usuario' del contexto cambia.
    useEffect(() => {
        const storedUser = localStorage.getItem('usuarioActual');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && Array.isArray(parsedUser.inventario)) {
                setCarritoUser(parsedUser.inventario);
            }
        }
    }, []);

    // Este useEffect recalcula el monto total cada vez que 'carritoUser' cambia.
    useEffect(() => {
        const nuevoTotal = carritoUser.reduce((acc, item) => {
            const producto = productosvarios.find(p => String(p._id) === String(item.id));
            if (producto) return acc + producto.precio * item.cant;
            const kit = KitsList.find(p => String(p._id) === String(item.id));
            if (kit) return acc + kit.precio * item.cant;
            return acc;
        }, 0);
        setMontoTotal(nuevoTotal);
    }, [carritoUser, productosvarios, KitsList]);

    const ActualizarCantidad = (id, nuevaCantidad) => {
        if (!usuario) return;
        const inventarioActualizado = carritoUser.map(item =>
            item.id === id ? { ...item, cant: nuevaCantidad } : item
        );
        setCarritoUser(inventarioActualizado);
        
        // Actualiza el usuario en el contexto y localStorage
        const usuarioActualizado = { ...usuario, inventario: inventarioActualizado };
        setUsuario(usuarioActualizado); // Si tienes un setUsuario en el contexto
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));
    };
    
    const ActualizarMonto = (diferencia) => {
        setMontoTotal(prev => prev + diferencia);
    };

    const EliminarDelCarrito = (id) => {
        if (!usuario) return;
        const inventarioActualizado = carritoUser.filter(item => item.id !== id);
        setCarritoUser(inventarioActualizado);

        // Actualiza el usuario en el contexto y localStorage
        const usuarioActualizado = { ...usuario, inventario: inventarioActualizado };
        setUsuario(usuarioActualizado);
        localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));
    };
    
    const borrarLocalS = () => {
        localStorage.removeItem('usuarioActual');
        // También limpiamos el estado para que se refleje inmediatamente en la UI
        setCarritoUser([]);
        setMontoTotal(0);
        // Si el contexto del usuario existe, lo actualizamos también
        if (usuario) {
            setUsuario(null);
        }
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
        {carritoUser.map((item) => { // <-- Itera una sola vez sobre el array
          const producto = productosvarios.find(p => String(p._id) === String(item.id));
          const kit = KitsList.find(p => String(p._id) === String(item.id));
          
          if (producto) {
            return (
              <CardCarrito
                id={producto._id}
                ImgURL={producto.image}
                Nombre={producto.nombre}
                Precio={producto.precio}
                descripcion={producto.descripcion && producto.descripcion.length > 15 ? producto.descripcion.slice(0, 35) + "..." : producto.descripcion}
                cantidad={item.cant}
                ActualizarCantidad={ActualizarCantidad}
                ActualizarMonto={ActualizarMonto}
                EliminarItem={EliminarDelCarrito}
              />
            );
          }
          
          if (kit) {
            return (
              <CardCarrito
                id={kit._id}
                ImgURL={kit.image}
                Nombre={kit.nombre}
                Precio={kit.precio}
                descripcion={kit.descripcion && kit.descripcion.length > 15 ? kit.descripcion.slice(0, 35) + "..." : kit.descripcion}
                cantidad={item.cant}
                ActualizarCantidad={ActualizarCantidad}
                ActualizarMonto={ActualizarMonto}
                EliminarItem={EliminarDelCarrito}
              />
            );
          }
          
          return null;
        })}
      </div>
        
      </div>
      <div className="bg-white  text-center p-2 md:p-4  h-40 w-80 md:h-44 md:w-200 border border-gray-300 rounded-xl shrink-0 shadow relative">
        <h2>El Monto Total es</h2>
        <p>$ {montoTotal}</p>

        <button onClick={borrarLocalS}>
          Reiniciar
        </button>

      </div>
    </section>
  )
}

export default Carrito