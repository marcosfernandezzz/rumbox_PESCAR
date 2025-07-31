# Guía de Login y Register - Rumbox PESCAR

## Funcionalidades Implementadas

### ✅ **Sistema de Registro**
- Formulario de registro con validaciones
- Conexión con el backend MongoDB
- Encriptación de contraseñas con bcrypt
- Validación de email único
- Redirección automática al login después del registro

### ✅ **Sistema de Login**
- Formulario de login con validaciones
- Autenticación con el backend
- Generación de JWT token
- Almacenamiento seguro en localStorage
- Redirección automática al home después del login

### ✅ **Navegación Dinámica**
- NavBar que cambia según el estado de autenticación
- Botón de logout funcional
- Persistencia de sesión entre recargas

## Cómo Usar

### 1. **Registro de Usuario**
1. Ve a `/signup` o haz clic en "Crea tu cuenta"
2. Completa el formulario con:
   - Nombre completo
   - Email válido
   - Contraseña (mínimo 6 caracteres)
   - Confirmar contraseña
3. Haz clic en "Crear cuenta"
4. Si es exitoso, serás redirigido al login

### 2. **Login de Usuario**
1. Ve a `/login` o haz clic en "Ingresa"
2. Completa el formulario con:
   - Email registrado
   - Contraseña
3. Haz clic en "Iniciar sesión"
4. Si es exitoso, serás redirigido al home

### 3. **Logout**
1. Una vez autenticado, verás tu nombre en el NavBar
2. Haz clic en "Cerrar sesión"
3. Serás redirigido al home y la sesión se cerrará

## Estructura Técnica

### **Backend (Node.js + Express)**
```
/api/auth/register - POST - Registro de usuario
/api/auth/login - POST - Login de usuario
/api/auth/profile/:id - GET - Obtener perfil
```

### **Frontend (React)**
```
/src/componentes/Auth/Login.jsx - Componente de login
/src/componentes/Auth/SignUp.jsx - Componente de registro
/src/componentes/NavBar.jsx - Navegación dinámica
```

### **Almacenamiento**
- **Token JWT**: Guardado en localStorage
- **Datos de usuario**: Guardados en localStorage
- **Persistencia**: Entre recargas de página

## Validaciones

### **Frontend**
- Email válido (formato)
- Contraseña mínima 6 caracteres
- Confirmación de contraseña
- Campos requeridos

### **Backend**
- Email único en la base de datos
- Encriptación de contraseñas
- Validación de datos requeridos
- Manejo de errores

## Próximos Pasos

Para completar el sistema de autenticación, se pueden agregar:

1. **Middleware de autenticación** para proteger rutas
2. **Verificación de token** en cada petición
3. **Renovación automática** de tokens
4. **Recuperación de contraseña**
5. **Perfil de usuario** editable

## Variables de Entorno

Asegúrate de tener estas variables configuradas:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rumbox_pescar
JWT_SECRET=tu_super_secreto_jwt_muy_seguro_2024
```

## Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo completo
npm run dev

# Solo backend
npm run dev:server

# Solo frontend
npm run dev:client
``` 