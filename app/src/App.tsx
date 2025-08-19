import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-white/70 backdrop-blur">
        <div className="p-4 text-xl font-semibold">CRM</div>
        <nav className="p-2 space-y-1">
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" to="/">Dashboard</Link>
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" to="/leads">Leads</Link>
          <Link className="block px-3 py-2 rounded hover:bg-gray-100" to="/ai">AI Assistant</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
