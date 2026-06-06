import type { Match } from '../types/match'

export default function ResultCard({ match }: { match: Match }) {
  const scoreA = Number(match.scoreA)
  const scoreB = Number(match.scoreB)
  const aWon = scoreA > scoreB
  const bWon = scoreB > scoreA

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-5 py-4 flex items-center gap-4 hover:border-zinc-600 transition-all">
      <div className="w-10 shrink-0 text-center">
        <span className="text-zinc-600 text-xs font-bold">#{match.gameId}</span>
      </div>

      <div className="shrink-0 bg-zinc-800 rounded-md px-3 py-2 text-center min-w-[64px]">
        <p className="text-zinc-400 text-xs">{match.day}</p>
        <p className="text-white text-sm font-bold">{match.date}</p>
      </div>

      <div className="flex-1 flex items-center justify-center gap-3">
        <span className={`font-semibold text-sm text-right flex-1 ${aWon ? 'text-white' : 'text-zinc-500'}`}>
          {match.teamA}
        </span>
        <div className="flex items-center gap-1 bg-zinc-800 px-3 py-1 rounded-md">
          <span className={`font-black text-lg ${aWon ? 'text-white' : 'text-zinc-400'}`}>{match.scoreA}</span>
          <span className="text-zinc-600 font-bold mx-1">–</span>
          <span className={`font-black text-lg ${bWon ? 'text-white' : 'text-zinc-400'}`}>{match.scoreB}</span>
        </div>
        <span className={`font-semibold text-sm text-left flex-1 ${bWon ? 'text-white' : 'text-zinc-500'}`}>
          {match.teamB}
        </span>
      </div>

      <div className="shrink-0 text-right">
        <span className="inline-block text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
          {match.venue}
        </span>
      </div>
    </div>
  )
}