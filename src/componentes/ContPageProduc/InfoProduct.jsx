import React from 'react'

import { useParams } from 'react-router-dom'

import { useProductos } from '../../contexts/ProductsContext.jsx'

import { Link } from 'react-router-dom';

export const InfoProduct = () => {

    const {Id} = useParams();
    
    const { productos } = useProductos();
    const productosvarios = Array.isArray(productos) ? productos : [];

  

  const ProducX = productosvarios.find(p => p._id === String(Id));
  if (!ProducX) {
    return <h2>Producto no encontrado.</h2>;
  }
  
  const { nombre, precio, descripcion, image } = ProducX;

  return (
    
    <section>
        <div className='absolute'>
            <Link to="/productos">
                <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                ← Volver a productos
                </button> 
            </Link>
        </div>
        <div className="mx-auto max-w-7xl">
            <div className='p-20'>

                <div className="flex justify-around items-center bg-gray-200 rounded-xl p-10">
                    {/* Columna de la imagen */}
                    <div className="rounded-xl ">
                        <img 
                            src={image} alt={nombre} className="h-100 w-auto  object-contain rounded-lg shadow-md"
                        />
                    </div>
                    
                    {/* Columna de la información */}
                    <div className="flex flex-col justify-center space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{nombre}</h1>
                            <p className="text-2xl font-bold text-blue-600">${precio}</p>
                        </div>
                    
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Descripción</h2>
                            <p className="text-gray-600 leading-relaxed">{descripcion}</p>
                        </div>
                    
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                            Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default InfoProduct;
