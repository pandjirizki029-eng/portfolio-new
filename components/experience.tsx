'use client'

import { useEffect, useRef, useState } from 'react'
import {
  GraduationCap,
  BookOpen,
  Laptop,
  Code2,
  Paperclip,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'

/* ── Data ── */
const journeyData = [
  {
    id: 'sd',
    level: 'SD',
    institution: 'SDN Wonorejo 1',
    period: '2012 — 2018',
    Icon: GraduationCap,
    description:
      'Fondasi awal perjalanan belajar. Di sinilah rasa ingin tahu tumbuh — membaca, berhitung, dan mengenal komputer pertama kali.',
    highlight: 'Dasar Pemikiran & Logika',
    tag: '#AwalPerjalanan',
    rotation: '-3.5deg',
    offsetY: 'md:mt-0',
    color: 'from-primary/20 to-primary/10',
    accentColor: 'text-primary',
    borderColor: 'border-primary/30',
    clipRotation: 'rotate-[-12deg]',
    delay: 0,
  },
  {
    id: 'smp',
    level: 'SMP',
    institution: 'SMP GIKI 2 Surabaya',
    period: '2018 — 2021',
    Icon: BookOpen,
    description:
      'Masa transisi penuh eksplorasi. Mulai memahami logika dasar komputer, matematika, dan makin tertarik dengan dunia teknologi digital.',
    highlight: 'Eksplorasi Dunia Digital',
    tag: '#FaseEksplorasi',
    rotation: '4deg',
    offsetY: 'md:mt-16',
    color: 'from-primary/20 to-primary/10',
    accentColor: 'text-primary',
    borderColor: 'border-primary/30',
    clipRotation: 'rotate-[15deg]',
    delay: 150,
  },
  {
    id: 'smk',
    level: 'SMK',
    institution: 'SMK Telkom',
    period: '2024 — 2028 (Target)',
    Icon: Laptop,
    description:
      'Menempuh kejuruan Rekayasa Perangkat Lunak. Mendalami web programming, database, arsitektur software, dan proyek tim secara intensif.',
    highlight: 'Rekayasa Perangkat Lunak',
    tag: '#SoftwareEng',
    rotation: '-2.5deg',
    offsetY: 'md:mt-4',
    color: 'from-primary/20 to-primary/10',
    accentColor: 'text-primary',
    borderColor: 'border-primary/30',
    clipRotation: 'rotate-[-8deg]',
    delay: 300,
  },
  {
    id: 'dev',
    level: 'DEV',
    institution: 'Proyek & Eksplorasi Mandiri',
    period: '2024 — Sekarang',
    Icon: Code2,
    description:
      'Pengembangan full-stack mandiri dengan Next.js, React, Tailwind CSS, Laravel, Nginx & Docker. Belajar dan membangun setiap hari.',
    highlight: 'Full-Stack & DevOps',
    tag: '#Autodidaktik',
    rotation: '5deg',
    offsetY: 'md:mt-20',
    color: 'from-primary/25 to-primary/10',
    accentColor: 'text-primary',
    borderColor: 'border-primary/40',
    clipRotation: 'rotate-[20deg]',
    delay: 450,
  },
]

/* ── Single Polaroid-Style Card Component ── */
function PolaroidCard({ item }: { item: (typeof journeyData)[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const { Icon } = item

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
        else setVisible(false)
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative ${item.offsetY} transition-all duration-700 ease-out`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `rotate(${item.rotation}) translateY(0px) scale(1)`
          : `rotate(${item.rotation}) translateY(40px) scale(0.92)`,
        transitionDelay: `${item.delay}ms`,
      }}
    >
      {/* Metallic Paperclip Accent */}
      <div
        className={`absolute -top-3.5 left-6 z-30 text-muted-foreground/80 drop-shadow-md ${item.clipRotation}`}
      >
        <Paperclip size={24} strokeWidth={2.2} />
      </div>

      {/* Polaroid Card Wrapper */}
      <div className="group relative rounded-xl border border-border bg-card/90 p-5 pb-6 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:z-40 hover:scale-[1.04] hover:shadow-[0_20px_45px_rgba(var(--primary-rgb),0.25)] hover:border-primary/50">
        
        {/* Top Header Label */}
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-muted/80 border ${item.borderColor} ${item.accentColor}`}>
              <Icon size={18} />
            </div>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                {item.level}
              </span>
              <p className="font-mono text-[10px] text-muted-foreground">
                {item.period}
              </p>
            </div>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {item.tag}
          </span>
        </div>

        {/* Institution Title */}
        <h3 className="mb-2 text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
          <span>{item.institution}</span>
          <ArrowUpRight size={16} className="opacity-0 transition-opacity group-hover:opacity-100 text-primary" />
        </h3>

        {/* Story Description */}
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Polaroid Footer Badge */}
        <div className={`mt-auto flex items-center justify-between rounded-md bg-gradient-to-r ${item.color} px-3 py-1.5 border ${item.borderColor}`}>
          <span className={`font-mono text-[11px] font-semibold ${item.accentColor}`}>
            {item.highlight}
          </span>
          <Sparkles size={12} className={item.accentColor} />
        </div>
      </div>
    </div>
  )
}

/* ── Main Section ── */
export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lineVisible, setLineVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLineVisible(true)
        else setLineVisible(false)
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="relative border-b border-border overflow-hidden bg-background py-24 md:py-32">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            02 — Education &amp; Journey
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Pendidikan &amp; Perjalanan.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Jejak perjalanan pendidikan dan pengembangan diri dari bangku sekolah dasar hingga menjadi developer.
          </p>
        </div>

        {/* Scrapbook Collage Area */}
        <div ref={containerRef} className="relative min-h-[500px]">
          {/* Animated Connecting Winding Line (SVG Path) */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none z-0 hidden md:block"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 140,90 C 260,180 320,100 420,240 C 520,380 620,120 720,170 C 800,210 880,300 920,360"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeDasharray="12 8"
              strokeLinecap="round"
              className="text-primary opacity-70 transition-all duration-1000"
              style={{
                strokeDashoffset: lineVisible ? 0 : 1000,
                transition: 'stroke-dashoffset 2s ease-in-out',
              }}
            />
          </svg>

          {/* Cards Grid — Offset Scrapbook Layout */}
          <div className="relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {journeyData.map((item) => (
              <PolaroidCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
