import React from 'react'
import { Link } from "react-router-dom";
import { IoMailUnreadOutline } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { abrirWhatsApp } from '../../utils/Whatsapp';
import { FaPhone } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className='px-2 flex flex-col p-10 bg-orange-500 '>
      <div className='flex justify-around gap-4'>
        <div className='flex flex-col gap-2 justify-center '>
          <h2 className='text-2xl font-semibold md:text-4xl'>RumBox</h2>
          <Link to="/nosotros" className=' flex items-center gap-2 text-xl font-semibold '> <FaUsers className='hidden md:block'/> Sobre Nosotros</Link>
        </div>


        <div>
          <h3 className='text-xl font-semibold '>Contacto</h3>
          <div className='flex items-center gap-2'><IoMailUnreadOutline className='text-xl' />RumBox@gmail.com</div>
          <div className='flex items-center gap-2'><FaPhone className='text-xl' />+54 9 11 2526-8799</div>
        </div>


        <div>
          
          <h3 className='text-xl font-semibold'>Redes</h3>
          <div className='flex gap-2 text-xl md:text-2xl '>
            <a href="https://www.facebook.com/people/Rumbox-Arg/61558456629187/?rdid=RmW2dB7Z05odL0V5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14Fbfda3Mqy%2F" target="_blank" rel="noopener noreferrer"><FaFacebookSquare /></a>
            <a href="https://www.instagram.com/p/DND6AyZgIBS/?igsh=aTBxejZ0Yndicjlr" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <button onClick={abrirWhatsApp}> <FaWhatsapp/></button> 
            
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
