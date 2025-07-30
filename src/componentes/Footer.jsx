import React from 'react'
import logo from '../assets/imagenes/rumbi.png'
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className='flex flex-col p-10 '>
      <div className='flex justify-around gap-4'>
        <div className='flex justify-center '>
          <h2 className='text-2xl font-semibold md:text-4xl'>RumBox</h2>
        </div>


        <div>
          <h3 className='text-xl font-semibold '>Contacto</h3>
          <div className='flex items-center gap-2'><IoMailUnreadOutline className='text-xl' />RumBox@gmail.com</div>
          <div className='flex items-center gap-2'><FaWhatsapp className='text-xl' />+54 9 11 2526-8799</div>
        </div>


        <div>
          <h3 className='text-xl font-semibold'>Redes</h3>
          <div className='flex gap-2 text-xl md:text-2xl '>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
            <a href="https://x.com/home?lang=es" target="_blank" rel="noopener noreferrer"><FaXTwitter /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>

        </div>


      </div>

      <div className='flex items-end justify-center h-10 font-semibold'>
        <p>&copy; Rumbox. Todos los derechos reservados</p>
      </div>
    </footer>
  )
}

export default Footer;
