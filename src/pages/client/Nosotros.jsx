import React, { useState } from 'react'
import grupal from '../../assets/imagenes/Team/grupal.jpeg'
import nosotros from '../../constants/Nosotros'
import { FaLinkedin } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { VscGithubInverted } from "react-icons/vsc";
import { TfiBriefcase } from "react-icons/tfi";

/* import AnimatedUs from "../../componentes/UI/AnimatedUs"; */




export const Nosotros = () => {
/*   const testimonios = [
    {
      quote: "Este sitio es increíble, me ayudó mucho.",
      name: "Lucas Fernández",
      designation: "Frontend Developer",
      src: nosotros[0].foto,
    },
    {
      quote: "Excelente experiencia, muy recomendado.",
      name: "Marcos",
      designation: "Backend Developer",
      src: nosotros[2].foto,
    },
    {
      quote: "Este sitio es increíble, me ayudó mucho.",
      name: "Kevin Laura",
      designation: "Desarrollador Frontend",
      src: nosotros[3].foto,
    },
    {
      quote: "Excelente experiencia, muy recomendado.",
      name: "Karen Flores",
      designation: "UX Designer",
      src: nosotros[1].foto,
    },
    {
      quote: "Este sitio es increíble, me ayudó mucho.",
      name: "Micaela Gordillo",
      designation: "Desarrollador Frontend",
      src: nosotros[4].foto,
    }, */
    

  /* ]; */
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

        {/* <div>
          <div className="min-h-screen flex items-center justify-center bg-black rounded-2xl text-white">
            <AnimatedUs testimonials={testimonios} autoplay />
          </div>
        </div> */}

        {/* NUESTRO EQUIPO */}
        <h3 className='text-3xl font-bold text-center pt-8 mb-10 '>Nuestro equipo</h3>

        <div className="m-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-4 lg:px-8">
          {integrantes.map((persona, index) => (
            <section
              key={index}
              className="border-2 bg-gray-50 border-gray-300 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 flex flex-col items-center w-full max-w-xs mx-auto"
            >
              <img
                src={persona.foto}
                alt={persona.nombre}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-2xl shadow-md object-cover mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold text-center mb-2">{persona.nombre}</h3>
              {/* Redes */}
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-2">
                {persona.linkedin && (
                  <a
                    href={persona.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xl sm:text-2xl lg:text-3xl hover:scale-110 transition-transform"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {persona.email && (
                  <a
                    href={`mailto:${persona.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-800 text-xl sm:text-2xl lg:text-3xl hover:scale-110 transition-transform"
                  >
                    <SiGmail />
                  </a>
                )}
                {persona.portfolio && (
                  <a
                    href={persona.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 text-xl sm:text-2xl lg:text-3xl hover:scale-110 transition-transform"
                  >
                    <TfiBriefcase />
                  </a>
                )}
                {persona.git && (
                  <a
                    href={persona.git}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-xl sm:text-2xl lg:text-3xl hover:scale-110 transition-transform"
                  >
                    <VscGithubInverted />
                  </a>
                )}
              </div>
            </section>
          ))}
        </div>

      </section>

    </>

  )
}



export default Nosotros;
