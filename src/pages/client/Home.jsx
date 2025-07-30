import React from 'react'
import Hero from '../../componentes/Hero'
import Slider from'../../componentes/UI/Slider'
import SingUpPrompt from '../../componentes/AUTH/SingUpPrompt'

export const Home = () => {
  return (
    <main className=''>
      <Hero/>
      <Slider/>
      {/* <h2 className='text-3xl font-bold underline text-blue-500 bg-gray-200 h-dvh text-center justify-center pt-6'>contenido de Home</h2> */}
      <SingUpPrompt/>
    </main>
  )
}

export default Home;
