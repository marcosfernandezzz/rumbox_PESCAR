# Ruteo por roles en Rumbox

Este proyecto implementa un sistema de ruteo donde usuarios y el admin usan el mismo formulario de login, pero el admin accede a pantallas exclusivas.

## ¿Cómo funciona?

- **Login único:** Todos los usuarios (incluido el admin) se loguean desde el mismo formulario.
- **Roles:** El backend devuelve el campo `role` en la respuesta del login (`admin` o `cliente`).
- **Contexto de autenticación:** El frontend guarda el usuario y su rol en el contexto global (`AuthContext`).
- **Rutas protegidas:**
  - Se usa el componente `AdminRoute` para proteger las rutas exclusivas del admin.
  - Se usa el componente `ClienteRoute` para bloquear el acceso del admin a las rutas de cliente.
- **Redirección:** Tras el login, si el usuario es admin, se le redirige automáticamente a `/admin`.
- **Navbar exclusivo:** El admin tiene un navbar propio en su panel, con botón de logout y su nombre.

## ¿Qué ve cada usuario?

- **Usuarios normales:** Acceden a las pantallas públicas y de cliente.
- **Admin:** Solo puede navegar entre las pantallas definidas en `src/pages/admin` y protegidas por `AdminRoute`. No puede acceder a las rutas de cliente.

## Ejemplo de rutas protegidas

**Ruta exclusiva para admin:**
```jsx
<Route path="/admin" element={
  <AdminRoute>
    <AdminDashboard />
  </AdminRoute>
} />
```

**Ruta protegida para cliente (bloquea admin):**
```jsx
<Route path="productos" element={
  <ClienteRoute>
    <Productos />
  </ClienteRoute>
} />
```

Puedes crear más componentes en `src/pages/admin` y agregarlos como rutas protegidas para el admin. Las rutas de cliente deben ir dentro de `ClienteRoute` para bloquear el acceso al admin.

## Archivos principales modificados
- `src/contexts/AuthContext.jsx`: Guarda el usuario y su rol.
- `src/componentes/AdminRoute.jsx`: Protege rutas exclusivas del admin.
- `src/componentes/ClienteRoute.jsx`: Bloquea el acceso del admin a rutas de cliente.
- `src/pages/admin/AdminDashboard.jsx`: Pantalla principal del admin.
- `src/componentes/UI/AdminNavbar.jsx`: Navbar exclusivo para el admin con logout.
- `src/App.jsx`: Define las rutas públicas, protegidas y exclusivas del admin.
- `src/componentes/Auth/Login.jsx`: Redirige al admin tras el login.

---

Si necesitas agregar más pantallas para el admin, solo crea el componente en `src/pages/admin` y agrégalo como ruta protegida en `App.jsx` usando `AdminRoute`.
