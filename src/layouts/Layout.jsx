import NavBar from "../componentes/UI/NavBar";
import Footer from "../componentes//UI/Footer";
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