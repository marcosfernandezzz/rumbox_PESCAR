import React, { useState } from 'react'
import grupal from '../../assets/imagenes/Team/grupal.jpeg'
import nosotros from '../../constants/Nosotros'


   

export const Nosotros = () => {

const [integrantes, setIntegrantes] = useState(nosotros)
   
  return (
    <>
    <section className='container mx-auto px-5'>

  {/* SOBRE NOSOTROS - MOBILE */}
  <div className='block md:hidden'>
    <h2 className='text-2xl font-bold text-blue-500 text-center pt-8'>Sobre nosotros  </h2>
    <p className='sm:text-lg text-black pt-4'>
      Somos un grupo unidos por un mismo objetivo: formarnos para construir un futuro profesional en el mundo IT.
      <br />
      Fuimos seleccionados por la <span className="font-bold">Fundación Banco Nación y Fundación Pescar</span> para ser parte de un programa de becas que nos permitió capacitarnos como <span className="font-bold">Desarrolladores Web Full Stack y en Habilidades interpersonales</span>, que son claves para el ámbito laboral.
      <br />
      Aunque venimos de distintas localidades, trabajamos en equipo, compartimos aprendizajes y nos apoyamos mutuamente en este camino de crecimiento.
      Actualmente estamos desarrollando nuestro <span className="font-bold">Proyecto Integrador</span>, donde pusimos en práctica todo lo aprendido creando <span className="font-bold">RumBox: un e-commerce</span> pensado especialmente para viajeros.
    </p>
    <img src={grupal} alt="Foto grupal" className='rounded-xl w-full max-w-md h-auto mt-4 mb-5' />
  </div>

  {/* SOBRE NOSOTROS - DESKTOP */}
  <div className='hidden md:flex md:flex-row items-start gap-x-8'>
    <div className='md:w-1/2'>
      <h2 className='text-2xl font-bold text-blue-500 pt-8 mb-4'>Sobre nosotros </h2>
      <p className='text-xl text-black'>
        Somos un grupo unidos por un mismo objetivo: formarnos para construir un futuro profesional en el mundo IT.
        <br />
        Fuimos seleccionados por la <span className="font-bold">Fundación Banco Nación y Fundación Pescar</span> para ser parte de un programa de becas que nos permitió capacitarnos como <span className="font-bold">Desarrolladores Web Full Stack y en Habilidades interpersonales</span>, que son claves para el ámbito laboral.
        <br />
        Aunque venimos de distintas localidades, trabajamos en equipo, compartimos aprendizajes y nos apoyamos mutuamente en este camino de crecimiento.
        Actualmente estamos desarrollando nuestro <span className="font-bold">Proyecto Integrador</span>, donde pusimos en práctica todo lo aprendido creando <span className="font-bold">RumBox: un e-commerce</span> pensado especialmente para viajeros.
      </p>
    </div>
    <div className='md:w-1/2 mt-6'>
      <img src={grupal} alt="Foto grupal" className='rounded-xl w-full h-auto max-w-md mx-auto' />


    </div>
  </div>

  {/* ¿QUÉ ES RUMBOX? */}
  <h2 className='text-2xl font-bold text-blue-500 text-center pt-8 mb-4'>¿Qué es RumBox?</h2>
  <p className='text-black text-lg'>
    <span className="font-bold">RumBox</span> es una plataforma que ofrece kits y productos esenciales personalizados según el destino que el usuario elige, facilitando la preparación del viaje y evitando olvidos de último momento.
    <br />
    Sabemos que muchas personas experimentan estrés antes de viajar por la incertidumbre de haber olvidado algo importante. Nuestra solución simplifica la compra, haciéndola rápida, sencilla y adaptada a las necesidades reales del viajero.
    <br />
    <span className="font-bold">Este proyecto refleja nuestra creatividad, compromiso y las habilidades técnicas que adquirimos durante esta formación.</span>
  </p>

  {/* NUESTRO EQUIPO */}
  <h3 className='text-2xl font-bold text-blue-500 text-center pt-8 mb-4'>Nuestro equipo</h3>

  <div className=" m-2 grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 text-center gap-4 mb-8 ">
    {integrantes.map((persona, index) => (
      <section key={index} className="border rounded-2xl h-auto p-4 bg-white shadow-md">
        <img src={persona.foto} alt={persona.nombre} className="w-auto h-64 object-contain rounded-xl mx-auto"/>
        <h3 className="text-xl font-semibold text-center mb-2">{persona.nombre}</h3>
        <p className="text-xl">
          <a href={persona.linkedin} target="_blank" rel="noopener noreferrer" className=" text-blue-600 ">
            Linkedin
          </a>
        </p>
      </section>
    ))}
  </div>
</section>   

    </>
   
  )
  }

  

export default Nosotros;
