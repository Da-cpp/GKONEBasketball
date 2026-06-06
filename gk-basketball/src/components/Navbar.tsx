import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  return (
    <nav className="bg-[#0B0B0B] border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="GK One Basketball"
            className="h-12 w-auto object-contain"
          />

          <div>
            <div className="text-white font-bold text-base">
              GK One Basketball
            </div>

            <div className="text-zinc-500 text-xs">
              Howard McCatty Community Basketball League
            </div>
          </div>
        </div>

        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
          {[
            { to: '/', label: 'Home' },
            { to: '/fixtures', label: 'Fixtures' },
            { to: '/results', label: 'Results' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-5 py-2 rounded-md text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#E10600] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

      
      </div>
    </nav>
  )
}