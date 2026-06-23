import type { Match } from '../types/match'
import TeamLogo from './TeamLogo'

export default function FeaturedMatch({
  match,
  logos,
}: {
  match: Match
  logos: Record<string, string>
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-10 border border-zinc-800 hover:border-zinc-700 transition-all duration-300">

      {/*background */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black" />
      {/*court line texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)' }}
      />
      {/*top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-red-600/20 to-transparent" />
      {/*left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />

      <div className="relative z-10 px-5 sm:px-10 py-6 sm:py-8">

        {/*header */}
        <div className="flex justify-between items-start mb-6 sm:mb-10">
          <div>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-red-600" />
              Next Match
            </p>
            <h2 className="text-white font-black text-3xl sm:text-4xl tracking-tight">Match Centre</h2>
          </div>
          <div className="bg-zinc-800 border border-zinc-700/50 rounded-md px-2.5 py-1 text-right">
            <span className="text-zinc-500 text-xs">Game </span>
            <span className="text-zinc-200 text-xs font-semibold">#{match.gameId}</span>
          </div>
        </div>

        {/*teams */}
        <div className="grid grid-cols-3 items-center py-2 sm:py-4">

          {/* team a */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <p className="text-zinc-600 uppercase text-xs tracking-widest">Home</p>
            <div className="transition-transform duration-300 hover:scale-110">
              <TeamLogo team={match.teamA} logoUrl={logos[match.teamA]} size={64} />
            </div>
            <h3 className="text-white text-base sm:text-4xl font-black leading-tight text-center">
              {match.teamA}
            </h3>
          </div>

          {/* VS */}
          <div className="text-center flex flex-col items-center gap-1">
            <div
              className="text-4xl sm:text-8xl font-black leading-none"
              style={{ color: '#E10600' }}
            >
              VS
            </div>
            <div className="hidden sm:flex items-center gap-2 mt-2">
              <div className="h-px w-8 bg-zinc-800" />
              <span className="text-zinc-600 text-xs uppercase tracking-widest">upcoming</span>
              <div className="h-px w-8 bg-zinc-800" />
            </div>
          </div>

          {/* team b */}
          <div className="flex flex-col items-center gap-2 sm:gap-3">
            <p className="text-zinc-600 uppercase text-xs tracking-widest">Away</p>
            <div className="transition-transform duration-300 hover:scale-110">
              <TeamLogo team={match.teamB} logoUrl={logos[match.teamB]} size={64} />
            </div>
            <h3 className="text-white text-base sm:text-4xl font-black leading-tight text-center">
              {match.teamB}
            </h3>
          </div>

        </div>

        {/* match details */}
        <div className="mt-6 sm:mt-10 border-t border-zinc-800 pt-5 grid grid-cols-3 sm:flex sm:justify-center sm:gap-12">
          <div className="text-center">
            <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">Date</p>
            <p className="text-white font-bold text-xs sm:text-sm">{match.day}</p>
            <p className="text-zinc-300 font-black text-sm sm:text-base">{match.date}</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">Time</p>
            <p className="text-red-500 font-black text-sm sm:text-xl">{match.time}</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-600 text-xs uppercase tracking-widest mb-1">Venue</p>
            <p className="text-white font-bold text-xs sm:text-sm leading-tight">{match.venue}</p>
          </div>
        </div>

      </div>
    </div>
  )
}