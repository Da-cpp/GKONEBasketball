import { useEffect, useState } from 'react'
import { fetchMatches, fetchSeasonScorers } from '../services/sheetsService'
import type { Match, SeasonScorer } from '../types/match'
import FeaturedMatch from '../components/FeaturedMatch'
import MatchCard from '../components/MatchCard'

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([])
  const [scorers, setScorers] = useState<SeasonScorer[]>([])
  const [loading, setLoading] = useState(true)
  const [fixturesOpen, setFixturesOpen] = useState(false)
  const [scorersOpen, setScorersOpen] = useState(false)

  useEffect(() => {
    Promise.all([fetchMatches(), fetchSeasonScorers()]).then(([m, s]) => {
      setMatches(m)
      setScorers(s)
      setLoading(false)
    })
  }, [])

  const upcoming = matches.filter((m) => m.status === 'Upcoming')
  const nextMatch = upcoming[0]
  const remaining = upcoming.slice(1)

  return (
    <div className="min-h-screen bg-zinc-950">

      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-red-600/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-0.5">
              GKOne · McCatty Community League 2026
            </p>
            <h1 className="text-white font-black text-2xl tracking-tight">Season Hub</h1>
          </div>

          <div className="flex gap-3">
            {[
              { label: 'Total Games', value: matches.length },
              { label: 'Upcoming', value: upcoming.length },
              { label: 'Completed', value: matches.filter(m => m.status === 'Completed').length },
            ].map(({ label, value }) => (
              <div key={label} className="bg-zinc-800/60 border border-zinc-700/60 rounded-lg px-4 py-2 text-center min-w-[80px]">
                <p className="text-white font-black text-xl">{loading ? '—' : value}</p>
                <p className="text-zinc-500 text-xs uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-500 text-sm">Loading fixtures...</p>
            </div>
          </div>
        ) : (
          <>
            {nextMatch && <FeaturedMatch match={nextMatch} />}

            {scorers.length > 0 && (
              <div className="mt-4 mb-4">
                <button
                  onClick={() => setScorersOpen((o) => !o)}
                  className="w-full flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 hover:border-zinc-700 transition-all"
                >
                  <div className="w-1 h-4 bg-red-600 rounded-full" />
                  <span className="text-white text-sm font-bold uppercase tracking-widest">
                    Season Top Scorers
                  </span>
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-zinc-600 text-xs">{scorers.length} players</span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${scorersOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {scorersOpen && (
                  <div className="bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-lg overflow-hidden">
                    {scorers.map((s, i) => (
                      <div
                        key={s.playerName}
                        className="flex items-center gap-4 px-5 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-all"
                      >
                        <span className={`text-sm font-black w-6 text-center ${
                          i === 0 ? 'text-yellow-400' :
                          i === 1 ? 'text-zinc-300' :
                          i === 2 ? 'text-orange-400' :
                          'text-zinc-600'
                        }`}>
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">{s.playerName}</p>
                          <p className="text-zinc-500 text-xs truncate mt-0.5">{s.team}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-white font-black text-sm">{s.totalPoints} pts</p>
                          <p className="text-zinc-600 text-xs mt-0.5">{s.gamesPlayed} games</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {remaining.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => setFixturesOpen((o) => !o)}
                  className="w-full flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 hover:border-zinc-700 transition-all"
                >
                  <div className="w-1 h-4 bg-red-600 rounded-full" />
                  <span className="text-white text-sm font-bold uppercase tracking-widest">
                    Upcoming Fixtures
                  </span>
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-zinc-600 text-xs">{remaining.length} games</span>
                  <svg
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${fixturesOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {fixturesOpen && (
                  <div className="flex flex-col gap-2 mt-2">
                    {remaining.map((m) => (
                      <MatchCard key={m.gameId} match={m} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}