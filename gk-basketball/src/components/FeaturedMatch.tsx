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
    <div className="relative overflow-hidden rounded-2xl mb-10 border border-zinc-800">

      <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black" />

      <div className="relative z-10 px-5 sm:px-10 py-5">

        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div>
            <p className="text-[#E10600] uppercase tracking-[0.3em] text-xs sm:text-sm font-bold">
              Next Match
            </p>
            <h2 className="text-white text-2xl sm:text-4xl font-black mt-1 sm:mt-2">
              Match Centre
            </h2>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-sm">Game #{match.gameId}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center py-4 sm:py-6">

          {/* Team A */}
          <div className="text-center flex flex-col items-center gap-3">
            <p className="text-zinc-500 uppercase text-xs tracking-widest">
              Home Team
            </p>
            <TeamLogo team={match.teamA} logoUrl={logos[match.teamA]} size={64} />
            <h3 className="text-white text-xl sm:text-5xl font-black leading-tight">
              {match.teamA}
            </h3>
          </div>

          <div className="text-center">
            <div className="text-[#E10600] text-5xl sm:text-8xl font-black leading-none">
              VS
            </div>
          </div>

          {/* Team B */}
          <div className="text-center flex flex-col items-center gap-3">
            <p className="text-zinc-500 uppercase text-xs tracking-widest">
              Away Team
            </p>
            <TeamLogo team={match.teamB} logoUrl={logos[match.teamB]} size={64} />
            <h3 className="text-white text-xl sm:text-5xl font-black leading-tight">
              {match.teamB}
            </h3>
          </div>

        </div>

        <div className="mt-6 sm:mt-10 grid grid-cols-3 sm:flex sm:justify-center sm:gap-10">
          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase">Date</p>
            <p className="text-white font-bold text-xs sm:text-base">{match.day}, {match.date}</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase">Time</p>
            <p className="text-white font-bold text-xs sm:text-base">{match.time}</p>
          </div>
          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase">Venue</p>
            <p className="text-white font-bold text-xs sm:text-base">{match.venue}</p>
          </div>
        </div>

      </div>
    </div>
  )
}
