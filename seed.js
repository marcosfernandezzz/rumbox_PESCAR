import Producto from "./server/models/product.model.js"
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el archivo JSON de productos
const productData = JSON.parse(
  readFileSync(join(__dirname, 'server', 'public', 'json', 'productos.json'), 'utf8')
);

const seedDatabase = async () => {
  try {
    console.log("🚀 Iniciando inserción de productos...");
    
    // Conectar a MongoDB si no está conectado
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://marcosfernandez2033:P89Qipmlh9S3NHnW@rumboxpescar.biprrti.mongodb.net/RumBox?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("📡 Conectado a MongoDB");
    }
    
    // Limpiar la colección antes de insertar (opcional)
    const deletedCount = await Producto.deleteMany({});
    console.log(`🧹 Colección limpiada - ${deletedCount.deletedCount} documentos eliminados`);
    
    // Insertar productos uno por uno
    let productosInsertados = 0;
    let productosConError = 0;
    
    for (const producto of productData) {
      try {
        // Mapear los datos del JSON a los campos del modelo
        const nuevoProducto = await Producto.create({
          // Manejar tanto 'id' como 'ID' debido a inconsistencias en el JSON
          idOriginal: producto.id || producto.ID,
          nombre: producto.nombre,
          precio: parseFloat(producto.precio) || 0,
          precioConDescuento: producto["precio con descuento"] ? 
            parseFloat(producto["precio con descuento"]) : null,
          descuento: producto["descuento (%)"] ? 
            parseInt(producto["descuento (%)"]) : 0,
          descripcion: producto.descripción || producto.Descripción || "",
          caracteristicas: [
            producto["característicaUno"] || producto["caracteristicaUno"],
            producto["característicaDos"] || producto["caracteristicaDos"], 
            producto["característicaTres"] || producto["caracteristicaTres"]
          ].filter(Boolean), // Filtrar valores vacíos o undefined
          image: producto.image || "",
          activo: true,
          stock: Math.floor(Math.random() * 50) + 1, // Stock aleatorio entre 1-50
          categoria: determinarCategoria(producto.nombre), // Solo montaña, playa o nieve
          fechaCreacion: new Date(),
          fechaActualizacion: new Date()
        });
        
        productosInsertados++;
        console.log(`✅ Insertado: ${nuevoProducto.nombre} (ID: ${nuevoProducto._id})`);
        
      } catch (error) {
        productosConError++;
        console.error(`❌ Error al insertar ${producto.nombre}:`, error.message);
      }
    }
    
    console.log(`\n📊 Resumen de inserción:`);
    console.log(`  ✅ Productos insertados: ${productosInsertados}`);
    console.log(`  ❌ Productos con error: ${productosConError}`);
    console.log(`  📦 Total procesados: ${productData.length}`);
    
    // Mostrar algunos productos insertados como confirmación
    const productosMostrar = await Producto.find({})
      .limit(5)
      .select('nombre categoria precio precioConDescuento descuento');
    
    console.log("\n📋 Primeros 5 productos insertados:");
    productosMostrar.forEach(producto => {
      const precioMostrar = producto.precioConDescuento ? 
        `$${producto.precioConDescuento} (desc. ${producto.descuento}%)` : 
        `$${producto.precio}`;
      console.log(`  - ${producto._id}: ${producto.nombre}`);
      console.log(`    📂 Categoría: ${producto.categoria}`);
      console.log(`    💰 Precio: ${precioMostrar}`);
    });
    
    // Estadísticas por categoría
    const estadisticasCategoria = await Producto.aggregate([
      {
        $group: {
          _id: "$categoria",
          cantidad: { $sum: 1 },
          precioPromedio: { $avg: "$precio" }
        }
      },
      { $sort: { cantidad: -1 } }
    ]);
    
    console.log("\n📈 Estadísticas por categoría:");
    estadisticasCategoria.forEach(stat => {
      console.log(`  - ${stat._id}: ${stat.cantidad} productos (Precio prom: $${Math.round(stat.precioPromedio)})`);
    });
    
    console.log("\n🎉 Base de datos poblada exitosamente!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error general al insertar datos:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
};

// Función helper para determinar categoría (solo 3 opciones)
function determinarCategoria(nombre) {
  const nombreLower = nombre.toLowerCase();
  
  // Categoría NIEVE
  if (nombreLower.includes('nieve') || 
      nombreLower.includes('snowboard') || 
      nombreLower.includes('ski') || 
      nombreLower.includes('antiparra') ||
      nombreLower.includes('botas') ||
      nombreLower.includes('guantes') ||
      nombreLower.includes('campera') ||
      nombreLower.includes('térmica') ||
      nombreLower.includes('termica')) {
    return 'Nieve';
  }
  
  // Categoría PLAYA
  if (nombreLower.includes('playa') || 
      nombreLower.includes('sol') || 
      nombreLower.includes('sombrilla') ||
      nombreLower.includes('sombrero') ||
      nombreLower.includes('gafas') ||
      nombreLower.includes('toalla') ||
      nombreLower.includes('sandalias') ||
      nombreLower.includes('protección solar') ||
      nombreLower.includes('upf')) {
    return 'Playa';
  }
  
  // Categoría MONTAÑA (por defecto para el resto)
  return 'Montaña';
}

// Función alternativa para inserción masiva (más rápida)
const seedDatabaseBulk = async () => {
  try {
    console.log("🚀 Iniciando inserción masiva de productos...");
    
    // Conectar a MongoDB si no está conectado
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://marcosfernandez2033:P89Qipmlh9S3NHnW@rumboxpescar.biprrti.mongodb.net/RumBox?retryWrites=true&w=majority');
      console.log("📡 Conectado a MongoDB");
    }
    
    // Limpiar la colección
    await Producto.deleteMany({});
    console.log("🧹 Colección limpiada");
    
    // Preparar datos para inserción masiva
    const productosParaInsertar = productData.map(producto => ({
        idOriginal: producto.id || producto.ID,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio) || 0,
        precioConDescuento: producto["precio con descuento"] ? 
          parseFloat(producto["precio con descuento"]) : null,
        descuento: producto["descuento (%)"] ? 
          parseInt(producto["descuento (%)"]) : 0,
        descripcion: producto.descripción || producto.Descripción || "",
        caracteristicas: [
          producto["característicaUno"] || producto["caracteristicaUno"],
          producto["característicaDos"] || producto["caracteristicaDos"], 
          producto["característicaTres"] || producto["caracteristicaTres"]
        ].filter(Boolean),
        image: producto.image || "",
        activo: true,
        stock: Math.floor(Math.random() * 50) + 1,
        categoria: determinarCategoria(producto.nombre),
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }));
    
    // Inserción masiva
    const resultado = await Producto.insertMany(productosParaInsertar);
    
    console.log(`✅ ${resultado.length} productos insertados exitosamente!`);
    
    // Mostrar estadísticas
    const totalProductos = await Producto.countDocuments();
    console.log(`📦 Total de productos en la base de datos: ${totalProductos}`);
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error en inserción masiva:", error.message);
    process.exit(1);
  }
};

// Ejecutar el seed
// Usa seedDatabase() para inserción uno por uno (más lenta pero con mejor control de errores)
// Usa seedDatabaseBulk() para inserción masiva (más rápida)
seedDatabase();

// Para usar inserción masiva, comenta la línea anterior y descomenta esta:
// seedDatabaseBulk();