import React from 'react'

 const Card = ({id, image, title, precio, descripcion}) => {
  return (
      <div key={id} className="bg-white mx-auto text-center text-shadow-2xs p-4 h-66 w-46 md:h-70 md:w-52 my-2 border border-gray-300 rounded-xl shrink-0 shadow" >
          <img src={image} alt={title} className="h-24 w-full object-contain rounded bg-gray-50" />
          <h3 className="text-lg font-semibold mt-2">{title}</h3>
          <p className="text-xl  font-semibold text-cyan-400 p-0.5 rounded-xl mt-1">{precio}</p>
          <div className="flex justify-center items-end m-4 ">
              <p className='text-xs bg-orange-50 p-0.5 rounded-s  font-semibold md:text-sm'>{descripcion}</p>
          </div>
      </div>
  )
}
export default Card;