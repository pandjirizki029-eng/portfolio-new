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
  Server,
  Terminal,
  Cloud,
} from 'lucide-react'



/* ── Personal trait cards data ── */
const traits = [
  {
    icon: Rocket,
    title: 'Infrastruktur',
    description: 'Dari merakit server Linux hingga orkestrasi Docker & Nginx untuk deployment.',
    delay: 0,
  },
  {
    icon: Heart,
    title: 'Problem Solving',
    description: 'Menikmati tantangan memecahkan error 500 dan menemukan bottleneck performa.',
    delay: 100,
  },
  {
    icon: Zap,
    title: 'Scalability',
    description: 'Merancang arsitektur sistem yang ringan, cepat, dan siap untuk traffic tinggi.',
    delay: 200,
  },
  {
    icon: Target,
    title: 'Eksplorasi',
    description: 'Terus bereksperimen dengan AI chatbot, 3D WebGL, hingga serverless computing.',
    delay: 300,
  },
]

/* ── Personal interests / hobbies ── */
const interests = [
  { icon: Server, label: 'SysAdmin Ops' },
  { icon: Terminal, label: 'Linux Ricing' },
  { icon: Cloud, label: 'Cloud Architecture' },
  { icon: Target, label: 'CTF / Security' },
]

/* ── Isolated Animated counter component ── */
function CountUpNumber({ target, duration, start }: { target: number; duration: number; start: boolean }) {
  const [count, setCount] = useState(target)
  useEffect(() => {
    if (!start) return
    setCount(0)
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
  return <span>{count}</span>
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
      className="group relative h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(20px)',
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${trait.delay}ms`,
      }}
    >
      <div className="flex h-full flex-col rounded-xl border border-border bg-background/50 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/50 hover:-translate-y-1">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 p-2.5 text-primary ring-1 ring-primary/20 transition-colors duration-300 group-hover:bg-primary/20">
          <Icon size={20} />
        </div>

        {/* Text */}
        <h3 className="mb-1.5 text-base font-bold tracking-tight text-foreground">
          {trait.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {trait.description}
        </p>
      </div>
    </div>
  )
}

/* ── Main About Me Section ── */
export function AboutMe() {
  const heroReveal = useReveal(0.1)
  const quoteReveal = useReveal(0.2)
  const interestsReveal = useReveal(0.15)

  return (
    <section id="whoami" className="relative border-b border-border overflow-hidden">
      {/* ── Background Effects ── */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />
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
            {/* Profile Image */}
            <div className="group relative mb-8 inline-block z-[1]">
              <div className="relative overflow-hidden rounded-xl border border-border bg-background">
                <img
                  src="/images/foto-kp.png"
                  alt="Muhammad Pandji Ar Rizky Munib"
                  className="h-[280px] w-[240px] object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                {/* Name overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    @pandjirizki
                  </p>
                  <p className="text-base font-bold text-foreground">
                    Pandji Ar Rizky
                  </p>
                </div>
              </div>
              
              {/* Subtle accent frame */}
              <div className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-xl border-l border-t border-primary/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-br-xl border-b border-r border-primary/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            {/* Bio text */}
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Halo! Saya <span className="font-semibold text-foreground">Muhammad Pandji Ar Rizky Munib</span>, 
                siswa jurusan Sistem Informasi Jaringan dan Aplikasi (SIJA) di SMK Telkom Sidoarjo. Saya percaya bahwa 
                teknologi memiliki kekuatan untuk mengubah cara kita hidup dan bekerja.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Setiap baris kode yang saya tulis adalah langkah menuju mimpi membangun 
                solusi digital yang tidak hanya berfungsi, tapi juga memberikan pengalaman 
                yang bermakna bagi penggunanya.
              </p>
            </div>

            {/* Mini stats row */}
            <div className="mt-8 flex gap-6 border-t border-foreground/10 pt-6">
              {[
                { target: 8, label: 'Proyek', duration: 1500 },
                { target: 12, label: 'Teknologi', duration: 1500 },
                { target: 2, label: 'Tahun Coding', duration: 1200 },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold tracking-tight text-foreground">
                    <CountUpNumber target={stat.target} duration={stat.duration} start={heroReveal.visible} />+
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
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
              className="rounded-xl border border-border bg-background/30 p-6"
              style={{
                opacity: interestsReveal.visible ? 1 : 0,
                transform: interestsReveal.visible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms',
              }}
            >
              <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Di luar coding
              </p>
              <div className="flex flex-wrap gap-2.5">
                {interests.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.label}
                      className="group flex items-center gap-2 rounded-md border border-border bg-foreground/[0.02] px-3 py-1.5 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                    >
                      <Icon
                        size={14}
                        className="text-muted-foreground transition-colors group-hover:text-primary"
                      />
                      <span className="text-xs text-muted-foreground transition-colors group-hover:text-foreground">
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
            transform: quoteReveal.visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div className="relative overflow-hidden rounded-xl border border-border bg-background/50 p-8 md:p-12">
            {/* Sparkle accent */}
            <div className="mb-6 flex items-center gap-2">
              <Sparkles size={14} className="text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                filosofi saya
              </span>
            </div>

            <blockquote className="relative z-10 max-w-3xl">
              <p className="text-lg md:text-2xl font-medium leading-relaxed tracking-tight text-foreground/90">
                "Bagi saya, kode adalah alat ukur yang paling jujur. Di saat sistem berjalan atau gagal, ia memberikan petunjuk yang pasti. Tugas kita sebagai engineer adalah membaca petunjuk itu untuk membangun solusi."
              </p>
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Pandji Ar Rizky
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
