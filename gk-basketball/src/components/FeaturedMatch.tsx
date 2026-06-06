import type { Match } from '../types/match'

export default function FeaturedMatch({ match }: { match: Match }) {
  return (
    <div className="relative overflow-hidden rounded-2xl mb-10 border border-zinc-800">

      <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900 to-black" />

      <div className="relative z-10 px-10 py-5">

        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[#E10600] uppercase tracking-[0.3em] text-sm font-bold">
              Next Match
            </p>

            <h2 className="text-white text-4xl font-black mt-2">
              Match Centre
            </h2>
          </div>

          <div className="text-right">
            <p className="text-zinc-500 text-sm">
              Game #{match.gameId}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 items-center py-6">

  <div className="text-center">
    <p className="text-zinc-500 uppercase text-xs tracking-widest mb-3">
      Home Team
    </p>

    <h3 className="text-white text-5xl font-black leading-none">
      {match.teamA}
    </h3>
  </div>

  <div className="text-center">
    <div className="text-[#E10600] text-8xl font-black leading-none">
      VS
    </div>
  </div>

  <div className="text-center">
    <p className="text-zinc-500 uppercase text-xs tracking-widest mb-3">
      Away Team
    </p>

    <h3 className="text-white text-5xl font-black leading-none">
      {match.teamB}
    </h3>
  </div>

</div>

        <div className="mt-10 flex justify-center gap-10 flex-wrap">

          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase">Date</p>
            <p className="text-white font-bold">
              {match.day}, {match.date}
            </p>
          </div>

          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase">Time</p>
            <p className="text-white font-bold">
              {match.time}
            </p>
          </div>

          <div className="text-center">
            <p className="text-zinc-500 text-xs uppercase">Venue</p>
            <p className="text-white font-bold">
              {match.venue}
            </p>
          </div>

        </div>

      </div>
    </div>
  )
}