import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './server/config/db.config.js'
import { fileURLToPath } from 'url'
import clientRoutes from './server/routes/client.routes.js'
import authRoutes from './server/routes/auth.routes.js'
import productRoutes from './server/routes/product.routes.js'
import cors from 'cors'

dotenv.config()
connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000
const isDevelopment = process.env.NODE_ENV !== 'production'

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// Rutas de API (backend)
app.use('/api/auth', authRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/products', productRoutes)

// Configuración según el entorno
if (isDevelopment) {
  // En desarrollo, verificar si existe la carpeta dist
  const distPath = path.join(__dirname, 'dist')
  
  try {
    const fs = await import('fs')
    if (fs.existsSync(distPath)) {
      // Si existe dist, servir archivos estáticos
      app.use(express.static(distPath))
      
      // Todas las rutas que no sean /api/* van al frontend de React
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'))
      })
      console.log('Modo desarrollo: Sirviendo archivos estáticos desde /dist')
      console.log('Frontend disponible en http://localhost:3000')
    } else {
      // Si no existe dist, solo API
      console.log('Modo desarrollo: Solo API disponible')
      console.log('Frontend se sirve desde Vite en puerto 5173')
      console.log('Para acceder al frontend: http://localhost:5173')
    }
  } catch (error) {
    console.log('Modo desarrollo: Solo API disponible')
    console.log('Para acceder al frontend: http://localhost:5173')
  }
  
  console.log('Backend API disponible en http://localhost:3000/api/')
} else {
  // En producción, servir archivos estáticos de React
  const distPath = path.join(__dirname, 'dist')
  
  // Verificar si existe la carpeta dist
  try {
    const fs = await import('fs')
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath))
      
      // Todas las rutas que no sean /api/* van al frontend de React
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'))
      })
      console.log('Modo producción: Sirviendo archivos estáticos desde /dist')
    } else {
      console.error('Error: La carpeta dist no existe. Ejecuta "npm run build" primero.')
      process.exit(1)
    }
  } catch (error) {
    console.error('Error al verificar la carpeta dist:', error)
    process.exit(1)
  }
}

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})
