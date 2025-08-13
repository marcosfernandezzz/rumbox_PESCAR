import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

// Importar rutas
import userRoutes from "./server/routes/user.routes.js"
import authRoutes from "./server/routes/auth.routes.js"
import clientRoutes from "./server/routes/client.routes.js"
import productRoutes from "./server/routes/product.routes.js"
import kitRoutes from "./server/routes/kit.routes.js"
import salesRoutes from "./server/routes/sale.routes.js"

// Configuración de dotenv
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Para desarrollo local
      "https://your-netlify-domain.netlify.app", // Reemplaza con tu dominio de Netlify
      // Agrega otros dominios si es necesario
    ],
    credentials: true,
  }),
)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const publicPath = path.join(__dirname, "src/server/public")
app.use("/api/images", express.static(path.join(publicPath, "img")))

console.log("Ruta absoluta de imágenes:", path.join(publicPath, "img"))

app.get('/', (req, res) => {
  res.send('API Rumbox funcionando');
});

// Rutas de API
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/client", clientRoutes)
app.use("/api/products", productRoutes)
app.use("/api/kits", kitRoutes)
app.use("/api/sales", salesRoutes)

console.log("Rutas de API cargadas: /api/users, /api/auth, /api/client, /api/products, /api/kits, /api/sales")

// Ya no intentamos servir la carpeta 'dist' porque el frontend está en Netlify

// Ruta de prueba para verificar que el servidor funciona
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend funcionando correctamente", timestamp: new Date().toISOString() })
})

// Manejo de rutas no encontradas para API
app.use("/api/*splat", (req, res) => {
  res.status(404).json({ message: "Ruta de API no encontrada" })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
  console.log(`Modo: ${process.env.NODE_ENV || "development"}`)
})
