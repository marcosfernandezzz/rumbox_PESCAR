import AdminTabs from "../../componentes/adminComp/AdminTabs.jsx"
import ProductsManagement from "../../componentes/adminComp//ProductsManagement.jsx"
import KitsManagement from "../../componentes/adminComp/KitsManagement.jsx"

const AdminDashboard = () => {
  const tabs = [
    {
      label: "Productos",
      content: <ProductsManagement />,
    },
    {
      label: "Kits",
      content: <KitsManagement />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-slate-700 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Rumbox Dashboard</h1>
          <div className="flex gap-4">
            <span className="text-gray-300">Admin</span>
            <button className="bg-orange-500 px-4 py-2 rounded hover:bg-orange-600 transition duration-300">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6">
        <AdminTabs tabs={tabs} />
      </main>
    </div>
  )
}

export default AdminDashboard
