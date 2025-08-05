import React from 'react'

 const Card = ({id, image, title, precio}) => {
  return (
      <div key={id} className="bg-white mx-auto text-center p-4 h-66 w-46 md:h-70 md:w-52 border border-gray-300 rounded-xl shrink-0 shadow" >
          <img src={image} alt={title} className="h-24 w-full object-contain rounded bg-gray-50" />
          <h3 className="text-lg font-semibold mt-2">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{precio}</p>
          <div className="flex justify-center items-end m-4 ">
              
          </div>
      </div>
  )
}
export default Card;