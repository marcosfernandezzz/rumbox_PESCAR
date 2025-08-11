import React from "react";
import AdminNavbar from "../../componentes/adminComp/AdminNavbar.jsx";
import CrudProductos from "../../componentes/adminComp/CrudProductos.jsx";
import CrudKits from "../../componentes/adminComp/CrudKits.jsx";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="p-4 mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Panel de Administración</h1>
        <hr />
        <CrudProductos />
        <hr />
        <CrudKits />
      </div>
    </div>
  );
};

export default AdminDashboard;
