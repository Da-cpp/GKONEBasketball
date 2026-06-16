export default function Fanzone() {
  const FORM_URL = 'https://forms.office.com/pages/responsepage.aspx?id=TvDbfzBUz0Cyl9f7NrVhQ4PzCS8XRapIgaJ-KxVNURNUQjIzNzlUTE5QTFkwT1lKTEs4N1YxTFNHUi4u&route=shorturl'

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* Page Header */}
      <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-black border-b border-zinc-800 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-red-600 via-red-600/20 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-6 py-8">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-1">Community</p>
          <h1 className="text-white font-black text-3xl">Fan Zone</h1>
          <p className="text-zinc-400 text-sm mt-1">Get involved with the league</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8 items-start">

        {/* LEFT: Clickable Support Card + photos below */}
        <div className="flex-1 w-full">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-red-600/20 hover:shadow-2xl cursor-pointer"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
              <img
                src="/media/support-image.png"
                alt="Support the league"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Open Form
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5">
                <p className="text-red-400 text-xs font-bold uppercase tracking-widest mb-1">Fan Submission</p>
                <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight">
                  Show Your Support
                </h2>
                <p className="text-zinc-300 text-sm mt-2 leading-relaxed max-w-sm">
                  Fill out the form to get involved, give yourself and your team a chance to win.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className="inline-flex items-center gap-2 bg-red-600 group-hover:bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors duration-200">
                    Fill Out the Form
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* basketball photos */}
          <div className="mt-4 flex gap-4 items-start">
            <div className="flex-1 rounded-xl overflow-hidden border border-zinc-800">
              <img
                src="/media/basketball1.jpeg"
                alt="Basketball moment 1"
                className="w-full h-auto block"
              />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden border border-zinc-800">
              <img
                src="/media/basketball2.jpeg"
                alt="Basketball moment 2"
                className="w-full h-auto block"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Decorative image + sidebar info */}
        <div className="w-full lg:w-72 flex flex-col gap-4 shrink-0">

          {/* Signing photo */}
          <div className="relative rounded-xl overflow-hidden border border-zinc-800 aspect-[3/4]">
            <img
              src="/media/rickardo-signing.png"
              alt="Player signing"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4">
              <p className="text-zinc-400 text-xs uppercase tracking-widest font-semibold">League Moment</p>
            </div>
          </div>

          {/* Blurb card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-4 bg-red-600 rounded-full shrink-0" />
              <p className="text-white text-sm font-bold uppercase tracking-widest">Why Vote?</p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {[
                'Support your local teams',
                'Earn your chance to win a smart tv',
                'Watch your teams succeed',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-zinc-400 text-sm">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}