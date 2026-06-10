import type { Match, GameScorer, PlayerScore } from '../types/match'

interface Props {
  match: Match
  scorer?: GameScorer
  playerScores: PlayerScore[]
}

export default function ResultCard({ match, scorer, playerScores }: Props) {
  const scoreA = Number(match.scoreA)
  const scoreB = Number(match.scoreB)

  const aWon = scoreA > scoreB
  const bWon = scoreB > scoreA

  const topA =
    scorer?.topScorerA && scorer.topScorerA !== '-'
      ? playerScores.find(p => p.playerName === scorer.topScorerA)
      : undefined

  const topB =
    scorer?.topScorerB && scorer.topScorerB !== '-'
      ? playerScores.find(p => p.playerName === scorer.topScorerB)
      : undefined

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

      {/* score */}
      <div className="flex items-center gap-2">
        <span className={`font-semibold text-sm text-right flex-1 break-words min-w-0 ${
          aWon ? 'text-white' : 'text-zinc-500'
        }`}>
          {match.teamA}
        </span>

        <div className="flex items-center gap-1 bg-zinc-800 px-2 sm:px-3 py-1 rounded-md shrink-0">
          <span className={`font-black text-base sm:text-lg ${
            aWon ? 'text-white' : 'text-zinc-400'
          }`}>
            {match.scoreA}
          </span>

          <span className="text-zinc-600 font-bold mx-1">–</span>

          <span className={`font-black text-base sm:text-lg ${
            bWon ? 'text-white' : 'text-zinc-400'
          }`}>
            {match.scoreB}
          </span>
        </div>

        <span className={`font-semibold text-sm text-left flex-1 break-words min-w-0 ${
          bWon ? 'text-white' : 'text-zinc-500'
        }`}>
          {match.teamB}
        </span>
      </div>

      {/* top performers fro each team */}
      {(topA || topB) && (
        <div className="mt-3 pt-3 border-t border-zinc-800">
          <span className="text-xs text-zinc-500 uppercase tracking-wide mb-3 block">
            Top Performers
          </span>

          <div className="flex gap-3 flex-wrap sm:flex-nowrap">

            {/* teamA */}
            {topA && (
              <div className={`flex-1 min-w-0 rounded-lg p-3 border ${
                aWon
                  ? 'border-yellow-500/40 bg-yellow-500/5'
                  : 'border-zinc-700 bg-zinc-800/40'
              }`}>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className={`text-xs font-black uppercase tracking-wide ${
                    aWon ? 'text-yellow-400' : 'text-zinc-400'
                  }`}>
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
                      <span className={`text-xs font-bold ${
                        aWon ? 'text-yellow-300' : 'text-zinc-300'
                      }`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* teamB */}
            {topB && (
              <div className={`flex-1 min-w-0 rounded-lg p-3 border ${
                bWon
                  ? 'border-yellow-500/40 bg-yellow-500/5'
                  : 'border-zinc-700 bg-zinc-800/40'
              }`}>
                <div className="flex items-center gap-1.5 mb-2 sm:justify-end">
                  <span className={`text-xs font-black uppercase tracking-wide ${
                    bWon ? 'text-yellow-400' : 'text-zinc-400'
                  }`}>
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
                      <span className={`text-xs font-bold ${
                        bWon ? 'text-yellow-300' : 'text-zinc-300'
                      }`}>
                        {value}
                      </span>
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