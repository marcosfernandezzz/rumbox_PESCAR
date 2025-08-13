import { useState } from "react"

const AdminTabs = ({ tabs }) => {
  const [active, setActive] = useState(0)
  return (
    <div className="mb-6">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-6 py-2 font-semibold focus:outline-none transition-colors duration-200 ${active === i ? "border-b-2 border-indigo-600 text-indigo-600" : "text-gray-500 hover:text-indigo-400"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[active].content}</div>
    </div>
  )
}

export default AdminTabs
