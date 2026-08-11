import { ArrowRight } from 'lucide-react'
import { Lanyard } from '@/components/lanyard'

export function Hero() {
  return (
    <section id="top" className="relative border-b border-border overflow-visible">

      {/* ── Minimalist Tech Background ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Subtle top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Faint ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-32 rounded-full bg-primary/5 blur-3xl" />
        
        {/* Sleek Top Background Typography (Faint Watermark) */}
        <div className="absolute top-8 sm:top-10 left-0 right-0 flex justify-center items-center pointer-events-none px-4 z-0 opacity-20">
          <h2 className="flex items-center justify-center font-mono font-bold tracking-widest text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[48px] select-none text-white/10 uppercase">
            Think <span className="mx-4 text-primary/30">/</span> Code <span className="mx-4 text-primary/30">/</span> Deploy
          </h2>
        </div>

        {/* Vignette gradients */}
        <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* 2-column layout: LEFT text | RIGHT lanyard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-20 sm:pt-24 md:pt-28">

          {/* ── LEFT: all text content ── */}
          <div className="flex flex-col justify-center gap-6 pb-10 md:pb-16">

            {/* Hi I'm + name */}
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-primary">
                Hi, I&apos;m
              </p>
              <h1 className="font-black leading-[0.88] tracking-tighter">
                <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-foreground/90">
                  Muhammad Pandji{' '}
                </span>
                <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-primary italic">
                  Ar Rizky Munib
                </span>
              </h1>
            </div>

            {/* Open for collab badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-background/70 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Open for Collaboration
            </div>

            {/* Education card */}
            <div className="rounded-xl border border-white/10 bg-background/50 p-4 backdrop-blur-sm self-start">
              <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Pendidikan</p>
              <p className="text-sm font-bold text-foreground">SMK Telkom</p>
              <p className="font-mono text-xs font-semibold text-primary">2024 — 2028</p>
            </div>

            {/* Role */}
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Software Developer · Rekayasa Perangkat Lunak
            </p>

            {/* Description + CTA */}
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-muted-foreground max-w-[340px]">
                Siswa SMK Telkom Sidoarjo jurusan SIJA. Spesialisasi saya ada pada arsitektur Cloud, DevOps, dan web development—membangun infrastruktur yang andal dan aplikasi yang mengatasi tantangan riil.
              </p>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 self-start rounded-full bg-primary px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,85,0,0.4)]"
              >
                View Projects
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          {/* ── RIGHT: Lanyard ── */}
          <div className="flex justify-center items-start pt-4">
            <div className="w-full max-w-[320px]">
              <Lanyard />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/10 py-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            {[
              { value: '2024', label: 'Perjalanan Dimulai' },
              { value: '2028', label: 'Target Kelulusan' },
              { value: 'SMK Telkom', label: 'Institusi' },
              { value: '8+', label: 'Proyek Dikerjakan' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
