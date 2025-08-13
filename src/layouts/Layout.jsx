import NavBar from "../componentes/UI/NavBar";
import Footer from "../componentes//UI/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Main layout container */}
      <NavBar />
      <main className="flex-grow"> {/* Content wrapper */}
        <Outlet /> {/* Aquí se carga el contenido de cada página */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
