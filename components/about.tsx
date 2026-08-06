const skillGroups = [
  {
    title: 'Frontend & UI',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    title: 'Backend & Database',
    items: ['Node.js', 'Express', 'Laravel / PHP', 'MySQL', 'REST API'],
  },
  {
    title: 'Tools & Workflow',
    items: ['Git & GitHub', 'VS Code', 'Figma', 'Linux', 'Vercel'],
  },
  {
    title: 'Education',
    items: ['SMK Telkom (2024 – 2028)', 'Software Engineering / RPL'],
  },
]

const ribbonItems1 = [
  'React',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'HTML5 / CSS3',
  'Node.js',
  'Express',
  'Laravel / PHP',
  'MySQL',
  'REST API',
]

const ribbonItems2 = [
  'Git & GitHub',
  'VS Code',
  'Figma',
  'Linux',
  'Vercel',
  'SMK Telkom (2024 – 2028)',
  'Software Engineering / RPL',
  'Web Development',
]

export function About() {
  return (
    <section id="about" className="border-b border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* About Bio Header */}
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-mono text-sm uppercase tracking-widest text-primary">
              01 — About
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Passionate about code & learning.
            </h2>
          </div>

          <div className="space-y-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            <p>
              Perjalanan teknologi saya dimulai pada tahun 2024 saat saya mulai menempuh pendidikan di <span className="font-semibold text-foreground">SMK Telkom</span>. Berfokus pada pengembangan perangkat lunak, pemrograman web, dan teknologi digital, saya berkomitmen untuk terus belajar hingga target kelulusan pada tahun 2028.
            </p>
            <p>
              Sebagai siswa di SMK Telkom, saya aktif mengembangkan berbagai proyek web, mengasah keterampilan logika pemrograman, serta membangun aplikasi modern yang efisien dan bermanfaat.
            </p>
          </div>
        </div>

        {/* Full-width Skill Groups with Crisp White Stroke */}
        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/90 font-bold border-b border-white/15 pb-2">
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2 pt-1">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/70 bg-white/5 hover:bg-white/20 hover:border-white px-3 py-1.5 text-xs font-mono font-medium text-white tracking-wide transition-all shadow-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Orange Angled Ribbon Marquee (Shape from Photo 3 with infinite scroll) */}
        <div className="relative mt-16 w-full overflow-hidden py-6">
          {/* Top Angled Ribbon */}
          <div className="relative z-10 -rotate-2 transform bg-[#ff5500] py-3.5 shadow-lg border-y border-white/20">
            <div className="animate-marquee-left flex items-center whitespace-nowrap">
              {[...ribbonItems1, ...ribbonItems1, ...ribbonItems1, ...ribbonItems1].map((item, idx) => (
                <span
                  key={idx}
                  className="mx-3 flex items-center font-mono text-xs md:text-sm font-extrabold uppercase tracking-widest text-black"
                >
                  {item}
                  <span className="ml-6 text-black/70 font-black">✦</span>
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Angled Ribbon (Crossing over) */}
          <div className="relative z-20 -mt-7 rotate-2 transform bg-[#ff6b00] py-3.5 shadow-2xl border-y border-white/20">
            <div className="animate-marquee-right flex items-center whitespace-nowrap">
              {[...ribbonItems2, ...ribbonItems2, ...ribbonItems2, ...ribbonItems2].map((item, idx) => (
                <span
                  key={idx}
                  className="mx-3 flex items-center font-mono text-xs md:text-sm font-extrabold uppercase tracking-widest text-black"
                >
                  {item}
                  <span className="ml-6 text-black/70 font-black">★</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
