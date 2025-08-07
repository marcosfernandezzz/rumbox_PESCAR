import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/client/Home'
import Nosotros from './pages/client/Nosotros'
import Paquetes from './pages/client/Paquetes'
import Productos from './pages/client/Productos'
import InfoProduct from './componentes/ContPageProduc/InfoProduct'
import Carrito from './pages/client/Carrito'
import LoginIn from './pages/client/LoginIn'
import SignUpPage from './pages/client/SignUp'
import Layout from "./layouts/Layout";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import { ProductsProvider } from "./contexts/ProductsContext.jsx"
import { KitsProvider } from './contexts/KitsContext.jsx';
export const App = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <UserProvider>
        <KitsProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="productos" element={<Productos />} />
              <Route path="productos/:zonaActual" element={<Productos />} />
              <Route path="paquetes" element={<Paquetes />} />
              <Route path="InfoProduct/:Id" element={<InfoProduct />} />
              <Route path="carrito" element={<Carrito />} />
              <Route path="nosotros" element={<Nosotros />} />
              <Route path="login" element={<LoginIn />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </Routes>
        </KitsProvider>
        </UserProvider>
      </ProductsProvider >
    </AuthProvider>
  )
}

export default App;