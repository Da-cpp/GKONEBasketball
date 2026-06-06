import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">

        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 shrink-0 bg-red-600 rounded-lg flex items-center justify-center font-black text-white text-xs">
            GK
          </div>
          <div className="hidden sm:block min-w-0">
            <div className="text-white font-bold text-sm leading-tight truncate">GKOne Basketball</div>
            <div className="text-zinc-500 text-xs leading-tight truncate">McCatty Community League 2026</div>
          </div>
        </div>

        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1 gap-0.5">
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
                `px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
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