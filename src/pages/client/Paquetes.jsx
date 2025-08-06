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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center">
        {KitsList.map((kits) => (
          ( (zonaActual == kits.categoria || zonaActual == true) && kits.activo) &&  
          <CardUnidad id={kits._id} ImgURL={kits.image} Nombre={kits.nombre} Precio={kits.precio} />
        ))}
      </div>
    </section>
  );
}

export default Paquetes;
