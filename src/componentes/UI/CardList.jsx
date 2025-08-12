import React from 'react';
import Card from './Card';
import CardUnidad from './CardUnidad';
import { Link } from 'react-router-dom';

const CardList = ({ title, Products, url, btn, type = 'producto' }) => {
    const items = Array.isArray(Products) ? Products : [];

    const renderCard = (item) => {
        const cardProps = {
            id: item._id,
            nombre: item.nombre && item.nombre.length > 20 ? item.nombre.slice(0, 20) + "..." : item.nombre,
            precio: item.precio,
            descripcion: item.descripcion && item.descripcion.length > 25 ? item.descripcion.slice(0, 25) + "..." : item.descripcion,
        };

        if (type === 'kit') {
            return <CardUnidad {...cardProps} ImgURL={item.image} />;
        }
        
        // Por defecto, renderiza la tarjeta de producto
        return <Card {...cardProps} title={cardProps.nombre} image={item.image} />;
    };

    return (
        <section className="m-4 py-2 md:m-10 bg-gray-100 shadow-md md:min-h-[450px] rounded-xl">
            <div>
                <h2 className="text-xl md:text-2xl text-center font-bold m-6 md:m-12">{title}</h2>
                <div className='grid grid-cols-2 gap-2 items-center justify-center sm:grid-cols-2 md:grid-cols-4 sm:gap-2 md:gap-2 px-2 sm:px-4 md:px-0'>
                    {items.slice(0, 10).map((item) => (
                        <div key={item._id}>
                            {renderCard(item)}
                        </div>
                    ))}
                </div>
            </div>
            <div className='mx-auto text-white font-semibold my-4 p-2 px-6 rounded-xl shadow-md bg-orange-500 w-fit'>
                <Link to={url}>{btn}</Link>
            </div>
        </section>
    );
};

export default CardList;
