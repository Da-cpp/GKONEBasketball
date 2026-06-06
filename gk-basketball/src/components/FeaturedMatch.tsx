import type { Match } from '../types/match'

export default function FeaturedMatch({ match }: { match: Match }) {
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-800 mb-8 shadow-xl shadow-black/40">
      {/* Header bar */}
      <div className="bg-red-600 px-5 py-2 flex items-center justify-between">
        <span className="text-white text-xs font-bold uppercase tracking-widest">
          Next Match
        </span>
        <span className="text-red-200 text-xs font-medium">
          Game #{match.gameId}
        </span>
      </div>

      {/* Teams section */}
      <div className="bg-zinc-900 px-6 py-8 flex items-center justify-center gap-6">
        <div className="flex-1 text-right">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Home</p>
          <p className="text-white font-black text-2xl leading-tight">{match.teamA}</p>
        </div>

        <div className="flex flex-col items-center px-4">
          <span className="text-red-600 font-black text-3xl">VS</span>
        </div>

        <div className="flex-1 text-left">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Away</p>
          <p className="text-white font-black text-2xl leading-tight">{match.teamB}</p>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-3 flex items-center justify-center gap-8 text-sm text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block"></span>
          {match.day}, {match.date}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block"></span>
          {match.time}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block"></span>
          {match.venue}
        </span>
      </div>
    </div>
  )
}