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
        const response = await fetch("/api/sales", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos de ventas");
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Historial de Ventas</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID de Venta</th>
              <th className="py-2 px-4 border-b">Usuario</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale._id}>
                <td className="py-2 px-4 border-b">{sale._id}</td>
                <td className="py-2 px-4 border-b">
                  {sale.userId?.name || "N/A"}
                </td>
                <td className="py-2 px-4 border-b">
                  ${sale.totalAmount.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b">
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
