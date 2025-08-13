import React from 'react'

import { useKits } from '../../contexts/KitsContext';
import CardUnidad from '../../componentes/UI/CardUnidad';
import { useParams } from 'react-router-dom';

export const Paquetes = () => {
  const {kits}  = useKits();
  const KitsList = Array.isArray(kits) ? kits : [];

  let { zonaActual } = useParams();
    if (zonaActual == undefined) {
      zonaActual = true;
    }
  return (
    <section className="flex justify-center gap-4 mx-auto max-w-7xl">
      <div className='flex flex-col p-4 mt-4'>
        <h2 className='p-4 text-center font-bold text-shadow-2xs text-4xl '> Nuestros Kits</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4 justify-items-center">
        {KitsList.map((kits) => (
          ( (zonaActual == kits.categoria || zonaActual == true) && kits.activo) &&  
          <CardUnidad id={kits._id} ImgURL={kits.image} nombre={kits.nombre} precio={kits.precio} descripcion={kits.descripcion && kits.descripcion.length > 15 ? kits.descripcion.slice(0, 35) + "..." : kits.descripcion} />
        ))}
      </div>
      </div>
      
    </section>
  );
}

export default Paquetes;
