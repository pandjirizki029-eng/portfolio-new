'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Rocket,
  Heart,
  Zap,
  Target,
  Coffee,
  Music,
  Gamepad2,
  Globe,
  Quote,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

/* ── Floating tool icons (inline SVGs for real logos) ── */
const floatingTools = [
  {
    name: 'React',
    svg: '<svg viewBox="-11.5 -10.23 23 20.46" fill="currentColor"><circle r="2.05"/><g fill="none" stroke="currentColor" stroke-width="1"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>',
    top: '-6%', left: '65%', size: 38, delay: 0, duration: 7, color: 'text-cyan-400/25',
  },
  {
    name: 'Next.js',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.534-.051.469 0 .534.012.645.116a515.28 515.28 0 0 1 2.566 3.886l2.758 4.2 1.438 2.19.073-.048c.639-.423 1.293-.985 1.877-1.605 1.515-1.615 2.588-3.59 3.08-5.682.096-.659.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.86-8.292-8.209-9.695a12.496 12.496 0 0 0-2.499-.523A33.247 33.247 0 0 0 11.572 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/></svg>',
    top: '78%', left: '-15%', size: 32, delay: 1.5, duration: 9, color: 'text-white/20',
  },
  {
    name: 'TypeScript',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>',
    top: '10%', left: '-20%', size: 36, delay: 0.8, duration: 8, color: 'text-blue-400/25',
  },
  {
    name: 'Docker',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.186.186 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/></svg>',
    top: '55%', left: '80%', size: 34, delay: 2.2, duration: 10, color: 'text-sky-400/20',
  },
  {
    name: 'Git',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.66 2.66c.643-.22 1.386-.076 1.9.438a1.862 1.862 0 0 1 0 2.633 1.862 1.862 0 0 1-2.633 0 1.868 1.868 0 0 1-.404-2.04l-2.482-2.482v6.53a1.87 1.87 0 0 1 .494 3.074 1.862 1.862 0 0 1-2.632 0 1.862 1.862 0 0 1 0-2.632c.21-.21.466-.356.74-.432v-6.592a1.87 1.87 0 0 1-1.013-3.092L8.69 3.726.452 11.966c-.603.605-.603 1.582 0 2.188l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.188"/></svg>',
    top: '-10%', left: '30%', size: 30, delay: 3, duration: 11, color: 'text-orange-500/20',
  },
  {
    name: 'Node',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .138.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.55l-2.307-1.33A1.85 1.85 0 0 1 1.36 17.07V6.921c0-.645.338-1.248.921-1.573l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.585.325.924.928.924 1.573v10.15a1.852 1.852 0 0 1-.924 1.573l-8.795 5.082c-.28.163-.6.247-.921.247"/></svg>',
    top: '90%', left: '45%', size: 28, delay: 0.5, duration: 8.5, color: 'text-green-500/20',
  },
  {
    name: 'Tailwind',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/></svg>',
    top: '30%', left: '85%', size: 40, delay: 1.8, duration: 7.5, color: 'text-teal-400/22',
  },
  {
    name: 'Laravel',
    svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.642 5.43a.364.364 0 0 1 .014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 0 1-.188.326L9.93 23.949a.316.316 0 0 1-.066.027c-.008.002-.016.008-.024.01a.348.348 0 0 1-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 0 1-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 0 1 .023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034h.001L5.044.05a.375.375 0 0 1 .375 0L9.933 2.697h.002c.015.01.027.021.04.033.013.01.027.017.037.027l.033.045c.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.066.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.011.01-.021.013-.032.01-.02.017-.039.024-.059.007-.012.018-.021.025-.033.01-.016.021-.03.033-.043.012-.012.025-.02.037-.028.014-.01.026-.023.041-.032h.002l4.513-2.647a.375.375 0 0 1 .375 0l4.513 2.647c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.024.028.034.044.008.012.019.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.514 7.76v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003-.002-.002c-.014-.01-.025-.021-.04-.031-.012-.01-.025-.02-.035-.03l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.022-.028-.036h-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 0 1-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 3.023l3.76 2.164 3.758-2.164zm2.297 13.882l2.182-1.256V3.624L7.527 4.88 5.344 6.14v9.652zm12.63-11.296L16.398 5.56l3.76 2.163 3.757-2.163zM15.585 6.18l-2.183-1.258-1.578-.908v4.283l2.183 1.256 1.578.908zm-3.946 11.291l-4.332-2.428-.001-.005-3.934-2.201v4.326l8.267 4.762z"/></svg>',
    top: '45%', left: '-18%', size: 28, delay: 2.8, duration: 9.5, color: 'text-red-400/22',
  },
]

