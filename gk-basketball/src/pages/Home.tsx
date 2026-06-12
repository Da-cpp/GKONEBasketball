import { useEffect, useState } from 'react'
import {
  fetchMatches,
  fetchSeasonScorers,
  fetchSeasonAssisters,
  fetchSeasonRebounders,
  fetchSeasonStealers,
  fetchSeasonBlockers,
} from '../services/sheetsService'
// import type { Match, SeasonScorer, SeasonAssister, SeasonRebounder, SeasonStealer, SeasonBlocker } from '../types/match'
import type { Match, SeasonScorer } from '../types/match'

import FeaturedMatch from '../components/FeaturedMatch'
import MatchCard from '../components/MatchCard'

function StatRow({ rank, name, team, value, label }: {
  rank: number
  name: string
  team: string
  value: number
  label: string
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/50 transition-all">
      <span className={`text-sm font-black w-6 text-center ${
        rank === 0 ? 'text-yellow-400' :
        rank === 1 ? 'text-zinc-300' :
        rank === 2 ? 'text-orange-400' :
        'text-zinc-600'
      }`}>
        {rank + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{name}</p>
        <p className="text-zinc-500 text-xs truncate mt-0.5">{team}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-white font-black text-sm">{value} {label}</p>
      </div>
    </div>
  )
}

function Dropdown({ title, open, onToggle, children }: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="mb-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 hover:border-zinc-700 transition-all"
      >
        <div className="w-1 h-4 bg-red-600 rounded-full shrink-0" />
        <span className="text-white text-sm font-bold uppercase tracking-widest">{title}</span>
        <div className="flex-1 h-px bg-zinc-800" />
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="bg-zinc-900 border border-zinc-800 border-t-0 rounded-b-lg overflow-hidden">
          {children}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([])
  const [scorers, setScorers] = useState<SeasonScorer[]>([])
  // const [assisters, setAssisters] = useState<SeasonAssister[]>([])
  // const [rebounders, setRebounders] = useState<SeasonRebounder[]>([])
  // const [stealers, setStealers] = useState<SeasonStealer[]>([])
  // const [blockers, setBlockers] = useState<SeasonBlocker[]>([])
  const [loading, setLoading] = useState(true)

  const [fixturesOpen, setFixturesOpen] = useState(false)
  const [scorersOpen, setScorersOpen] = useState(false)
  // const [assistsOpen, setAssistsOpen] = useState(false)
  // const [reboundsOpen, setReboundsOpen] = useState(false)
  // const [stealsOpen, setStealsOpen] = useState(false)
  // const [blocksOpen, setBlocksOpen] = useState(false)

  useEffect(() => {
    Promise.all([
      fetchMatches(),
      fetchSeasonScorers(),
      fetchSeasonAssisters(),
      fetchSeasonRebounders(),
      fetchSeasonStealers(),
      fetchSeasonBlockers(),
    // ]).then(([m, sc, as, rb, st, bl]) => {
      ]).then(([m, sc,]) => {
      setMatches(m)
      setScorers(sc)
      // setAssisters(as)
      // setRebounders(rb)
      // setStealers(st)
      // setBlockers(bl)
      setLoading(false)
    })
  }, [])

  const upcoming = matches.filter((m) => m.status === 'Upcoming')
  const nextMatch = upcoming[0]
  const remaining = upcoming.slice(1)

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-500 text-sm">Loading...</p>
            </div>
          </div>
        ) : (
          <>
            {nextMatch && <FeaturedMatch match={nextMatch} />}

            {remaining.length > 0 && (
              <Dropdown title="Upcoming Fixtures" open={fixturesOpen} onToggle={() => setFixturesOpen(o => !o)}>
                <div className="flex flex-col gap-2 p-2">
                  {remaining.map((m) => (
                    <MatchCard key={m.gameId} match={m} />
                  ))}
                </div>
              </Dropdown>
            )}

            {scorers.length > 0 && (
              <Dropdown title="Season Top Scorers" open={scorersOpen} onToggle={() => setScorersOpen(o => !o)}>
                {scorers.map((s, i) => (
                  <StatRow key={s.playerName} rank={i} name={s.playerName} team={s.team} value={s.totalPoints} label="pts" />
                ))}
              </Dropdown>
            )}

            {/* {assisters.length > 0 && (
              <Dropdown title="Season Top Assists" open={assistsOpen} onToggle={() => setAssistsOpen(o => !o)}>
                {assisters.map((s, i) => (
                  <StatRow key={s.playerName} rank={i} name={s.playerName} team={s.team} value={s.totalAssists} label="ast" />
                ))}
              </Dropdown>
            )}

            {rebounders.length > 0 && (
              <Dropdown title="Season Top Rebounds" open={reboundsOpen} onToggle={() => setReboundsOpen(o => !o)}>
                {rebounders.map((s, i) => (
                  <StatRow key={s.playerName} rank={i} name={s.playerName} team={s.team} value={s.totalRebounds} label="reb" />
                ))}
              </Dropdown>
            )}

            {stealers.length > 0 && (
              <Dropdown title="Season Top Steals" open={stealsOpen} onToggle={() => setStealsOpen(o => !o)}>
                {stealers.map((s, i) => (
                  <StatRow key={s.playerName} rank={i} name={s.playerName} team={s.team} value={s.totalSteals} label="stl" />
                ))}
              </Dropdown>
            )}

            {blockers.length > 0 && (
              <Dropdown title="Season Top Blocks" open={blocksOpen} onToggle={() => setBlocksOpen(o => !o)}>
                {blockers.map((s, i) => (
                  <StatRow key={s.playerName} rank={i} name={s.playerName} team={s.team} value={s.totalBlocks} label="blk" />
                ))}
              </Dropdown>
            )} */}
          </>
        )}
      </div>
    </div>
  )
}