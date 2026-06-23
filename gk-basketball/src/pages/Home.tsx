import { useEffect, useState, useRef } from 'react'
import {
  fetchMatches,
  fetchSeasonScorers,
  fetchSeasonAssisters,
  fetchSeasonRebounders,
  fetchSeasonStealers,
  fetchSeasonBlockers,
  fetchTeamLogos,
  fetchPlayerScores,
} from '../services/sheetsService'
import type { Match, SeasonScorer, SeasonAssister, SeasonRebounder, SeasonStealer, SeasonBlocker, PlayerScore } from '../types/match'
import FeaturedMatch from '../components/FeaturedMatch'

function useFadeIn(delay: number = 0) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return {
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }
  }
}

function useCountUp(target: number, duration: number = 800, start: boolean = true) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const steps = 40
    const stepTime = duration / steps
    const increment = target / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = step >= steps ? target : Math.round(increment * step)
      setValue(current)
      if (step >= steps) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [target, duration, start])
  return value
}

function AnimatedScore({ target, won }: { target: number; won: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const displayed = useCountUp(target, 800, inView)

  return (
    <span
      ref={ref}
      className={`text-2xl sm:text-3xl font-black tabular-nums transition-colors duration-300 ${won ? 'text-white' : 'text-zinc-500'}`}
      style={{ textShadow: won ? '0 0 20px rgba(250,204,21,0.25)' : 'none' }}
    >
      {displayed}
    </span>
  )
}

function LatestResult({ match, playerScores }: { match: Match; playerScores: PlayerScore[] }) {
  const a = Number(match.scoreA)
  const b = Number(match.scoreB)
  const aWon = a > b
  const bWon = b > a
  const isClose = Math.abs(a - b) <= 5

  const gamePlayers = playerScores
    .filter(p => p.gameId === match.gameId)
    .filter(p => p.playerName.toLowerCase() !== 'excluded')

  const topScorer = [...gamePlayers].sort((x, y) => y.points - x.points)[0]

  return (
    <div
      className="rounded-xl mb-10 overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
      style={{ background: '#18181b' }}
    >
      {/* winner accent bar */}
      <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(250,204,21,0.4), transparent)' }} />

      <div className="px-4 sm:px-5 py-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-red-600" />
            Latest Result
          </p>
          <div className="flex items-center gap-2">
            {isClose && (
              <span className="text-xs bg-red-600/15 text-red-400 border border-red-600/20 px-2 py-0.5 rounded-full font-semibold">
                CLOSE GAME
              </span>
            )}
            <span className="text-zinc-600 text-xs">{match.date}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className={`font-black text-base sm:text-xl leading-tight break-words ${aWon ? 'text-white' : 'text-zinc-500'}`}>
              {match.teamA}
            </p>
          </div>

          <div
            className="shrink-0 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-lg tabular-nums"
            style={{ background: '#27272a', border: '1px solid rgba(63,63,70,0.6)' }}
          >
            <AnimatedScore target={a} won={aWon} />
            <span className="text-zinc-700 font-black">–</span>
            <AnimatedScore target={b} won={bWon} />
          </div>

          <div className="flex-1 min-w-0 text-right">
            <p className={`font-black text-base sm:text-xl leading-tight break-words ${bWon ? 'text-white' : 'text-zinc-500'}`}>
              {match.teamB}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
          <p className="text-zinc-600 text-xs">{match.venue}</p>
          {topScorer && (
            <p className="text-zinc-500 text-xs">
              🏀 <span className="text-zinc-300 font-semibold">{topScorer.playerName}</span>
              <span className="text-yellow-400 font-bold"> · {topScorer.points} pts</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function StatRow({ rank, name, team, value, label }: {
  rank: number
  name: string
  team: string
  value: number
  label: string
}) {
  const rankColor =
    rank === 0 ? 'text-yellow-400' :
    rank === 1 ? 'text-zinc-300' :
    rank === 2 ? 'text-orange-400' :
    'text-zinc-600'

  return (
    <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-zinc-800 last:border-0 hover:bg-zinc-800/40 transition-colors">
      <span className={`text-xs font-black w-5 text-center shrink-0 ${rankColor}`}>
        {rank + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{name}</p>
        <p className="text-zinc-500 text-xs truncate mt-0.5">{team}</p>
      </div>
      <div className="shrink-0 text-right">
        <span className="text-white font-black text-sm">{value}</span>
        <span className="text-zinc-500 text-xs ml-1">{label}</span>
      </div>
    </div>
  )
}

function SeasonLeaders({ scorers, assisters, rebounders, stealers, blockers }: {
  scorers: SeasonScorer[]
  assisters: SeasonAssister[]
  rebounders: SeasonRebounder[]
  stealers: SeasonStealer[]
  blockers: SeasonBlocker[]
}) {
  const [open, setOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'pts' | 'ast' | 'reb' | 'stl' | 'blk'>('pts')

  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: 'pts', label: 'PTS' },
    { key: 'ast', label: 'AST' },
    { key: 'reb', label: 'REB' },
    { key: 'stl', label: 'STL' },
    { key: 'blk', label: 'BLK' },
  ]

  const rows = {
    pts: [...scorers].sort((a, b) => b.totalPoints - a.totalPoints).map(s => ({ name: s.playerName, team: s.team, value: s.totalPoints, label: 'pts' })),
    ast: [...assisters].sort((a, b) => b.totalAssists - a.totalAssists).map(s => ({ name: s.playerName, team: s.team, value: s.totalAssists, label: 'ast' })),
    reb: [...rebounders].sort((a, b) => b.totalRebounds - a.totalRebounds).map(s => ({ name: s.playerName, team: s.team, value: s.totalRebounds, label: 'reb' })),
    stl: [...stealers].sort((a, b) => b.totalSteals - a.totalSteals).map(s => ({ name: s.playerName, team: s.team, value: s.totalSteals, label: 'stl' })),
    blk: [...blockers].sort((a, b) => b.totalBlocks - a.totalBlocks).map(s => ({ name: s.playerName, team: s.team, value: s.totalBlocks, label: 'blk' })),
  }

  return (
    <div className="mb-3">
      {/* section header toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-300 mb-0"
        style={{
          background: '#18181b',
          border: open ? '1px solid rgba(63,63,70,0.8)' : '1px solid rgba(63,63,70,0.8)',
          borderRadius: open ? '12px 12px 0 0' : '12px',
        }}
      >
        <div className="w-1 h-4 bg-red-600 rounded-full shrink-0" />
        <span className="text-white text-sm font-bold uppercase tracking-widest">Season Leaders</span>
        <div className="flex-1 h-px bg-zinc-800" />
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="overflow-hidden"
          style={{ background: '#18181b', border: '1px solid rgba(63,63,70,0.8)', borderTop: 'none', borderRadius: '0 0 12px 12px' }}
        >
          {/* tabs */}
          <div className="flex border-b border-zinc-800">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                  activeTab === t.key
                    ? 'text-white border-b-2 border-red-600 bg-zinc-800/30'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {rows[activeTab].slice(0, 10).map((r, i) => (
            <StatRow key={`${activeTab}-${r.name}`} rank={i} name={r.name} team={r.team} value={r.value} label={r.label} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([])
  const [scorers, setScorers] = useState<SeasonScorer[]>([])
  const [assisters, setAssisters] = useState<SeasonAssister[]>([])
  const [rebounders, setRebounders] = useState<SeasonRebounder[]>([])
  const [stealers, setStealers] = useState<SeasonStealer[]>([])
  const [blockers, setBlockers] = useState<SeasonBlocker[]>([])
  const [logos, setLogos] = useState<Record<string, string>>({})
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchMatches(),
      fetchSeasonScorers(),
      fetchSeasonAssisters(),
      fetchSeasonRebounders(),
      fetchSeasonStealers(),
      fetchSeasonBlockers(),
      fetchTeamLogos(),
      fetchPlayerScores(),
    ]).then(([m, sc, as, rb, st, bl, lg, ps]) => {
      setMatches(m)
      setScorers(sc)
      setAssisters(as)
      setRebounders(rb)
      setStealers(st)
      setBlockers(bl)
      setLogos(lg)
      setPlayerScores(ps)
      setLoading(false)
    })
  }, [])

  const completed = matches.filter((m) => m.status === 'Completed')
  const lastMatch = completed[completed.length - 1] ?? null
  const upcoming = matches.filter((m) => m.status === 'Upcoming')
  const nextMatch = upcoming[0] ?? null

  const fade0 = useFadeIn(0)
  const fade1 = useFadeIn(150)
  const fade2 = useFadeIn(300)

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-red-600/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-zinc-600 text-xs uppercase tracking-widest">Loading</p>
          </div>
        ) : (
          <>
            <div {...fade0}>
              {nextMatch && <FeaturedMatch match={nextMatch} logos={logos} />}
            </div>

            <div {...fade1}>
              {lastMatch && <LatestResult match={lastMatch} playerScores={playerScores} />}
            </div>

            <div {...fade2}>
              <SeasonLeaders
                scorers={scorers}
                assisters={assisters}
                rebounders={rebounders}
                stealers={stealers}
                blockers={blockers}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}