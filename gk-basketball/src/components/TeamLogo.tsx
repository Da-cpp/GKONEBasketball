export default function TeamLogo({
  team,
  logoUrl,
  size = 24,
}: {
  team: string
  logoUrl?: string
  size?: number
}) {
  if (!logoUrl) {
    return (
      <div
        className="rounded-full bg-zinc-700 flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <span
          className="text-white font-black leading-none"
          style={{ fontSize: Math.round(size * 0.4) }}
        >
          {team.charAt(0).toUpperCase()}
        </span>
      </div>
    )
  }

  return (
    <img
      src={logoUrl}
      alt={`${team} logo`}
      className="rounded-full object-contain shrink-0 bg-zinc-800"
      style={{ width: size, height: size }}
    />
  )
}
