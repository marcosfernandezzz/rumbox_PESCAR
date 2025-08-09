import React from "react";
import AdminNavbar from "../../componentes/adminComp/AdminNavbar.jsx";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="p-4">
        <h1>Panel de Administración</h1>
        <p>Bienvenido, Admin. Aquí puedes gestionar el sistema.</p>
        {/* Agrega aquí los componentes y funcionalidades exclusivas del admin */}
      </div>
    </div>
  );
};

export default AdminDashboard;
