import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { IoLogoPaypal } from "react-icons/io5";
import { CiCreditCard2 } from "react-icons/ci";
import { SiMercadopago } from "react-icons/si";

export const RealizarPago = () => {
    return (
        <section className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl flex flex-col items-center">

                {/* Pagos rápidos */}
                <div className="text-center mb-6 w-full">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Pagos Rápidos</h3>
                    <div className="flex justify-center space-x-4 flex-wrap">
                        
                        {/* Mercado Pago */}
                        <button className="flex items-center bg-sky-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-sky-600 transition-colors mb-2">
                            <SiMercadopago className="w-5 h-5 mr-2" />
                            Mercado Pago
                        </button>

                        {/* PayPal */}
                        <button className="flex items-center bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500 transition-colors mb-2">
                            <IoLogoPaypal className="w-5 h-5 mr-2" />
                            PayPal
                        </button>

                        {/* Google Pay */}
                        <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-800 transition-colors mb-2">
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Google Pay
                        </button>
                    </div>
                </div>

                {/* Separador */}
                <div className="relative my-6 w-full">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="bg-white px-3 text-lg font-medium text-gray-500 flex items-center">
                            <CiCreditCard2 className="mr-2" /> O pagar con tarjeta
                        </span>
                    </div>
                </div>

                {/* Datos de la tarjeta */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 text-left">Datos de la Tarjeta</h3>
                    
                    <div className="mb-3">
                        <label htmlFor="numero" className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                        <input
                            type="text"
                            id="numero"
                            placeholder="Número de tarjeta"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-3 mb-3">
                        <div className="flex-1">
                            <label htmlFor="vencimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento (MM/AA)</label>
                            <input
                                type="text"
                                id="vencimiento"
                                placeholder="MM/AA"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">Código de Seguridad (CVC)</label>
                            <input
                                type="text"
                                id="cvc"
                                placeholder="CVC"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="titular" className="block text-sm font-medium text-gray-700 mb-1">Titular de la Tarjeta</label>
                        <input
                            type="text"
                            id="titular"
                            placeholder="Nombre del titular"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <div className="flex-1">
                            <label htmlFor="pais" className="block text-sm font-medium text-gray-700 mb-1">País</label>
                            <input
                                type="text"
                                id="pais"
                                placeholder="Ej: Argentina"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-1">Provincia</label>
                            <select
                                id="provincia"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                                <option>Buenos Aires</option>
                                <option>Córdoba</option>
                                <option>Santa Fe</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                            <input
                                type="text"
                                id="codigoPostal"
                                placeholder="Ej: 1406"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            

                {/* Navigation Buttons */}
                <div className="mt-8 flex justify-between items-center w-full">
                    <Link to="/carrito" className="text-blue-600 hover:underline flex items-center text-sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Volvel al carrito
                    </Link>
                    <Link to="/DescripCompra">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors">
                            Finalizar Compra
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RealizarPago;
