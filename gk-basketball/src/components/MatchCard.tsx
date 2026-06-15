import type { Match } from '../types/match'
import TeamLogo from './TeamLogo'

export default function MatchCard({
  match,
  logos,
}: {
  match: Match
  logos: Record<string, string>
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-3 flex items-center gap-2 hover:border-zinc-600 transition-all">

      <div className="shrink-0 bg-zinc-800 rounded-md px-2 py-1.5 text-center w-14">
        <p className="text-zinc-400 text-xs">{match.day}</p>
        <p className="text-white text-xs font-bold">{match.date}</p>
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-center gap-1">
        {/* Team A */}
        <div className="flex items-center gap-1.5 flex-1 justify-end min-w-0">
          <span className="text-white font-semibold text-xs text-right break-words min-w-0">{match.teamA}</span>
          <TeamLogo team={match.teamA} logoUrl={logos[match.teamA]} size={22} />
        </div>

        <span className="text-red-600 font-black text-xs bg-zinc-800 px-1.5 py-0.5 rounded shrink-0">VS</span>

        {/* Team B */}
        <div className="flex items-center gap-1.5 flex-1 justify-start min-w-0">
          <TeamLogo team={match.teamB} logoUrl={logos[match.teamB]} size={22} />
          <span className="text-white font-semibold text-xs text-left break-words min-w-0">{match.teamB}</span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-white text-xs font-semibold">{match.time}</p>
        <p className="text-zinc-500 text-xs mt-0.5">{match.venue}</p>
      </div>

    </div>
  )
}
