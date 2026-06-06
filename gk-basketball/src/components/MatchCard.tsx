import type { Match } from '../types/match'

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-4 flex items-center gap-4 hover:border-zinc-600 hover:bg-zinc-800/60 transition-all">
      {/* Game number */}
      <div className="w-10 shrink-0 text-center">
        <span className="text-zinc-600 text-xs font-bold">#{match.gameId}</span>
      </div>

      {/* Date badge */}
      <div className="shrink-0 bg-zinc-800 rounded-md px-3 py-2 text-center min-w-[64px]">
        <p className="text-zinc-400 text-xs">{match.day}</p>
        <p className="text-white text-sm font-bold">{match.date}</p>
      </div>

      {/* Teams */}
      <div className="flex-1 flex items-center justify-center gap-3">
        <span className="text-white font-semibold text-sm text-right flex-1">{match.teamA}</span>
        <span className="text-red-600 font-black text-xs bg-zinc-800 px-2 py-0.5 rounded">VS</span>
        <span className="text-white font-semibold text-sm text-left flex-1">{match.teamB}</span>
      </div>

      {/* Right info */}
      <div className="shrink-0 text-right">
        <p className="text-white text-sm font-semibold">{match.time}</p>
        <span className="inline-block mt-1 text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
          {match.venue}
        </span>
      </div>
    </div>
  )
}