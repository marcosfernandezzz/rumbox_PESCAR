import React from 'react'
import { Link } from 'react-router-dom'

const SingUpPrompt = () => {
  return (
    
    <section>
        <div className='flex flex-col bg-gray-100 shadow-md m-10 rounded-xl gap-4 p-2 justify-center items-center'>
            <h3 className='text-xl text-shadow-2xs font-semibold'>¡Creá tu cuenta y mejorá tu experiencia!</h3>
            <Link to="/signup" className="bg-orange-500 text-white font-semibold shadow-md w-[50%] py-2 rounded text-center items-center">
                    Crea tu Cuenta
            </Link>
            <h4 className='flex gap-4 text-gray-500'>Ya tienes cuenta? <Link to="/login" className='text-shadow-2xs text-orange-500'> Ingresar</Link></h4>
        </div>
    </section>
  )
}

export default SingUpPrompt