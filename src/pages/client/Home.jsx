import React, { useContext } from 'react'
import Hero from '../../componentes/UI/Hero'
import Slider from'../../componentes/UI/Slider'
import SingUpPrompt from '../../componentes/AUTH/SingUpPrompt'
import CardList from '../../componentes/UI/CardList'
import Promo from '../../componentes/UI/Promo.jsx'

/* import KitsData from '../../assets/Mockdata/KitsData.js' */
/* import ProductData from '../../assets/Mockdata/ProductData.js' */
import PromoImg from '../../assets/imagenes/Promo.png'
import hero2 from '../../assets/imagenes/bg3.jpg'

import { AuthContext } from '../../contexts/AuthContext.jsx';
import { useProductos } from '../../contexts/ProductsContext.jsx'
import { useKits } from '../../contexts/KitsContext.jsx'

export const Home = () => {
    const { usuario } = useContext(AuthContext);
    const { productos, loading } = useProductos();
    const productosvarios = Array.isArray(productos) ? productos.slice(0, 8) : [];
    const {kits} = useKits();
    const KitsList = Array.isArray(kits) ? kits.slice(0, 8) : [];
  return (
    <main className=''>
      
      <Hero heroImg={hero2} 
            title='¡Listo para tu próxima aventura?' 
            info='Productos prácticos para viajeros curiosos.' 
            refUrl ='Explorá nuestros productos'
            url={'/Productos'}/>
            
      <Slider/>
      
      {!usuario && <SingUpPrompt />}
      
      
        <CardList
          title='Kits Destacados.'
          Products={KitsList}
          url={'/Paquetes'}
          btn='Ver más kits...'
          type='kit'
        />
      
      
      <Promo 
          PromoImg={PromoImg} 
          title='ESENCIALES PARA LA NIEVE!!' 
          info='HASTA 40% OFF!' 
          url={'/Productos'} />
      
      {!loading && (
        <CardList
          title='Encuentra lo que buscas.'
          Products={productosvarios}
          url={'/Productos'}
          btn='Ver más productos...'
          type='producto'
        />
      )}
    </main>
  )
}

export default Home;
