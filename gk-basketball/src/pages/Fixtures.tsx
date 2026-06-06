import { useEffect, useState } from 'react'
import { fetchMatches } from '../services/sheetsService'
import type { Match } from '../types/match'
import MatchCard from '../components/MatchCard'

export default function Fixtures() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches().then((data) => {
      setMatches(data)
      setLoading(false)
    })
  }, [])

  const upcoming = matches.filter((m) => m.status === 'Upcoming')

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-b border-zinc-800 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-red-600/20 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 py-8">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">Schedule</p>
          <h1 className="text-white font-black text-3xl">Fixtures</h1>
          {!loading && (
            <p className="text-zinc-400 text-sm mt-1">{upcoming.length} upcoming games</p>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : upcoming.length === 0 ? (
          <p className="text-zinc-500 text-center py-20">No upcoming fixtures.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {upcoming.map((m) => (
              <MatchCard key={m.gameId} match={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}