import { useEffect, useState } from 'react'
import {
  fetchMatches,
  fetchPlayerScores,
} from '../services/sheetsService'
import type { Match, PlayerScore } from '../types/match'

const ICONS: Record<string, string> = {
  'Top scorer':    '🏀',
  'Top assister':  '🎯',
  'Top rebounder': '💪',
  'Top stealer':   '🤺',
  'Top blocker':   '🛡️',
}

export default function Fanzone() {
  const FORM_URL =
    'https://forms.office.com/pages/responsepage.aspx?id=TvDbfzBUz0Cyl9f7NrVhQ4PzCS8XRapIgaJ-KxVNURNUQjIzNzlUTE5QTFkwT1lKTEs4N1YxTFNHUi4u&route=shorturl'

  const fanImages = [
    '/media/basketball1.jpeg',
    '/media/basketball2.jpeg',
    '/media/basketball3.png',
    '/media/ball-in-play.png',
    '/media/gk-one-i-love-basketball.png',
    '/media/jason-behind.png',
    '/media/Mr-Mcatty.png',
  ]

  const [lastMatch, setLastMatch] = useState<Match | null>(null)
  const [playerScores, setPlayerScores] = useState<PlayerScore[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    Promise.all([fetchMatches(), fetchPlayerScores()]).then(([matches, ps]) => {
      const completed = matches.filter(m => m.status === 'Completed')
      setLastMatch(completed[completed.length - 1] ?? null)
      setPlayerScores(ps)
      requestAnimationFrame(() => setTimeout(() => setVisible(true), 50))
    })
  }, [])

  // gallery
  const [currentImage, setCurrentImage] = useState(0)

  function goTo(index: number) {
    setCurrentImage(index)
  }

  // match story
  function buildStory() {
    if (!lastMatch) return null
    const a = Number(lastMatch.scoreA)
    const b = Number(lastMatch.scoreB)
    if (isNaN(a) || isNaN(b)) return null

    const winner = a > b ? lastMatch.teamA : lastMatch.teamB
    const loser  = a > b ? lastMatch.teamB : lastMatch.teamA
    const margin = Math.abs(a - b)
    const venue  = lastMatch.venue
    const isClose = margin <= 5

    const gamePlayers = playerScores
      .filter(p => p.gameId === lastMatch.gameId)
      .filter(p => p.playerName.toLowerCase() !== 'excluded')

    function topFor(getValue: (p: PlayerScore) => number) {
      const sorted = [...gamePlayers].sort((a, b) => getValue(b) - getValue(a))
      const top = sorted[0]
      return top && getValue(top) > 0 ? top : null
    }

    const topScorer    = topFor(p => p.points)
    const topAssister  = topFor(p => p.assists)
    const topRebounder = topFor(p => p.rebounds)
    const topStealer   = topFor(p => p.steals)
    const topBlocker   = topFor(p => p.blocks)

    const stats = [
      topScorer    && { label: 'Top scorer',    value: `${topScorer.playerName}`,    sub: `${topScorer.points} pts`    },
      topAssister  && { label: 'Top assister',  value: `${topAssister.playerName}`,  sub: `${topAssister.assists} ast`  },
      topRebounder && { label: 'Top rebounder', value: `${topRebounder.playerName}`, sub: `${topRebounder.rebounds} reb` },
      topStealer   && { label: 'Top stealer',   value: `${topStealer.playerName}`,   sub: `${topStealer.steals} stl`   },
      topBlocker   && { label: 'Top blocker',   value: `${topBlocker.playerName}`,   sub: `${topBlocker.blocks} blk`   },
    ].filter(Boolean) as { label: string; value: string; sub: string }[]

    return { winner, loser, margin, venue, isClose, stats, match: lastMatch, scoreA: a, scoreB: b }
  }

  const story = buildStory()

  const sectionDelay = (i: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.5s ease-out ${i * 120}ms, transform 0.5s ease-out ${i * 120}ms`,
  })

  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden">

      {/* header */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-b border-zinc-800 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-red-600/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)' }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <span className="inline-block w-4 h-px bg-red-600" />
            Community
          </p>
          <h1 className="text-white font-black text-4xl tracking-tight">Fan Zone</h1>
          <p className="text-zinc-500 text-sm mt-1.5">Get involved with the league</p>
        </div>
      </div>

      {/* main */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">

        {/* left column */}
        <div className="flex flex-col flex-1 min-w-0 gap-8">

          {/* support card */}
          <div style={sectionDelay(0)}>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(220,38,38,0.15)]"
            >
              <div className="relative h-52 sm:h-72 overflow-hidden">
                <img
                  src="/media/support-image.png"
                  alt="Support the league"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Open Form ↗
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 py-4 sm:py-5">
                  <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">Fan Submission</p>
                  <h2 className="text-white font-black text-xl sm:text-3xl leading-tight">Show Your Support</h2>
                  <p className="text-zinc-300 text-xs sm:text-sm mt-1 sm:mt-2 max-w-sm">
                    Fill out the form to get involved and support your team.
                  </p>
                </div>
              </div>
            </a>
          </div>

          {/*fan gallery */}
          <div style={sectionDelay(1)}>
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-red-600" />
              Fan Gallery
            </p>

            <div
              className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 h-[240px] lg:h-[420px]"
            >
              <img
                src={fanImages[currentImage]}
                className="w-full h-full object-contain"
                alt="Fan gallery"
              />

              {/* radient overlays for arrows */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

              <button
                onClick={() => goTo(Math.max(currentImage - 1, 0))}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center transition-all hover:scale-110 text-lg font-bold"
              >
                ‹
              </button>
              <button
                onClick={() => goTo(Math.min(currentImage + 1, fanImages.length - 1))}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center transition-all hover:scale-110 text-lg font-bold"
              >
                ›
              </button>

              {/* progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-800">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${((currentImage + 1) / fanImages.length) * 100}%` }}
                />
              </div>

              {/* dots */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {fanImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="transition-all duration-300"
                    style={{
                      width: i === currentImage ? '16px' : '6px',
                      height: '6px',
                      borderRadius: '9999px',
                      background: i === currentImage ? '#ef4444' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* match recap */}
          {story && (
            <div style={sectionDelay(2)}>
              <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="inline-block w-4 h-px bg-red-600" />
                Latest Story
              </p>

              <div className="rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                {/* score banner */}
                <div className="bg-zinc-800/60 px-5 py-4 border-b border-zinc-800">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white font-bold text-sm flex-1 text-right leading-tight">{story.match.teamA}</span>
                    <div className="flex items-center gap-2 shrink-0 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5">
                      <span className={`font-black text-xl tabular-nums ${story.scoreA > story.scoreB ? 'text-white' : 'text-zinc-500'}`}>
                        {story.scoreA}
                      </span>
                      <span className="text-zinc-700 font-black">–</span>
                      <span className={`font-black text-xl tabular-nums ${story.scoreB > story.scoreA ? 'text-white' : 'text-zinc-500'}`}>
                        {story.scoreB}
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm flex-1 text-left leading-tight">{story.match.teamB}</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-2.5">
                    {story.isClose && (
                      <span className="text-xs bg-red-600/15 text-red-400 border border-red-600/20 px-2 py-0.5 rounded-full font-semibold">
                        CLOSE GAME
                      </span>
                    )}
                    <span className="text-zinc-500 text-xs">{story.match.date} · {story.venue}</span>
                  </div>
                </div>

                {/* headline */}
                <div className="px-5 py-4 border-b border-zinc-800">
                  <span className="text-xs text-red-500 font-bold uppercase tracking-widest">Match Recap</span>
                  <p className="text-white font-bold text-base leading-snug mt-1.5">
                    {story.winner} beat {story.loser} by {story.margin} {story.margin === 1 ? 'point' : 'points'}
                    {story.venue ? ` at ${story.venue}` : ''}.
                  </p>
                </div>

                {/* stats grid */}
                {story.stats.length > 0 && (
                  <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {story.stats.map(stat => (
                      <div key={stat.label} className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg px-3 py-2.5">
                        <p className="text-zinc-500 text-xs mb-1">{ICONS[stat.label]} {stat.label}</p>
                        <p className="text-white text-sm font-bold leading-tight truncate">{stat.value}</p>
                        <p className="text-red-400 text-xs font-bold mt-0.5">{stat.sub}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* right sidebar */}
        <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">

          {/* player photo */}
          <div style={sectionDelay(1)} className="relative rounded-xl overflow-hidden border border-zinc-800 aspect-[3/4]">
            <img
              src="/media/rickardo-signing.png"
              alt="Player signing"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* why vote card */}
          <div style={sectionDelay(2)} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="inline-block w-4 h-px bg-red-600" />
              Why Get Involved?
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { icon: '🏘️', text: 'Support your local teams' },
                { icon: '🏆', text: 'Earn a chance to win prizes' },
                { icon: '📈', text: 'Watch your teams succeed' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="text-lg shrink-0">{icon}</span>
                  <span className="text-zinc-300 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-500 active:bg-red-700 text-white text-sm font-bold rounded-lg py-2.5 transition-colors"
            >
              Submit Your Vote ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}