import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app">
      <aside className={isSidebarOpen ? 'sidebar open' : 'sidebar'}>
        <div className="logo">
          <Link to="/">CRM</Link>
        </div>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/leads">Leads</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </aside>
      <main>
        <header>
          <button className="ghost" onClick={() => setIsSidebarOpen(v => !v)}>
            ☰
          </button>
          <h1>CRM</h1>
          <div className="spacer" />
          <a className="ghost" href="https://app.netlify.com/" target="_blank" rel="noreferrer">Netlify</a>
        </header>
        <section className="content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

