import { useState } from 'react'
import type { Match } from '../types/match'
import TeamLogo from './TeamLogo'

export default function MatchCard({
  match,
  logos,
}: {
  match: Match
  logos: Record<string, string>
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative rounded-xl overflow-hidden transition-all duration-300"
      style={{
        background: hovered ? 'linear-gradient(135deg, #18181b, #1c1c1f)' : '#18181b',
        border: hovered ? '1px solid rgba(220,38,38,0.4)' : '1px solid rgba(63,63,70,0.8)',
        boxShadow: hovered
          ? '0 8px 32px rgba(220,38,38,0.12), 0 2px 8px rgba(0,0,0,0.4)'
          : '0 1px 4px rgba(0,0,0,0.3)',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.6), transparent)',
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="px-3 sm:px-5 py-3 sm:py-4">
        {/* meta row - date left, time & venue right */}
        <div className="flex items-center justify-between mb-3">
          <div className="bg-zinc-800 border border-zinc-700/50 rounded-md px-2 py-0.5">
            <span className="text-zinc-500 text-xs">{match.day}, </span>
            <span className="text-zinc-200 text-xs font-semibold">{match.date}</span>
          </div>
          <div className="text-right">
            <p className="text-white text-xs font-bold">{match.time}</p>
            <p className="text-zinc-500 text-xs mt-0.5 truncate max-w-[140px]">{match.venue}</p>
          </div>
        </div>

        {/*teams row */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* team a */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className="transition-transform duration-300"
              style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            >
              <TeamLogo team={match.teamA} logoUrl={logos[match.teamA]} size={30} />
            </div>
            <span className="text-white font-semibold text-sm leading-tight">{match.teamA}</span>
          </div>

          {/* VS badge */}
          <div
            className="shrink-0 px-2.5 py-1 rounded-lg transition-all duration-300"
            style={{
              background: hovered ? 'rgba(220,38,38,0.15)' : '#27272a',
              border: hovered ? '1px solid rgba(220,38,38,0.3)' : '1px solid rgba(63,63,70,0.6)',
            }}
          >
            <span
              className="font-black text-xs transition-colors duration-300"
              style={{ color: hovered ? '#ef4444' : '#71717a' }}
            >
              VS
            </span>
          </div>

          {/* team b */}
          <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
            <span className="text-white font-semibold text-sm leading-tight text-right">{match.teamB}</span>
            <div
              className="transition-transform duration-300"
              style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
            >
              <TeamLogo team={match.teamB} logoUrl={logos[match.teamB]} size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}