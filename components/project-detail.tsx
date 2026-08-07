'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  User,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronDown,
} from 'lucide-react'
import { getProjectBySlug } from '@/lib/projects-data'

/* ── Animated counter hook ── */
function useCounter(target: number, duration = 1200) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        let start = 0
        const step = Math.ceil(target / (duration / 16))
        const id = setInterval(() => {
          start += step
          if (start >= target) { setCount(target); clearInterval(id) }
          else setCount(start)
        }, 16)
        obs.disconnect()
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return { count, ref }
}

/* ── Parallax image on mouse ── */
function useParallax() {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12
      setStyle({ transform: `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)` })
    }
    const reset = () => setStyle({ transform: 'perspective(800px) rotateY(0) rotateX(0) scale(1)' })
    el.addEventListener('mousemove', handle)
    el.addEventListener('mouseleave', reset)
    return () => { el.removeEventListener('mousemove', handle); el.removeEventListener('mouseleave', reset) }
  }, [])
  return { ref, style }
}

export function ProjectDetailView({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug)!
  const [loaded, setLoaded] = useState(false)
  const parallax = useParallax()
  const featCount = useCounter(project.features.length)
  const techCount = useCounter(project.techStack.length)
  const challengeCount = useCounter(project.challenges.length)

  useEffect(() => { setLoaded(true) }, [])

  const Icon = project.icon

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      {/* ── BG Grain Noise ── */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.028]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px' }} />

      {/* ── Hero Section ── */}
      <section className="relative min-h-[92vh] flex flex-col">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[180px] opacity-20 pointer-events-none" style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10 pointer-events-none" style={{ backgroundColor: project.color }} />

        {/* Top nav bar */}
        <nav className={`relative z-30 flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
          <Link href="/#work" className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
            <span className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 bg-white/5 group-hover:border-white/30 group-hover:bg-white/10 transition-all">
              <ArrowLeft size={16} />
            </span>
            Kembali
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{project.fileNo}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-600" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{project.year}</span>
          </div>
        </nav>

        {/* Hero content grid */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12">
            {/* Left — info */}
            <div className={`space-y-8 transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              {/* Category badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border" style={{ borderColor: `${project.color}40`, backgroundColor: `${project.color}15`, color: project.color }}>
                  <Icon size={13} />
                  {project.category}
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${project.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${project.status === 'Active' ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`} />
                  {project.status}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">{project.title}</h1>
                <p className="text-lg md:text-xl font-medium italic" style={{ color: `${project.color}cc` }}>{project.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">{project.description}</p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
                  <Calendar size={14} className="text-zinc-500" />
                  <span className="text-zinc-300">{project.timeline}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono">
                  <User size={14} className="text-zinc-500" />
                  <span className="text-zinc-300">{project.role}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold border border-white/8 bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:border-white/15 transition-all cursor-default">{tag}</span>
                ))}
              </div>
            </div>

            {/* Right — hero image with parallax */}
            <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-12 scale-95'}`}>
              <div ref={parallax.ref} style={{ ...parallax.style, transition: 'transform 0.15s ease-out' }} className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 rounded-tl-2xl z-20 pointer-events-none" style={{ borderColor: `${project.color}60` }} />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 rounded-br-2xl z-20 pointer-events-none" style={{ borderColor: `${project.color}60` }} />

                <div className="relative aspect-video bg-zinc-900">
                  <Image src={project.image} alt={project.title} fill className="object-cover object-top" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                </div>

                {/* Floating file label */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                  <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }} />
                  <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-wider">{project.fileNo} — LIVE PREVIEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`relative z-10 flex justify-center pb-8 transition-all duration-1000 delay-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll untuk detail</span>
            <ChevronDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="relative border-y border-white/8 bg-zinc-900/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-3 gap-6">
          {[
            { label: 'Fitur', countHook: featCount, suffix: '+' },
            { label: 'Tech Stack', countHook: techCount, suffix: '' },
            { label: 'Tantangan', countHook: challengeCount, suffix: '' },
          ].map((stat) => (
            <div key={stat.label} ref={stat.countHook.ref} className="flex flex-col items-center text-center">
              <span className="text-3xl md:text-4xl font-extrabold tabular-nums" style={{ color: project.color }}>
                {stat.countHook.count}{stat.suffix}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Deep Dive Section ── */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section heading */}
          <div className="mb-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 block mb-3">DEEP DIVE</span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">Tentang Proyek Ini</h2>
            <div className="h-1 w-16 rounded-full mt-4" style={{ backgroundColor: project.color }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Main content (3 cols) */}
            <div className="lg:col-span-3 space-y-12">
              {/* Long description */}
              <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/60 border border-white/6">
                <p className="text-zinc-300 leading-[1.85] text-sm md:text-base">{project.longDescription}</p>
              </div>

              {/* Features */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center h-9 w-9 rounded-xl border border-white/10 bg-white/5">
                    <Zap size={16} style={{ color: project.color }} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">Fitur Utama</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="group flex items-start gap-3 p-4 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/12 hover:bg-zinc-900/70 transition-all">
                      <CheckCircle2 size={16} className="mt-0.5 flex-none" style={{ color: project.color }} />
                      <span className="text-sm text-zinc-300 leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center h-9 w-9 rounded-xl border border-white/10 bg-white/5">
                    <AlertTriangle size={16} className="text-amber-400" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight">Tantangan & Solusi</h3>
                </div>
                <div className="space-y-3">
                  {project.challenges.map((ch, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-900/40 border border-white/5">
                      <span className="flex-none flex items-center justify-center h-7 w-7 rounded-lg bg-amber-500/10 text-amber-400 font-mono text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm text-zinc-300 leading-snug">{ch}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tech stack card */}
              <div className="rounded-2xl border border-white/8 bg-zinc-900/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/6 flex items-center gap-3">
                  <Layers size={16} style={{ color: project.color }} />
                  <h3 className="text-sm font-bold uppercase tracking-wider">Tech Stack</h3>
                </div>
                <div className="p-4 space-y-2">
                  {project.techStack.map((tech, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all group">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: project.color }} />
                        <span className="text-sm font-semibold text-white">{tech.name}</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500 max-w-[140px] text-right leading-tight">{tech.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project info card */}
              <div className="rounded-2xl border border-white/8 bg-zinc-900/50 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/6">
                  <h3 className="text-sm font-bold uppercase tracking-wider">Info Proyek</h3>
                </div>
                <div className="p-4 space-y-4">
                  {[
                    { label: 'Timeline', value: project.timeline },
                    { label: 'Role', value: project.role },
                    { label: 'Status', value: project.status },
                    { label: 'Tahun', value: project.year },
                    { label: 'Kategori', value: project.category },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{item.label}</span>
                      <span className="text-sm text-zinc-200 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link href="/#work" className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl font-mono text-sm font-bold uppercase tracking-wider text-black transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg" style={{ backgroundColor: project.color }}>
                Lihat Proyek Lain
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/6 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-zinc-600 uppercase tracking-widest">{project.fileNo} — {project.title}</span>
          <Link href="/#work" className="font-mono text-[11px] text-zinc-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
            <ArrowLeft size={12} />
            Kembali ke Portfolio
          </Link>
        </div>
      </footer>
    </div>
  )
}