/* ── Personal trait cards data ── */
const traits = [
  {
    icon: Rocket,
    title: 'Ambisi',
    description: 'Selalu ingin berkembang dan belajar hal baru setiap hari.',
    gradient: 'from-orange-500 to-amber-500',
    delay: 0,
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Cinta pada proses coding dan memecahkan masalah kompleks.',
    gradient: 'from-rose-500 to-pink-500',
    delay: 100,
  },
  {
    icon: Zap,
    title: 'Efisiensi',
    description: 'Mengutamakan kode yang bersih, cepat, dan maintainable.',
    gradient: 'from-yellow-500 to-orange-500',
    delay: 200,
  },
  {
    icon: Target,
    title: 'Fokus',
    description: 'Berkomitmen penuh pada setiap proyek yang dikerjakan.',
    gradient: 'from-emerald-500 to-teal-500',
    delay: 300,
  },
]

/* ── Personal interests / hobbies ── */
const interests = [
  { icon: Coffee, label: 'Coffee Enthusiast' },
  { icon: Music, label: 'Lo-fi Listener' },
  { icon: Gamepad2, label: 'Gamer' },
  { icon: Globe, label: 'Tech Explorer' },
]

/* ── Animated counter hook ── */
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return count
}

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Trait Card Component ── */
function TraitCard({ trait }: { trait: (typeof traits)[0] }) {
  const { ref, visible } = useReveal(0.2)
  const Icon = trait.icon

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(30px)',
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${trait.delay}ms`,
      }}
    >
      {/* Hover glow effect */}
      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${trait.gradient} opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-20`} />

      <div className="relative rounded-2xl border border-white/8 bg-zinc-900/60 p-5 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-zinc-900/80">
        {/* Icon */}
        <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${trait.gradient} shadow-lg`}>
          <Icon size={20} className="text-white" />
        </div>

        {/* Text */}
        <h3 className="mb-1.5 text-base font-bold tracking-tight text-white">
          {trait.title}
        </h3>
        <p className="text-xs leading-relaxed text-zinc-400">
          {trait.description}
        </p>

        {/* Bottom accent line */}
        <div className={`mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r ${trait.gradient} transition-all duration-700 group-hover:w-full`} />
      </div>
    </div>
  )
}

/* ── Main About Me Section ── */
export function AboutMe() {
  const heroReveal = useReveal(0.1)
  const quoteReveal = useReveal(0.2)
  const interestsReveal = useReveal(0.15)

  const projectsCount = useCountUp(10, 1500, heroReveal.visible)
  const techCount = useCountUp(12, 1500, heroReveal.visible)
  const yearsCount = useCountUp(2, 1200, heroReveal.visible)

  return (
    <section id="whoami" className="relative border-b border-border overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Radial ambient glow */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-orange-500/4 blur-[120px]" />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-28">
        {/* ── Section Header ── */}
        <div
          ref={heroReveal.ref}
          style={{
            opacity: heroReveal.visible ? 1 : 0,
            transform: heroReveal.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            00 · Who am I
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Di balik layar<span className="text-primary">.</span>
          </h2>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* ── LEFT: Profile + Bio ── */}
          <div
            className="relative"
            style={{
              opacity: heroReveal.visible ? 1 : 0,
              transform: heroReveal.visible ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 200ms',
            }}
          >
            {/* ── Floating tool logos (behind everything in left column) ── */}
            <div className="pointer-events-none absolute -inset-16 z-0 select-none overflow-visible">
              {floatingTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`absolute ${tool.color}`}
                  style={{
                    top: tool.top,
                    left: tool.left,
                    width: tool.size,
                    height: tool.size,
                    filter: 'blur(1.5px)',
                    animation: `floatTool ${tool.duration}s ease-in-out ${tool.delay}s infinite`,
                  }}
                  dangerouslySetInnerHTML={{ __html: tool.svg }}
                />
              ))}
            </div>

            {/* Profile Image with animated border */}
            <div className="group relative mb-8 inline-block z-[1]">

              {/* ── Decorative background elements (blurred & subtle) ── */}
              <div className="pointer-events-none absolute -inset-12 z-0 select-none">
                {/* Floating code brackets */}
                <span className="absolute -top-4 -right-8 font-mono text-5xl text-primary/10 blur-[1.5px] rotate-12">
                  {'{ }'}
                </span>
                <span className="absolute bottom-8 -left-10 font-mono text-4xl text-orange-400/10 blur-[1px] -rotate-6">
                  {'< />'}
                </span>

                {/* Geometric circles */}
                <div className="absolute -top-6 left-1/2 h-16 w-16 rounded-full border border-primary/8 blur-[0.5px]" />
                <div className="absolute -bottom-2 -right-6 h-20 w-20 rounded-full border border-orange-400/6 blur-[1px]" />
                <div className="absolute top-1/3 -right-10 h-10 w-10 rounded-full bg-primary/5 blur-[3px]" />

                {/* Dotted accents */}
                <div className="absolute top-4 -left-6 flex flex-col gap-2 opacity-15 blur-[0.5px]">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                </div>
                <div className="absolute bottom-12 -right-4 flex gap-2 opacity-12 blur-[0.5px]">
                  <div className="h-1 w-1 rounded-full bg-white" />
                  <div className="h-1 w-1 rounded-full bg-white" />
                  <div className="h-1 w-1 rounded-full bg-white" />
                </div>

                {/* Thin dashed ring */}
                <div className="absolute -inset-4 rounded-3xl border border-dashed border-white/4 blur-[0.5px]" />

                {/* Small floating "01" label */}
                <span className="absolute -top-8 left-4 font-mono text-[10px] tracking-widest text-white/8 blur-[0.5px]">
                  01_PROFILE
                </span>

                {/* Subtle cross marks */}
                <span className="absolute bottom-0 left-1/3 text-lg text-white/5 blur-[1px] rotate-45">+</span>
                <span className="absolute top-2 right-1/4 text-sm text-primary/8 blur-[1px]">✦</span>


              </div>

              {/* Rotating gradient ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary via-orange-400 to-amber-500 opacity-60 blur-sm transition-opacity duration-500 group-hover:opacity-90 animate-border-spin z-[1]" />
              <div className="relative z-[2] overflow-hidden rounded-2xl border-2 border-zinc-800">
                <img
                  src="/images/foto-kp.png"
                  alt="Muhammad Pandji Ar Rizky Munib"
                  className="h-[280px] w-[240px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />
                {/* Name overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    @pandjirizki
                  </p>
                  <p className="text-sm font-bold text-white">
                    Pandji Ar Rizky
                  </p>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-zinc-300">
                Halo! Saya <span className="font-semibold text-white">Muhammad Pandji Ar Rizky Munib</span>, 
                siswa jurusan Sistem Informasi Jaringan dan Aplikasi (SIJA) di SMK Telkom Sidoarjo. Saya percaya bahwa 
                teknologi memiliki kekuatan untuk mengubah cara kita hidup dan bekerja.
              </p>
              <p className="text-sm leading-relaxed text-zinc-400">
                Setiap baris kode yang saya tulis adalah langkah menuju mimpi membangun 
                solusi digital yang tidak hanya berfungsi, tapi juga memberikan pengalaman 
                yang bermakna bagi penggunanya.
              </p>
            </div>

            {/* Mini stats row */}
            <div className="mt-8 flex gap-6 border-t border-white/8 pt-6">
              {[
                { value: `${projectsCount}+`, label: 'Proyek' },
                { value: `${techCount}+`, label: 'Teknologi' },
                { value: `${yearsCount}+`, label: 'Tahun Coding' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold tracking-tight text-white">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Traits + Interests ── */}
          <div className="flex flex-col gap-8">
            {/* Trait Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {traits.map((trait) => (
                <TraitCard key={trait.title} trait={trait} />
              ))}
            </div>

            {/* Interests / Hobbies Row */}
            <div
              ref={interestsReveal.ref}
              className="rounded-2xl border border-white/8 bg-zinc-900/40 p-5 backdrop-blur-md"
              style={{
                opacity: interestsReveal.visible ? 1 : 0,
                transform: interestsReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              }}
            >
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                Di luar coding
              </p>
              <div className="flex flex-wrap gap-3">
                {interests.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10"
                    >
                      <Icon
                        size={14}
                        className="text-zinc-400 transition-colors group-hover:text-primary"
                      />
                      <span className="font-mono text-xs text-zinc-300 transition-colors group-hover:text-white">
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Quote / Philosophy ── */}
        <div
          ref={quoteReveal.ref}
          className="relative mt-16 md:mt-20"
          style={{
            opacity: quoteReveal.visible ? 1 : 0,
            transform: quoteReveal.visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-800/40 p-8 md:p-12 backdrop-blur-md">
            {/* Background decorative quote marks */}
            <Quote
              size={120}
              className="absolute -top-4 -left-4 text-primary/5 rotate-180"
              strokeWidth={1}
            />
            <Quote
              size={80}
              className="absolute -bottom-2 -right-2 text-primary/5"
              strokeWidth={1}
            />

            {/* Sparkle accent */}
            <div className="mb-4 flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                filosofi saya
              </span>
            </div>

            <blockquote className="relative z-10">
              <p className="text-lg md:text-xl font-semibold leading-relaxed tracking-tight text-white/90 italic">
                &ldquo;Kode bukan sekadar instruksi untuk mesin ia adalah cara kita 
                berbicara dengan masa depan. Setiap proyek adalah sebuah cerita, dan 
                setiap bug adalah pelajaran yang membuat kita lebih kuat.&rdquo;
              </p>
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                — Pandji Ar Rizky
              </span>
            </div>

            {/* CTA to next section */}
            <a
              href="#about"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-zinc-300 transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:text-white"
            >
              Jelajahi Skill Saya
              <ChevronRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
