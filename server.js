import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import clientRoutes from './server/routes/client.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

// Servir archivos estáticos desde la carpeta server/public
app.use(express.static(path.join(__dirname, 'server', 'public')))

// Usar las rutas modularizadas
app.use('/', clientRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/`)
}) 