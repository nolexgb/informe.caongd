import { NavLink } from 'react-router-dom'

const links = [
  ['/', 'Resumen'],
  ['/andalucia', 'Andalucía'],
  ['/otros-paises', 'Otros países'],
  ['/base-social', 'Base social'],
  ['/ongd', 'ONGD'],
  ['/comparador', 'Comparador']
]

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <img src="/assets/logo-caongd.svg" alt="CAONGD" className="topbar__logo" />
        <div>
          <div className="eyebrow">CAONGD Data Explorer V3</div>
          <div className="brand-title">Plataforma interactiva del informe</div>
        </div>
      </div>
      <nav className="topnav">
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} className={({ isActive }) => `topnav__link ${isActive ? 'is-active' : ''}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
