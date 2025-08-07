import SliderContainer from "react-cards-slider";
import img1 from '../../assets/imagenes/SliderImgs/botas-snowboard.png'
import img2 from '../../assets/imagenes/SliderImgs/sombrilla-de-playa-con-funda.png'
import img3 from '../../assets/imagenes/SliderImgs/gafas-de-sol-polarizadas.png'
import img4 from '../../assets/imagenes/SliderImgs/guantes-impermeable-nieve.png'
import img5 from '../../assets/imagenes/SliderImgs/mochila_buffalo_75.png'

import {abrirWhatsApp} from '../../utils/Whatsapp.js'
import { IoIosCart } from "react-icons/io";


function Slider() {
    const cards = [
      {
    "id": 8,
    "nombre": "Botas Snowboard",
    "precio": '800.000',
    "preciodescuento": '480.000',
    "descuento": '40% OFF',
    "descripción": "Calzado técnico para nieve con ajuste rápido y suela antideslizante. Mantiene el pie seco y abrigado. Ideal para deportes extremos o caminatas en terreno nevado.",
    "caracteristica 1": "Suela con gran tracción",
    "caracteristica 2": "Sistema de ajuste rápido BOA",
    "caracteristica 3": "Interior térmico e impermeable",
    "image": img1
  },
  {
    "id": 9,
    "nombre": "Sombrilla de Playa con funda",
    "precio": '98.500',
    "preciodescuento": '73.875',
    "descuento": '25% OFF',
    "descripción": "Sombrilla resistente al viento y con protección solar. Viene con funda para transportarla fácilmente. Ideal para playa, camping o picnic.",
    "caracteristica 1": "Protección solar + UPF",
    "caracteristica 2": "Funda de transporte incluida",
    "caracteristica 3": "Sistema anti-viento reforzado",
    "image": img2
  },
  {
    "id": 10,
    "nombre": "Gafas De Sol Polarizadas",
    "precio": '180.000',
    "preciodescuento": '117.000',
    "descuento": '35% OFF',
    "descripción": "Lentes con filtro polarizado que reducen reflejos y mejoran la visión al aire libre. Protegen los ojos del sol y son ideales para conducir o actividades acuáticas.",
    "caracteristica 1": "Polarizado con UV400 completo",
    "caracteristica 2": "Marco liviano y flexible",
    "caracteristica 3": "Incluye estuche rígido protector",
    "image": img3
  },
  {
    "id": 11,
    "nombre": "Guantes Impermeable Nieve",
    "precio": '18.000',
    "preciodescuento": '12.600',
    "descuento": '30% OFF',
    "descripción": "Guantes de abrigo ideales para temperaturas bajo cero. Resisten la humedad y permiten movilidad. Con superficie antideslizante para mayor agarre.",
    "caracteristica 1": "Tela térmica impermeable",
    "caracteristica 2": "Cierre ajustable con velcro",
    "caracteristica 3": "Palma antideslizante reforzada",
    "image": img4
  },{
    "id": 32,
    "nombre": "Mochila de camping Buffalo 75lts",
    "precio": '311.134',
    "preciodescuento": '233.350',
    "descuento": '25% OFF',
    "descripción": "Mochila de gran capacidad para campamentos, trekking y expediciones. Diseño ergonómico, múltiples bolsillos y sistema de ajuste lumbar para largas travesías. Resistente al agua y al desgaste.",
    "característica 1": "Gran capacidad 75L",
    "característica 2": "Cintas ajustables y respaldo acolchado",
    "característica 3": "Resistente al agua",
    "image": img5
  }
        
    ];
     const addCart = () => {
      usuario.inventario.push(id);
    }

    const buttonClasses = ` w-12 h-12 flex justify-center items-center rounded-full 
          bg-gradient-to-r from-slate-300 to-blue-100 shadow-md disabled:cursor-not-allowed
          active:scale-95 disabled:opacity-50`

    return (
        <section className="m-10 bg-gray-100 shadow-md h-[450px] rounded-xl md:h-94">
            <div>
                <h3 className="text-2xl text-center font-bold m-12" >Ofertas del Mes!</h3>
            </div>
            <div className='w-3/4 h-[400px] m-auto mt-10'>
                <SliderContainer
                    containerClasses='flex justify-center items-center  bg-gray-100  '
                    leftButtonClasses={`${buttonClasses} mr-3`}
                    rightButtonClasses={`${buttonClasses} ml-3`}
                    cardsWrapperClasses='gap-4'
                    
                >
                    {
                        cards.map((card) => (
                            <div key={card.id} className="bg-white text-center text-shadow-2xs p-4 h-70 w-52 border border-gray-300 rounded-xl shrink-0 shadow" >
                                <img src={card.image} alt={card.nombre} className="h-24 w-full object-contain rounded bg-gray-50" />
                                <h3 className="text-lg font-semibold mt-2">{card.nombre && card.nombre.length > 15 ? card.nombre.slice(0, 15) + "..." : card.nombre}</h3>
                                
                                <p className="text-l line-through text-start  text-gray-400 mt-1">{'$ '+card.precio}</p>
                                <div className="flex  gap-0.5 items-center">
                                    <p className="text-xl  font-semibold text-cyan-400 p-0.5 rounded-xl mt-1">{'$ '+card.preciodescuento}</p>
                                    <p className="text-xs  font-semibold text-green-500 p-0.5 rounded-xl mt-1">{card.descuento}</p>
                                </div>
                                
                                <div className='flex  gap-2 justify-center items-center'>
                                            <button className="mt-2 p-2  md:p-0.5 md:text-lg  bg-orange-500 text-white rounded hover:bg-blue-500 text-xs"
                                              onClick={abrirWhatsApp}>
                                              Comprar Ahora!
                                            </button>
                                            <button className="mt-2  bg-white text-orange-500 p-1 border  rounded hover:bg-blue-500 hover:text-white text-xs"
                                              onClick={addCart}>
                                              <IoIosCart className='text-2xl' />
                                
                                            </button>
                                          </div>

                            </div>
                        ))
                    }

                </SliderContainer>
            </div>
        </section>
    )
}

export default Slider