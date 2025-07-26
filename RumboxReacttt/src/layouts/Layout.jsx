import NavBar from "../componentes/NavBar";
import Footer from "../componentes/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet /> {/* Aquí se carga el contenido de cada página */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;