import React from 'react'
import Hero from '../../componentes/Hero'
import Slider from'../../componentes/UI/Slider'
import SingUpPrompt from '../../componentes/AUTH/SingUpPrompt'
import CardList from '../../componentes/UI/CardList'
import Promo from '../../componentes/UI/Promo.jsx'

import KitsData from '../../assets/Mockdata/KitsData.js'
import ProductData from '../../assets/Mockdata/ProductData.js'
import PromoImg from '../../assets/imagenes/Promo.png'
import hero2 from '../../assets/imagenes/hero2.png'
export const Home = () => {
  return (
    <main className=''>
      <Hero heroImg={hero2} title='¡Listo para tu próxima aventura?' info='Productos prácticos para viajeros curiosos.'/>
      <Slider/>
      <SingUpPrompt/>
      <CardList title='Kit Destacados.'  Products= {KitsData} url={'/Paquetes'} btn='Ver mas Kits...' />
      <Promo PromoImg={PromoImg} title='ESENCIALES PARA LA NIEVE!!' info='HASTA 40% OFF!' url={'/Productos'} />
      <CardList title='Productos Varios.'  Products= {ProductData} url={'/Productos'} btn='Ver mas productos...'/>
    </main>
  )
}

export default Home;
