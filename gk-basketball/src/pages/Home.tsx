import { useEffect, useState } from 'react'
import { fetchMatches } from '../services/sheetsService'
import type { Match } from '../types/match'
import FeaturedMatch from '../components/FeaturedMatch'
import MatchCard from '../components/MatchCard'

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches().then((data) => {
      setMatches(data)
      setLoading(false)
    })
  }, [])

  const upcoming = matches.filter((m) => m.status === 'Upcoming')
  const nextMatch = upcoming[0]
  const remaining = upcoming.slice(1)

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Banner */}
      {/* <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-b border-zinc-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-red-600/20 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-red-500 text-xs font-semibold uppercase tracking-widest mb-0.5">
              GK One · Howard McCatty Community Basketball League 
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
      </div> */}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
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

            {remaining.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-4 bg-red-600 rounded-full" />
                  <span className="text-white text-sm font-bold uppercase tracking-widest">
                    Upcoming Fixtures
                  </span>
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="text-zinc-600 text-xs">{remaining.length} games</span>
                </div>
                <div className="flex flex-col gap-2">
                  {remaining.map((m) => (
                    <MatchCard key={m.gameId} match={m} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}