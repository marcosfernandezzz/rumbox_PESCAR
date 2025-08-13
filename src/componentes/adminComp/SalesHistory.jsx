import React, { useEffect, useState } from "react";

const SalesHistory = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const token = localStorage.getItem("authToken");
        console.log("TOKEN ENVIADO:", token);
        if (!token) {
          setError("No estás autenticado. Por favor, inicia sesión.");
          setLoading(false);
          return;
        }
        const response = await fetch("/api/sales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          // Handle specific HTTP errors, like 401 Unauthorized
          if (response.status === 401) {
            setError("No tienes permisos para ver el historial de ventas. Por favor, verifica tu sesión.");
            // Optionally, redirect to login if token is invalid/expired
            // For example, if using react-router-dom:
            // navigate('/login');
          } else {
            throw new Error(`Error al obtener los datos de ventas: ${response.statusText}`);
          }
          setLoading(false);
          return;
        }
        const data = await response.json();
        setSales(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return <div>Cargando historial de ventas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 w-full"> {/* Reverted p-4 */}
      <h2 className="text-2xl font-bold mb-8">Historial de Ventas</h2> {/* Increased margin-bottom */}
      <div className="">
        <table className="w-full bg-white">
          <thead>
            <tr>
              <th className="py-4 px-6 border-b">ID de Venta</th>
              <th className="py-4 px-6 border-b">Usuario</th>
              <th className="py-4 px-6 border-b">Total</th>
              <th className="py-4 px-6 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id} className="hover:bg-gray-100">
                <td className="py-4 px-6 border-b">{sale._id}</td>
                <td className="py-4 px-6 border-b">
                  {sale.userId?.name || "N/A"}
                </td>
                <td className="py-4 px-6 border-b">
                  {Math.round(sale.totalAmount).toLocaleString('es-AR', { style: 'decimal' })}
                </td>
                <td className="py-4 px-6 border-b">
                  {new Date(sale.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesHistory;
