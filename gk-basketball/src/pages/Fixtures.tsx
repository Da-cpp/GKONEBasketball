import { useEffect, useState, useRef } from 'react'
import { fetchMatches, fetchTeamLogos } from '../services/sheetsService'
import type { Match } from '../types/match'
import MatchCard from '../components/MatchCard'

export default function Fixtures() {
  const [matches, setMatches] = useState<Match[]>([])
  const [logos, setLogos] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    Promise.all([fetchMatches(), fetchTeamLogos()]).then(([data, lg]) => {
      setMatches(data)
      setLogos(lg)
      setLoading(false)
      requestAnimationFrame(() => setTimeout(() => setVisible(true), 50))
    })
  }, [])

  const prevSearch = useRef(search)
  useEffect(() => {
    if (prevSearch.current !== search) {
      setVisible(false)
      const t = setTimeout(() => setVisible(true), 30)
      prevSearch.current = search
      return () => clearTimeout(t)
    }
  }, [search])

  const upcoming = matches.filter((m) => m.status === 'Upcoming')

  const filtered = search.trim() === ''
    ? upcoming
    : upcoming.filter((m) =>
        m.teamA.toLowerCase().includes(search.toLowerCase()) ||
        m.teamB.toLowerCase().includes(search.toLowerCase())
      )

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-b border-zinc-800 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-red-600/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 py-10">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-red-600" />
            Schedule
          </p>
          <h1 className="text-white font-black text-4xl tracking-tight">Fixtures</h1>
          {!loading && (
            <p className="text-zinc-500 text-sm mt-1.5">
              <span className="text-red-500 font-bold">{upcoming.length}</span> upcoming games
            </p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Search bar */}
        <div className="relative mb-6">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by team name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 focus:border-red-600 rounded-xl pl-9 pr-4 py-3 text-white text-sm placeholder-zinc-600 outline-none transition-all duration-200 focus:bg-zinc-800/50 focus:shadow-[0_0_0_1px_rgba(220,38,38,0.3)]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors w-5 h-5 flex items-center justify-center rounded-full hover:bg-zinc-700"
            >
              ✕
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-red-600/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest">Loading fixtures</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-4xl mb-4">📅</div>
            <p className="text-zinc-300 font-bold text-lg">
              {search ? `No fixtures for "${search}"` : 'No upcoming fixtures'}
            </p>
            <p className="text-zinc-600 text-sm mt-1">
              {search ? 'Try a different team name' : 'Check back soon'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((m, i) => (
              <div
                key={m.gameId}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(16px)',
                  transitionDelay: `${Math.min(i * 60, 600)}ms`,
                }}
              >
                <MatchCard match={m} logos={logos} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}