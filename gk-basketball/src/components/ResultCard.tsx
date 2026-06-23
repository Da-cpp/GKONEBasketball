import { useState, useEffect, useRef } from 'react'
import type { Match, GameScorer, PlayerScore } from '../types/match'
import TeamLogo from './TeamLogo'

interface Props {
  match: Match
  scorer?: GameScorer
  playerScores: PlayerScore[]
  logos: Record<string, string>
}

/*animates a number from 0 to `target` over `duration`ms once `run` is true */
function useCountUp(target: number, duration = 600, run = false) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!run) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      //ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [run, target, duration])

  return run ? value : target
}

function AnimatedScore({ score, won, delay = 0 }: { score: number; won: boolean; delay?: number }) {
  const [run, setRun] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setRun(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  const display = useCountUp(score, 700, run)
  return (
    <span className={`font-black text-lg sm:text-xl tabular-nums transition-colors duration-300 ${won ? 'text-white' : 'text-zinc-500'}`}>
      {display}
    </span>
  )
}

export default function ResultCard({ match, playerScores, logos }: Props) {
  const scoreA = Number(match.scoreA)
  const scoreB = Number(match.scoreB)
  const aWon = scoreA > scoreB
  const bWon = scoreB > scoreA
  const diff = Math.abs(scoreA - scoreB)

  const topA = playerScores.find(p => p.topPerformer && p.team === match.teamA)
  const topB = playerScores.find(p => p.topPerformer && p.team === match.teamB)
  const hasPerformers = !!(topA || topB)

  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  //determine accent color based on game closeness
  const isClose = diff <= 5

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300 cursor-default"
      style={{
        background: hovered
          ? 'linear-gradient(135deg, #18181b, #1c1c1f)'
          : '#18181b',
        border: hovered
          ? '1px solid rgba(220,38,38,0.4)'
          : '1px solid rgba(63,63,70,0.8)',
        boxShadow: hovered
          ? '0 8px 32px rgba(220,38,38,0.12), 0 2px 8px rgba(0,0,0,0.4)'
          : '0 1px 4px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/*winner side glow */}
      {aWon && (
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent, #facc15, transparent)',
            opacity: hovered ? 1 : 0.5,
          }}
        />
      )}
      {bWon && (
        <div
          className="absolute right-0 top-0 bottom-0 w-0.5 transition-opacity duration-300"
          style={{
            background: 'linear-gradient(to bottom, transparent, #facc15, transparent)',
            opacity: hovered ? 1 : 0.5,
          }}
        />
      )}

      <div className="px-3 sm:px-5 py-3 sm:py-4">
        {/* meta row */}
        <div className="flex flex-col gap-1.5 mb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          {/* line 1 - game id & date */}
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-2">
              <span className="text-zinc-700 text-xs font-mono">#{match.gameId}</span>
              <div className="bg-zinc-800 border border-zinc-700/50 rounded-md px-2 py-0.5">
                <span className="text-zinc-500 text-xs">{match.day}, </span>
                <span className="text-zinc-200 text-xs font-semibold">{match.date}</span>
              </div>
            </div>
            {/*venue sits on line 1 on mobile (right), hidden on sm+ where it moves to line 1 right */}
            <span className="text-xs text-zinc-500 bg-zinc-800/60 border border-zinc-700/40 px-2 py-0.5 rounded-full sm:hidden">
              {match.venue}
            </span>
          </div>

          {/* line 2 on mobile: CLOSE GAME badge (centered) & venue on desktop */}
          <div className={`flex items-center gap-2 ${isClose ? 'justify-center sm:justify-end' : 'justify-end'}`}>
            {isClose && (
              <span className="text-xs bg-red-600/15 text-red-400 border border-red-600/20 px-2 py-0.5 rounded-full font-semibold animate-pulse">
                CLOSE GAME
              </span>
            )}
            <span className="hidden sm:inline text-xs text-zinc-500 bg-zinc-800/60 border border-zinc-700/40 px-2 py-0.5 rounded-full">
              {match.venue}
            </span>
          </div>
        </div>

        {/* score row */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/*team a */}
          <div className="flex items-center gap-2 flex-1 justify-end min-w-0">
            <span
              className={`font-bold text-sm sm:text-base text-right leading-tight min-w-0 transition-colors duration-300 ${
                aWon ? 'text-white' : 'text-zinc-500'
              }`}
              style={{
                textShadow: aWon && hovered ? '0 0 20px rgba(250,204,21,0.3)' : 'none',
              }}
            >
              {match.teamA}
            </span>
            <div
              className="transition-transform duration-300"
              style={{ transform: aWon && hovered ? 'scale(1.1)' : 'scale(1)' }}
            >
              <TeamLogo team={match.teamA} logoUrl={logos[match.teamA]} size={28} />
            </div>
          </div>

          {/*scoreboard */}
          <div
            className="flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg shrink-0 transition-all duration-300"
            style={{
              background: hovered ? '#27272a' : '#1f1f23',
              border: '1px solid rgba(63,63,70,0.6)',
            }}
          >
            <AnimatedScore score={scoreA} won={aWon} delay={200} />
            <span className="text-zinc-700 font-black mx-1.5 text-sm">–</span>
            <AnimatedScore score={scoreB} won={bWon} delay={350} />
          </div>

          {/*team b*/}
          <div className="flex items-center gap-2 flex-1 justify-start min-w-0">
            <div
              className="transition-transform duration-300"
              style={{ transform: bWon && hovered ? 'scale(1.1)' : 'scale(1)' }}
            >
              <TeamLogo team={match.teamB} logoUrl={logos[match.teamB]} size={28} />
            </div>
            <span
              className={`font-bold text-sm sm:text-base text-left leading-tight min-w-0 transition-colors duration-300 ${
                bWon ? 'text-white' : 'text-zinc-500'
              }`}
              style={{
                textShadow: bWon && hovered ? '0 0 20px rgba(250,204,21,0.3)' : 'none',
              }}
            >
              {match.teamB}
            </span>
          </div>
        </div>

        {/*top performers toggle */}
        {hasPerformers && (
          <>
            <button
              onClick={() => setExpanded(v => !v)}
              className="w-full mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between group"
            >
              <span className="text-xs text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">
                Top Performers
              </span>
              <span
                className="text-zinc-600 group-hover:text-zinc-400 transition-all duration-300 text-xs"
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block' }}
              >
                ▼
              </span>
            </button>

            {/*collapsible performers section */}
            <div
              className="overflow-hidden transition-all duration-400 ease-in-out"
              style={{
                maxHeight: expanded ? '400px' : '0px',
                opacity: expanded ? 1 : 0,
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div className="flex gap-3 flex-wrap sm:flex-nowrap mt-3">
                {topA && (
                  <PerformerCard player={topA} won={aWon} align="left" />
                )}
                {topB && (
                  <PerformerCard player={topB} won={bWon} align="right" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function PerformerCard({
  player,
  won,
  align,
}: {
  player: PlayerScore
  won: boolean
  align: 'left' | 'right'
}) {
  const stats = [
    { label: 'PTS', value: player.points },
    { label: 'REB', value: player.rebounds },
    { label: 'AST', value: player.assists },
    { label: 'STL', value: player.steals },
    { label: 'BLK', value: player.blocks },
  ]

  return (
    <div
      className="flex-1 min-w-0 rounded-xl p-3 border transition-all duration-300"
      style={{
        background: won ? 'rgba(250,204,21,0.04)' : 'rgba(39,39,42,0.5)',
        borderColor: won ? 'rgba(234,179,8,0.25)' : 'rgba(63,63,70,0.6)',
      }}
    >
      <div className={`flex items-center gap-1.5 mb-2.5 ${align === 'right' ? 'sm:justify-end' : ''}`}>
        <span className="text-base">{won ? '🥇' : '🥈'}</span>
        <span
          className={`text-xs font-black uppercase tracking-wide truncate ${
            won ? 'text-yellow-400' : 'text-zinc-400'
          }`}
        >
          {player.playerName}
        </span>
      </div>

      {/*stat bars */}
      <div className="flex flex-col gap-1.5">
        {stats.map(({ label, value }, i) => {
          const num = Number(value) || 0
          //rough max for bar width context (pts ~40, others ~15)
          const max = label === 'PTS' ? 40 : 15
          const pct = Math.min((num / max) * 100, 100)

          return (
            <div key={label}>
              <div
                className={`flex items-center justify-between mb-0.5 ${
                  align === 'right' ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <span className="text-zinc-600 text-xs font-mono">{label}</span>
                <span
                  className={`text-xs font-bold tabular-nums ${
                    won ? 'text-yellow-300' : 'text-zinc-300'
                  }`}
                >
                  {value}
                </span>
              </div>
              <div className="h-0.5 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${pct}%`,
                    background: won
                      ? 'linear-gradient(90deg, #ca8a04, #facc15)'
                      : 'linear-gradient(90deg, #52525b, #71717a)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}