import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './server/config/db.config.js'
import { fileURLToPath } from 'url'
import clientRoutes from './server/routes/client.routes.js'
import authRoutes from './server/routes/auth.routes.js'

connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Servir archivos estáticos desde la carpeta server/public
app.use(express.static(path.join(__dirname, 'server', 'public')))

// Usar las rutas modularizadas
app.use('/', clientRoutes)
app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`)
})
