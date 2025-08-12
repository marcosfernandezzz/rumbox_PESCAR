import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from "../../assets/imagenes/rumbi.svg";
import '../../index.css'
import { MdMenu } from "react-icons/md"; {/* <MdMenu /> */ }
import { CgShoppingCart } from "react-icons/cg"; {/* <CgShoppingCart /> */ }
import { FaUserCircle } from "react-icons/fa"; {/* <FaUserCircle /> */ }
import { FaHome } from "react-icons/fa";   {/*<FaHome />*/ }
import { GiSuitcase } from "react-icons/gi";  
import { TfiMenuAlt } from "react-icons/tfi";
import { FaUsers } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from '../../contexts/AuthContext';
import Toast from './Toast';

export const NavBar = () => {
    const [open, setOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const { usuario, logout } = useContext(AuthContext);

    // Actualiza el contador del carrito cuando cambia el usuario
    useEffect(() => {
        if (usuario && usuario.inventario) {
            setCartCount(usuario.inventario.reduce((acc, item) => acc + (item.cant || 1), 0));
        } else {
            setCartCount(0);
        }
    }, [usuario]);

    // Permite mostrar el toast desde cualquier parte
    window.rumboxToast = (msg) => {
        setToastMsg(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
    };



    // Cerrar el menú cuando cambie la ubicación
    React.useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <section className='text-white'>
            {/* Toast de confirmación */}
            <Toast message={toastMsg} show={showToast} />
            {/* mobile first */}
            <div className='flex justify-between items-center p-4 bg-rumbox  md:hidden'>
                <Link to="/"><div className='flex items-center gap-2'>
                    <img src={logo} alt="logo" className='w-12 h-12 rounded-full' />
                    <h1 className='text-3xl font-bold'>Rumbox</h1>
                </div></Link>
                <div className='flex gap-4'>
                    <button onClick={() => setOpen(!open)}>
                        <MdMenu className='text-2xl cursor-pointer md:hidden' />
                    </button>
                    
                </div>
            </div>
            {/* Menú desplegable mobile */}
            {open && (
                <>
                    <hr className='relative z-20'/>
                    <div className='relative z-20 bg-[#052f81] flex flex-col items-start gap-2 p-4  md:hidden'>
                        <div className='flex justify-center-safe gap-4 items-center '>
                            <FaUserCircle className='text-5xl' />
                            <div className='flex-row'>
                                {usuario ? (
                                    <>
                                        <h3 className='text-xl block'>Bienvenido, {usuario.name || 'Usuario'} !</h3>
                                        <button 
                                            onClick={handleLogout}
                                            className='block text-sm text-orange-300 hover:text-orange-100'
                                        >
                                            Cerrar sesión
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h3 className='text-xl block'>Bienvenido</h3>
                                        <Link to="/login" className='block'>Ingrese a su cuenta para ver mas...</Link>
                                    </>
                                )}
                            </div>
                        </div>
                        {!usuario && (
                            <div className='w-full flex gap-2 justify-center'>
                                <Link to="/login" className="bg-orange-500 text-white font-semibold w-[45%] py-2 rounded text-center items-center">
                                    Ingresá
                                </Link>
                                <Link to="/signup" className="bg-white text-orange-500 font-semibold w-[45%] py-2 rounded text-center">
                                    Creá tu cuenta
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className='bg-gray-100 text-black h-dvh flex flex-col p-4 justify-start   md:hidden'>
                        <Link to="/" className='text-xl m-2 flex items-center gap-2 p-2 hover:text-orange-500 hover:bg-gray-200'><FaHome />Inicio</Link>
                        <Link to="/productos" className='text-xl m-2 flex items-center gap-2 p-2 hover:text-orange-500 hover:bg-gray-200'><TfiMenuAlt />Productos</Link>
                        <Link to="/paquetes" className='text-xl m-2 flex items-center gap-2 p-2 hover:text-orange-500 hover:bg-gray-200'><GiSuitcase />Kits</Link>
                        {usuario ? (
                            <Link to="/carrito" className='text-xl m-2 flex items-center gap-2 p-2 hover:text-orange-500 hover:bg-gray-200 relative'>
                                <CgShoppingCart />Carrito
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full px-2 text-xs font-bold">{cartCount}</span>
                                )}
                            </Link>
                        ) : (<></>)
                            }
                        
                        <Link to="/nosotros" className='text-xl m-2 flex items-center gap-2 p-2 hover:text-orange-500 hover:bg-gray-200'><FaUsers />Nosotros</Link>
                        {usuario && (
                            <button 
                                onClick={handleLogout}
                                className='text-xl m-2 flex items-center gap-2 p-2 hover:text-orange-500 hover:bg-gray-200'
                            >
                                <FaSignOutAlt />Cerrar sesión
                            </button>
                        )}
                    </div>
                </>
            )}

            {/* desktop version */}
            <div className='hidden md:flex flex-col justify-around items-center p-4 bg-rumbox '>
                <div className='flex items-center w-full justify-around'>
                    <Link to="/">
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <img src={logo} alt="logo" className='w-12 h-12 rounded-full' />
                        <h1 className='text-4xl font-bold'>Rumbox</h1>
                    </div>
                    </Link>
                    <div className='flex gap-4'>
                        <Link to="/" className='text-xl hover:text-orange-300'>Inicio</Link>
                        <Link to="/productos" className='text-xl hover:text-orange-300'>Productos</Link>
                        <Link to="/paquetes" className='text-xl hover:text-orange-300'>Kits</Link>
                        
                    </div>

                    <div className='flex flex-col gap-4 justify-center items-center '>
                        <div className='space-x-4 flex items-end'>
                            {usuario ? (
                                <>
                                    <span className='text-xl'>{usuario.name || 'Usuario'}</span>
                                    <Link to="/carrito" className="relative">
                                        <CgShoppingCart className='text-2xl hover:text-orange-300' />
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full px-2 text-xs font-bold">{cartCount}</span>
                                        )}
                                    </Link>

                                    <button 
                                        onClick={handleLogout}
                                        className='text-xl text-center cursor-pointer hover:text-orange-300'
                                    >
                                        <FaSignOutAlt/>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/signup" className='text-xl '>Crea tu cuenta</Link>
                                    <Link to="/login" className='text-xl '>Ingresa</Link>
                                </>
                            )}

                            
                        </div>
                    </div>

                </div>
                
                
                
            </div>


        </section>
    )
}
export default NavBar;