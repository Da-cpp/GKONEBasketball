import type { Match, GameScorer, PlayerScore } from '../types/match'
import TeamLogo from './TeamLogo'

interface Props {
  match: Match
  scorer?: GameScorer
  playerScores: PlayerScore[]
  logos: Record<string, string>
}

export default function ResultCard({ match, playerScores, logos }: Props) {
  const scoreA = Number(match.scoreA)
  const scoreB = Number(match.scoreB)

  const aWon = scoreA > scoreB
  const bWon = scoreB > scoreA

  const topA = playerScores.find(p => p.topPerformer && p.team === match.teamA)
  const topB = playerScores.find(p => p.topPerformer && p.team === match.teamB)

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

      {/* Score row */}
      <div className="flex items-center gap-2">

        {/* Team A */}
        <div className="flex items-center gap-1.5 flex-1 justify-end min-w-0">
          <span className={`font-semibold text-sm text-right break-words min-w-0 ${aWon ? 'text-white' : 'text-zinc-500'}`}>
            {match.teamA}
          </span>
          <TeamLogo team={match.teamA} logoUrl={logos[match.teamA]} size={24} />
        </div>

        <div className="flex items-center gap-1 bg-zinc-800 px-2 sm:px-3 py-1 rounded-md shrink-0">
          <span className={`font-black text-base sm:text-lg ${aWon ? 'text-white' : 'text-zinc-400'}`}>
            {match.scoreA}
          </span>
          <span className="text-zinc-600 font-bold mx-1">–</span>
          <span className={`font-black text-base sm:text-lg ${bWon ? 'text-white' : 'text-zinc-400'}`}>
            {match.scoreB}
          </span>
        </div>

        {/* Team B */}
        <div className="flex items-center gap-1.5 flex-1 justify-start min-w-0">
          <TeamLogo team={match.teamB} logoUrl={logos[match.teamB]} size={24} />
          <span className={`font-semibold text-sm text-left break-words min-w-0 ${bWon ? 'text-white' : 'text-zinc-500'}`}>
            {match.teamB}
          </span>
        </div>

      </div>

      {/* Top performers */}
      {(topA || topB) && (
        <div className="mt-3 pt-3 border-t border-zinc-800">
          <span className="text-xs text-zinc-500 uppercase tracking-wide mb-3 block">
            Top Performers
          </span>

          <div className="flex gap-3 flex-wrap sm:flex-nowrap">

            {topA && (
              <div className={`flex-1 min-w-0 rounded-lg p-3 border ${
                aWon ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-zinc-700 bg-zinc-800/40'
              }`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`text-xs font-black uppercase tracking-wide ${aWon ? 'text-yellow-400' : 'text-zinc-400'}`}>
                    {aWon ? '🥇' : '🥈'} {topA.playerName}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    { label: 'PTS', value: topA.points },
                    { label: 'STL', value: topA.steals },
                    { label: 'REB', value: topA.rebounds },
                    { label: 'AST', value: topA.assists },
                    { label: 'BLK', value: topA.blocks },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between">
                      <span className="text-zinc-500 text-xs">{label}</span>
                      <span className={`text-xs font-bold ${aWon ? 'text-yellow-300' : 'text-zinc-300'}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {topB && (
              <div className={`flex-1 min-w-0 rounded-lg p-3 border ${
                bWon ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-zinc-700 bg-zinc-800/40'
              }`}>
                <div className="flex items-center gap-1.5 mb-2 sm:justify-end">
                  <span className={`text-xs font-black uppercase tracking-wide ${bWon ? 'text-yellow-400' : 'text-zinc-400'}`}>
                    {bWon ? '🥇' : '🥈'} {topB.playerName}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  {[
                    { label: 'PTS', value: topB.points },
                    { label: 'STL', value: topB.steals },
                    { label: 'REB', value: topB.rebounds },
                    { label: 'AST', value: topB.assists },
                    { label: 'BLK', value: topB.blocks },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between sm:flex-row-reverse">
                      <span className="text-zinc-500 text-xs">{label}</span>
                      <span className={`text-xs font-bold ${bWon ? 'text-yellow-300' : 'text-zinc-300'}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
