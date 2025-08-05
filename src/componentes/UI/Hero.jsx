import React from 'react'

import { Link } from 'react-router-dom'
const Hero = ({heroImg,title,info,url,refUrl}) => {
  return (
    <section className="rumbox-grlinear px-4 py-6 md:px-0.5 md:py-0.5">
      <div className="rounded-xl  overflow-hidden bg-white shadow-md flex flex-col md:max-w-full md:rounded-none">
        {/* Contenedor con fondo imagen y gradiente */}
        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[440px]">
          <img src={heroImg} className="absolute  w-full h-full object-cover" />
          
          {/* Contenido sobre la izquierda */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-black max-w-[60%] md:items-start">
            <h2 className="text-xl font-bold leading-tight md:text-4xl md:p-2">
              {title}
            </h2>

            <div className=" font-bold px-4 py-1 mt-3  text-sm w-fit  md:text-2xl md:p-2">
              {info}
            </div>

            <Link to={url} className="mt-2 text-sm text-semibold underline underline-offset-2 md:text-xl md:p-2">
              {refUrl}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero