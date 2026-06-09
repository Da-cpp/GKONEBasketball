import type { Match } from '../types/match'

export default function ResultCard({ match }: { match: Match }) {
  const scoreA = Number(match.scoreA)
  const scoreB = Number(match.scoreB)
  const aWon = scoreA > scoreB
  const bWon = scoreB > scoreA

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 sm:px-5 py-3 sm:py-4 hover:border-zinc-600 transition-all">
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 text-xs font-bold">#{match.gameId}</span>
          <div className="bg-zinc-800 rounded px-2 py-0.5">
            <span className="text-zinc-400 text-xs">{match.day}, </span>
            <span className="text-white text-xs font-bold">{match.date}</span>
          </div>
        </div>
        <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
          {match.venue}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className={`font-semibold text-sm text-right flex-1 truncate ${aWon ? 'text-white' : 'text-zinc-500'}`}>
          {match.teamA}
        </span>
        <div className="flex items-center gap-1 bg-zinc-800 px-2 sm:px-3 py-1 rounded-md shrink-0">
          <span className={`font-black text-base sm:text-lg ${aWon ? 'text-white' : 'text-zinc-400'}`}>{match.scoreA}</span>
          <span className="text-zinc-600 font-bold mx-1">–</span>
          <span className={`font-black text-base sm:text-lg ${bWon ? 'text-white' : 'text-zinc-400'}`}>{match.scoreB}</span>
        </div>
        <span className={`font-semibold text-sm text-left flex-1 truncate ${bWon ? 'text-white' : 'text-zinc-500'}`}>
          {match.teamB}
        </span>
      </div>

    </div>
  )
}