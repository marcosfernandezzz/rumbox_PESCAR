import React from 'react'
import  Card  from './Card'
import { Link } from 'react-router-dom';
const CardList = ({title,Products,url,btn}) => {
    return (
        <section className="  m-4 py-2 md:m-10 bg-gray-100 shadow-md md:min-h-[450px] rounded-xl">
            <div>
            <h2 className="text-xl md:text-2xl text-center font-bold m-6 md:m-12">{title}</h2>
            <div className='grid grid-cols-2 gap-2 items-center justify-center sm:grid-cols-2 md:grid-cols-4  sm:gap-2 md:gap-2 px-2 sm:px-4 md:px-0'>
            {Products.slice(0, 8).map((item) => (
                <Card key={item.id}  title={item.title.length > 15 ? item.title.slice(0, 12) + "…" : item.title} precio={item.precio} image={item.image} />
            ))}
            </div>
            </div>
            
            <div className=' mx-auto text-white font-semibold my-4 p-2 px-6 rounded-xl shadow-md bg-orange-500 w-fit'><Link to={url}> {btn}</Link></div>
        </section>


    )
}

export default CardList