import React from 'react'
import { Route , Routes } from 'react-router-dom';
import Home from './pages/client/Home'
import Nosotros from './pages/client/Nosotros'
import Paquetes from './pages/client/Paquetes'
import Productos from './pages/client/Productos'
import Carrito from './pages/client/Carrito'
import LoginIn from './pages/client/LoginIn'
import Layout from "./layouts/Layout";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="productos" element={<Productos />} />
        <Route path="paquetes" element={<Paquetes />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="login" element={<LoginIn />} />
      </Route>
    </Routes>
  )
}

export default App;