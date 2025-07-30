# Rumbox PESCAR

Proyecto full-stack con React (frontend) y Express (backend).

## Estructura del Proyecto

- **Frontend**: React + Vite (puerto 5173)
- **Backend**: Express + MongoDB (puerto 3000)
- **API**: Rutas bajo `/api/*`

## Instalación

```bash
npm install
```

## Configuración de Base de Datos

Asegúrate de tener MongoDB instalado y configurar la variable de entorno:

```bash
# Crear archivo .env en la raíz del proyecto
MONGO_URI=mongodb://localhost:27017/rumbox_pescar
```

## Desarrollo

### Opción 1: Desarrollo completo (Recomendado)
```bash
npm run dev
```
Esto ejecutará:
- **Frontend**: http://localhost:5173 (React + Vite)
- **Backend**: http://localhost:3000 (Express)

### Opción 2: Solo backend
```bash
npm run dev:server
```
- **Backend**: http://localhost:3000 (Express)
- **APIs**: http://localhost:3000/api/*

### Opción 3: Solo frontend
```bash
npm run dev:client
```
- **Frontend**: http://localhost:5173 (React + Vite)

## Scripts Disponibles

- `npm run dev` - Ejecuta frontend y backend simultáneamente
- `npm run dev:client` - Solo el frontend (Vite)
- `npm run dev:server` - Solo el backend (Express)
- `npm run build` - Construye el frontend para producción
- `npm run server` - Ejecuta solo el servidor en producción

## Rutas de API

### Autenticación (`/api/auth/*`)
- `GET /api/auth/test` - Prueba de autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Login de usuario
- `GET /api/auth/profile/:id` - Obtener perfil de usuario

### Cliente (`/api/client/*`)
- `GET /api/client/test` - Prueba del cliente
- `GET /api/client/data` - Datos del cliente
- `GET /api/client/productos` - Lista de productos

## Ejemplos de Uso

### Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "password": "123456"
  }'
```

### Login de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@ejemplo.com",
    "password": "123456"
  }'
```

## Configuración

El proyecto está configurado para que:
- En **desarrollo**: 
  - Si existe `/dist`: Frontend y backend en puerto 3000
  - Si no existe `/dist`: Frontend en 5173, backend en 3000
- En **producción**: Express sirve los archivos estáticos de React

## Proxy

Vite está configurado para hacer proxy de las rutas `/api/*` al backend de Express automáticamente.

## Test de APIs

Puedes usar el archivo `public/test-api.html` para probar las APIs de autenticación:
1. Ejecuta `npm run dev`
2. Abre `http://localhost:5173/test-api.html`
3. Prueba registro y login

## Notas Importantes

- **"Cannot GET /"**: Es normal cuando ejecutas solo el backend. Visita las rutas `/api/*` para probar las APIs
- **Para desarrollo completo**: Usa `npm run dev` para tener frontend y backend funcionando
- **Para producción**: Ejecuta `npm run build` antes de `npm run server`
- **Base de datos**: Asegúrate de tener MongoDB corriendo y configurado
