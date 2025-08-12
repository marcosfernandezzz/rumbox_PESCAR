import React, { useState , useContext , useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext.jsx'
import { useProductos } from '../../contexts/ProductsContext.jsx'
import { useKits } from '../../contexts/KitsContext';
import { Link } from 'react-router-dom';
import CardCarrito from '../../componentes/UI/CardCarrito.jsx';

const Carrito = () => {
    const { usuario, setUsuario } = useContext(AuthContext); // Asegurarse de que setUsuario esté disponible
    const { productos } = useProductos();
    const { kits } = useKits();

    const [carritoUser, setCarritoUser] = useState([]);
    const [montoTotal, setMontoTotal] = useState(0);

    const productosvarios = Array.isArray(productos) ? productos : [];
    const KitsList = Array.isArray(kits) ? kits : [];

    // Este useEffect se ejecuta cada vez que el 'usuario' del contexto cambia.
    useEffect(() => {
        if (usuario && Array.isArray(usuario.inventario)) {
            setCarritoUser(usuario.inventario);
        } else {
            setCarritoUser([]);
        }
    }, [usuario]);

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

    const EliminarDelCarrito = (id) => {
        if (!usuario) return;
        const inventarioActualizado = usuario.inventario.filter(item => item.id !== id);
        const usuarioActualizado = { ...usuario, inventario: inventarioActualizado };
        setUsuario(usuarioActualizado);
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
    };

    const ActualizarCantidad = (id, nuevaCantidad) => {
        if (!usuario) return;

        if (nuevaCantidad <= 0) {
            EliminarDelCarrito(id);
            return;
        }

        const item = productosvarios.find(p => String(p._id) === String(id)) || KitsList.find(k => String(k._id) === String(id));
        if (!item) return;

        // Asumiendo que 'cantidad' en el producto/kit es el stock disponible
        if (nuevaCantidad > item.cantidad) { 
            alert(`No puedes agregar más de ${item.cantidad} unidades de este producto.`);
            return;
        }

        const inventarioActualizado = usuario.inventario.map(prod =>
            prod.id === id ? { ...prod, cant: nuevaCantidad } : prod
        );
        
        const usuarioActualizado = { ...usuario, inventario: inventarioActualizado };
        setUsuario(usuarioActualizado);
        localStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
    };
    
    const borrarLocalS = () => {
        localStorage.removeItem('usuario');
        // También limpiamos el estado para que se refleje inmediatamente en la UI
        setCarritoUser([]);
        setMontoTotal(0);
        // Si el contexto del usuario existe, lo actualizamos también
        if (usuario) {
            setUsuario(null); // Limpiar el usuario en el contexto
        }
    };
    
  if (!usuario) {
        return <div className="text-center p-4">Por favor, inicia sesión para ver tu carrito.</div>;
      }

  return (
    <section className="flex  justify-center p-4">
      <div>
        <h2>Productos en el carrito</h2>
        <div className="flex flex-col gap-2 justify-items-center">
        {carritoUser.map((item) => {
          const producto = productosvarios.find(p => String(p._id) === String(item.id));
          const kit = KitsList.find(p => String(p._id) === String(item.id));
          
          if (producto) {
            return (
              <CardCarrito
                key={producto._id} // Añadir key prop
                id={producto._id}
                ImgURL={producto.image}
                Nombre={producto.nombre}
                Precio={producto.precio}
                descripcion={producto.descripcion && producto.descripcion.length > 15 ? producto.descripcion.slice(0, 35) + "..." : producto.descripcion}
                cantidad={item.cant}
                ActualizarCantidad={ActualizarCantidad}
                EliminarItem={EliminarDelCarrito}
              />
            );
          }
          
          if (kit) {
            return (
              <CardCarrito
                key={kit._id} // Añadir key prop
                id={kit._id}
                ImgURL={kit.image}
                Nombre={kit.nombre}
                Precio={kit.precio}
                descripcion={kit.descripcion && kit.descripcion.length > 15 ? kit.descripcion.slice(0, 35) + "..." : kit.descripcion}
                cantidad={item.cant}
                ActualizarCantidad={ActualizarCantidad}
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
        <p>${new Intl.NumberFormat('es-AR').format(montoTotal)}</p>

        <button onClick={borrarLocalS}>
          Reiniciar
        </button>
        <Link to="/DescripCompra">
          <button>
            "Finalizar Compra"
          </button>
        </Link>

      </div>
    </section>
  )
}

export default Carrito
