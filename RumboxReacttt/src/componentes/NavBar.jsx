import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/imagenes/rumbi.png";
import '../index.css'
import { MdMenu } from "react-icons/md"; {/* <MdMenu /> */ }
import { CgShoppingCart } from "react-icons/cg"; {/* <CgShoppingCart /> */ }
import { FaUserCircle } from "react-icons/fa"; {/* <FaUserCircle /> */ }
import { FaHome } from "react-icons/fa";   {/*<FaHome />*/ }
import { GiSuitcase } from "react-icons/gi";  
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa";


export const NavBar = () => {
    const [open, setOpen] = useState(false);
    return (
        <section className='text-white'>
            {/* mobile first */}
            <div className='flex justify-between items-center p-4 bg-rumbox  md:hidden'>
                <div className='flex items-center gap-2'>
                    <img src={logo} alt="logo" className='w-12 h-12 rounded-full' />
                    <h1 className='text-3xl font-bold'>Rumbox</h1>
                </div>
                <div className='flex gap-4'>
                    <button onClick={() => setOpen(!open)}>
                        <MdMenu className='text-2xl cursor-pointer md:hidden' />
                    </button>
                    <Link to="/carrito">
                        <CgShoppingCart className='text-2xl cursor-pointer md:hidden' />
                    </Link>
                </div>
            </div>
            {/* Menú desplegable mobile */}
            {open && (
                <>
                    <hr />
                    <div className=' bg-[#1A68FF] flex flex-col items-start gap-2 p-4 md:hidden'>
                        <div className='flex justify-center-safe gap-4 items-center '>
                            <FaUserCircle className='text-4xl' />
                            <div className='flex-row'>
                                <a href="" className='text-xl block'> Bienvenido </a>
                                <a href="" className='block'>Ingrese a su cuenta para ver mas...</a>
                            </div>

                        </div>


                    </div>
                    <div className='rumbox-grlinear h-dvh flex flex-col p-4 justify-start md:hidden'>
                        <Link to="/" className='text-xl m-2 flex items-center gap-2'><FaHome />Inicio</Link>
                        <Link to="/productos" className='text-xl m-2 flex items-center gap-2'><TfiMenuAlt />Productos</Link>
                        <Link to="/paquetes" className='text-xl m-2 flex items-center gap-2'><GiSuitcase />Paquetes</Link>
                        <Link to="/carrito" className='text-xl m-2 flex items-center gap-2'><CgShoppingCart />Carrito</Link>
                        <Link to="/nosotros" className='text-xl m-2 flex items-center gap-2'><FaUsers />Nosotros</Link>
                    </div>
                </>
            )}

            {/* desktop version */}
            <div className='hidden md:flex flex-col justify-around items-center p-4 bg-rumbox '>
                <div className='flex items-center w-full justify-around'>
                    <div className='flex items-center gap-2'>
                        <img src={logo} alt="logo" className='w-12 h-12 rounded-full' />
                        <h1 className='text-4xl font-bold'>Rumbox</h1>
                    </div>
                    <div className='flex gap-4'>
                        <Link to="/" className='text-xl '>Inicio</Link>
                        <Link to="/productos" className='text-xl '>Productos</Link>
                        <Link to="/paquetes" className='text-xl '>Paquetes</Link>
                        <Link to="/nosotros" className='hidden lg:inline text-xl '>Nosotros</Link>
                    </div>

                    <div className='flex flex-col gap-4 justify-center items-center '>
                        <div className='space-x-4 flex items-end'>
                            <a href="" className='text-xl '>Crea tu cuenta</a>

                            <a href="" className='text-xl '>Ingresa</a>

                            <Link to="/carrito">
                                <CgShoppingCart className='text-2xl' />
                            </Link>
                        </div>
                    </div>

                </div>
                
                
                
            </div>


        </section>
    )
}
export default NavBar;