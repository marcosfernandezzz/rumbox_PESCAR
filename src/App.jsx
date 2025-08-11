import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/client/Home'
import Nosotros from './pages/client/Nosotros'
import Paquetes from './pages/client/Paquetes'
import Productos from './pages/client/Productos'
import InfoProduct from './componentes/ContPageProduc/InfoProduct'
import DescripCompra from './componentes/ContPageProduc/DescripCompra'
import Carrito from './pages/client/Carrito'
import LoginIn from './pages/client/LoginIn'
import SignUpPage from './pages/client/SignUp'
import Layout from "./layouts/Layout";

import AdminRoute from "./componentes/AdminRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ClienteRoute from "./componentes/ClienteRoute.jsx";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx"
import { KitsProvider } from './contexts/KitsContext.jsx';
export const App = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <KitsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={
                <ClienteRoute>
                  <Home />
                </ClienteRoute>
              } />
              <Route path="productos" element={
                <ClienteRoute>
                  <Productos />
                </ClienteRoute>
              } />
              <Route path="productos/:zonaActual" element={
                <ClienteRoute>
                  <Productos />
                </ClienteRoute>
              } />
              <Route path="paquetes" element={
                <ClienteRoute>
                  <Paquetes />
                </ClienteRoute>
              } />
              <Route path="InfoProduct/:Id" element={
                <ClienteRoute>
                  <InfoProduct />
                </ClienteRoute>
              } />
              <Route path="DescripCompra" element={
                <ClienteRoute>
                  <DescripCompra />
                </ClienteRoute>
              } />
              <Route path="carrito" element={
                <ClienteRoute>
                  <Carrito />
                </ClienteRoute>
              } />
              <Route path="nosotros" element={
                <ClienteRoute>
                  <Nosotros />
                </ClienteRoute>
              } />
              <Route path="login" element={<LoginIn />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
            {/* Rutas exclusivas para admin */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
        </KitsProvider>
      </ProductsProvider >
    </AuthProvider>
  )
}

export default App;