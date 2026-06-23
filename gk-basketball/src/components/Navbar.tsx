import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/fixtures', label: 'Fixtures' },
  { to: '/results', label: 'Results' },
  { to: '/fanzone', label: 'Fan Zone' },
]

export default function Navbar() {
  const location = useLocation()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const active = document.querySelector('[data-active="true"]') as HTMLElement
    if (active) {
      setIndicatorStyle({
        left: active.offsetLeft,
        width: active.offsetWidth,
      })
    }
  }, [location.pathname])

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-3 sm:h-16">

        {/* logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 group"
        >
          <img
            src={logo}
            alt="GK One Basketball"
            className="h-8 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <div className="text-white font-bold text-base">GK One</div>
            <div className="text-zinc-500 text-xs">
              Howard McCatty League
            </div>
          </div>
        </NavLink>

        {/* nav */}
        <div className="relative flex items-center bg-zinc-900/60 border border-zinc-800 rounded-xl p-1">
          
          {/* sliding indicator */}
          <div
            className="absolute top-1 bottom-1 bg-[#E10600] rounded-lg transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
            }}
          />

          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              data-active={location.pathname === to ? 'true' : 'false'}
              className="relative z-10 px-3 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold transition-colors duration-200 text-zinc-400 hover:text-white"
            >
              {label}
            </NavLink>
          ))}
        </div>

      </div>
    </nav>
  )
}