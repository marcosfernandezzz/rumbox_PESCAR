import React from 'react'
import { useParams } from 'react-router-dom'
import { useProductos } from '../../contexts/ProductsContext.jsx'
import { Link } from 'react-router-dom';
import { abrirWhatsApp } from "../../utils/Whatsapp.js";
export const InfoProduct = () => {

    const { Id } = useParams();

    const { productos } = useProductos();
    const productosvarios = Array.isArray(productos) ? productos : [];



    const ProducX = productosvarios.find(p => p._id === String(Id));
    if (!ProducX) {
        return <h2>Producto no encontrado.</h2>;
    }

    const { nombre, precio, descripcion, image ,caracteristicaUno, caracteristicaDos, caracteristicaTres } = ProducX;

 

    return (
        <section className='bg-white space-x-4  md:bg-gray-200 md: p-10'>
            <Link to="/productos">
                <button className=" absolute z-0 top-20 left-0 flex-1 bg-orange-400 text-gray-800 py-3 px-6 rounded-sm hover:bg-gray-300 transition-colors font-semibold">
                    ← Volver a productos
                </button>
            </Link>

            <div className="m-auto flex  flex-col justify-around gap-4 items-center bg-white p-10 md:w-4xl md:h-[550px] md:flex-row md:gap-0.5 md:">
                <div className=" bg-gray-200 ">
                    <img
                        src={`/img/${image}`} alt={nombre} className="h-[250px] w-[250px]  object-contain rounded-sm md:h-[400px] md:w-[400px]"
                    />
                </div>

                <div className="flex flex-col justify-center p-0 md:h-[350px] md:w-[350px]">
                    <div className='text-center text-shadow-2xs'>
                        <h1 className="text-3xl font-bold  m-2">{nombre}</h1>
                        <p className="text-2xl text-start font-semibold m-4 text-cyan-500 md:text-center">{'$ ' + precio}</p>
                    </div>

                    <div className=''>
                        <h2 className="text-lg font-bold mb-2">Descripción</h2>
                        <p className=" leading-relaxed">{descripcion}</p>
                        <p className='text-lg font-bold mb-2'>Caracteristicas:</p>
                        <ul className='list-disc pl-5 text-sm text-gray-600'>
                            <li>{caracteristicaUno}</li>
                            <li>{caracteristicaDos}</li>
                            <li>{caracteristicaTres}</li>
                        </ul>
                    </div>
                    <div className="flex flex-col  gap-4 pt-4">
                        
                        <button onClick={abrirWhatsApp} className="flex-1 bg-orange-400 text-white py-3 px-6 rounded-sm hover:bg-blue-700 transition-colors font-semibold">
                            Comprar Ahora
                        </button>
                
                        
                        <button className="flex-1 bg-white text-orange-400 border border-orange-400 py-3 px-6 rounded-sm hover:bg-blue-700 transition-colors font-semibold">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default InfoProduct;
