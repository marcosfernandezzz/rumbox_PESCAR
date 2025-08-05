import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Producto from './server/models/product.model.js';

dotenv.config();

const convertCSVToJSON = () => {
  return new Promise((resolve, reject) => {
    const results = [];
    
    fs.createReadStream('./server/public/productos.csv')
      .pipe(csv())
      .on('data', (data) => {
        // Mapear las columnas del CSV a nuestro modelo de producto
        const producto = {
          nombre: data.Nombre,
          precio: parseInt(data.Precio.replace(/[^\d]/g, '')), // Remover caracteres no numéricos
          descripcion: data.Descripción,
          categoria: determineCategory(data.Nombre), // Función para determinar categoría
          url: data.image,
          activo: true
        };
        
        // Agregar precio con descuento si existe
        if (data['Precio con descuento'] && data['Precio con descuento'] !== '') {
          producto.precioDescuento = parseInt(data['Precio con descuento'].replace(/[^\d]/g, ''));
        }
        
        // Agregar descuento si existe
        if (data['Descuento (%)'] && data['Descuento (%)'] !== '') {
          producto.descuento = parseInt(data['Descuento (%)']);
        }
        
        results.push(producto);
      })
      .on('end', () => {
        console.log('CSV convertido a JSON exitosamente');
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Función para determinar la categoría basada en el nombre del producto
const determineCategory = (nombre) => {
  const nombreLower = nombre.toLowerCase();
  
  if (nombreLower.includes('nieve') || nombreLower.includes('snowboard') || 
      nombreLower.includes('ski') || nombreLower.includes('frío') || 
      nombreLower.includes('térmica') || nombreLower.includes('guantes') ||
      nombreLower.includes('botas') || nombreLower.includes('campera')) {
    return 'Nieve';
  }
  
  if (nombreLower.includes('playa') || nombreLower.includes('sol') || 
      nombreLower.includes('sombrilla') || nombreLower.includes('gafas') ||
      nombreLower.includes('toalla') || nombreLower.includes('sandalias')) {
    return 'Playa';
  }
  
  if (nombreLower.includes('montaña') || nombreLower.includes('trekking') || 
      nombreLower.includes('camping') || nombreLower.includes('senderismo') ||
      nombreLower.includes('mochila') || nombreLower.includes('bastón')) {
    return 'Montaña';
  }
  
  // Por defecto, categoría general de viaje
  return 'Nieve';
};

const importProducts = async () => {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');

    // Convertir CSV a JSON
    const productos = await convertCSVToJSON();
    console.log(`Se encontraron ${productos.length} productos en el CSV`);

    // Limpiar productos existentes (opcional)
    await Producto.deleteMany({});
    console.log('Productos existentes eliminados');

    // Insertar productos en la base de datos
    const productosInsertados = await Producto.insertMany(productos);
    console.log(`✅ ${productosInsertados.length} productos importados exitosamente`);

    // Mostrar algunos productos como ejemplo
    console.log('\n📋 Ejemplos de productos importados:');
    productosInsertados.slice(0, 3).forEach(producto => {
      console.log(`- ${producto.nombre}: $${producto.precio} (${producto.categoria})`);
    });

  } catch (error) {
    console.error('Error al importar productos:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
    process.exit(0);
  }
};

// Ejecutar la importación
importProducts(); 