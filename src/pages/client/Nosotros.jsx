import React, { useState } from 'react'
import grupal from '../../assets/imagenes/Team/grupal.jpeg'
import nosotros from '../../constants/Nosotros'
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { VscGithubInverted } from "react-icons/vsc";
import { TfiBriefcase } from "react-icons/tfi";






export const Nosotros = () => {

  const [integrantes, setIntegrantes] = useState(nosotros)

  return (
    <>
      <section className='container mx-auto px-5'>

        {/* SOBRE NOSOTROS */}
        <div className="  w-full flex justify-center px-4 py-8">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* TEXTO */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Sobre nosotros</h2>
              <p className="text-base lg:text-lg text-black leading-relaxed text-justify">
                Somos un grupo unidos por un mismo objetivo: formarnos para construir un futuro profesional en el mundo IT.
                <br />
                Fuimos seleccionados por la <span className="font-bold">Fundación Banco Nación y Fundación Pescar</span> para ser parte de un programa de becas que nos permitió capacitarnos como <span className="font-bold">Desarrolladores Web Full Stack y en Habilidades interpersonales</span>, que son claves para el ámbito laboral.
                <br />
                Aunque venimos de distintas localidades, trabajamos en equipo, compartimos aprendizajes y nos apoyamos mutuamente en este camino de crecimiento.
                Actualmente estamos desarrollando nuestro <span className="font-bold">Proyecto Integrador</span>, donde pusimos en práctica todo lo aprendido creando <span className="font-bold">RumBox: un e-commerce</span> pensado especialmente para viajeros.
              </p>
            </div>

            {/* IMAGEN */}
            <div className="flex justify-center">
              <img
                src={grupal}
                alt="Foto grupal"
                className="w-full max-w-[350px] h-auto object-cover shadow-md"
              />
            </div>
          </div>
        </div>

        {/* ¿QUÉ ES RUMBOX? */}
        <div className="w-full flex justify-center px-4 py-8">
          <div className="w-full max-w-6xl">
            <h2 className="text-3xl sm:text-3xl font-bold mb-4">
              ¿Qué es RumBox?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-black leading-relaxed text-justify">
              <span className="font-bold">RumBox</span> es una plataforma que ofrece kits y productos esenciales personalizados según el destino que el usuario elige, facilitando la preparación del viaje y evitando olvidos de último momento.
              <br />
              Sabemos que muchas personas experimentan estrés antes de viajar por la incertidumbre de haber olvidado algo importante. Nuestra solución simplifica la compra, haciéndola rápida, sencilla y adaptada a las necesidades reales del viajero.
              <br />
              <span className="font-bold">Este proyecto refleja nuestra creatividad, compromiso y las habilidades técnicas que adquirimos durante esta formación.</span>
            </p>
          </div>
        </div>



        {/* NUESTRO EQUIPO */}
        <h3 className='text-3xl font-bold text-center pt-8 mb-10 '>Nuestro equipo</h3>

        <div className=" m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-25 sm:px-15 lg:px-30">
          {integrantes.map((persona, index) => (
            <section
              key={index}
              className="border-2 border-gray-500 p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <img
                src={persona.foto}
                alt={persona.nombre}
                className="w-auto  object-cover mb-5"
              />
              <h3 className="text-lg font-semibold text-center mb-2">{persona.nombre}</h3>


              {/* Redes */}

              <div className=" flex flex-wrap justify-center items-center gap-3">
                <a
                  href={persona.linkedin}
                  target="_blank"
                  rel=""
                  className="  text-blue-600 text-2xl sm:text-2xl md:text-2xl lg:text-3xl"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={`mailto:${persona.email}`}
                  target="_blank"
                  rel=""
                  className=" text-red-800 m-1 text-2xl sm:text-2xl md:text-2xl lg:text-3xl "
                >
                  <SiGmail />
                </a>
                <a
                  href={persona.portfolio}
                  target="_blank"
                  rel=""
                  className='text-2xl sm:text-2xl md:text-2xl lg:text-3xl'
                >
                  <TfiBriefcase />
                </a>
                <a
                  href={persona.git}
                  target="_blank"
                  rel=""
                  className='text-2xl sm:text-2xl md:text-2xl lg:text-3xl'
                >
                  <VscGithubInverted />
                </a>

              </div>
            </section>
          ))}
        </div>

      </section>

    </>

  )
}



export default Nosotros;
