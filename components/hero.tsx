import { ArrowRight } from 'lucide-react'
import { Lanyard } from '@/components/lanyard'
import { AnimatedGreeting } from '@/components/animated-greeting'

export function Hero() {
  return (
    <section id="top" className="relative border-b border-border overflow-visible">

      {/* ── Minimalist Tech Background ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Subtle top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        
        {/* Faint ambient glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-32 rounded-full bg-primary/5 blur-3xl" />

        {/* Vignette gradients */}
        <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* 2-column layout: LEFT text | RIGHT lanyard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-20 sm:pt-24 md:pt-28">

          {/* ── LEFT: all text content ── */}
          <div className="flex flex-col justify-center gap-5 sm:gap-6 pb-8 md:pb-16 pt-4 md:pt-0">

            {/* Hi I'm + name */}
            <div>
              <AnimatedGreeting />
              <h1 className="font-black leading-[0.95] tracking-tighter">
                <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-foreground/90">
                  Muhammad Pandji{' '}
                </span>
                <span className="block text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl text-primary italic mt-1 sm:mt-0">
                  Ar Rizky Munib
                </span>
              </h1>
            </div>

            {/* Role & Status Badge */}
            <div className="mt-1 inline-flex self-start items-center gap-2 rounded-full border border-border bg-background/50 px-3.5 py-1.5 text-[10px] sm:text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              <span>Available <span className="hidden sm:inline">for Work</span></span>
              <span className="mx-1 text-border">|</span>
              <span className="text-foreground">Software Dev</span>
            </div>

            {/* Description + CTA */}
            <div className="flex flex-col gap-5 mt-2">
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-[420px]">
                Siswa SMK Telkom Sidoarjo jurusan SIJA. Spesialisasi saya ada pada arsitektur Cloud, DevOps, dan web development—membangun infrastruktur yang andal dan aplikasi yang mengatasi tantangan riil.
              </p>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 self-start rounded-full bg-primary px-5 py-3 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
              >
                View Projects
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
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
        <div className="border-t border-border py-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            {[
              { value: '2024', label: 'Perjalanan Dimulai' },
              { value: '2028', label: 'Target Kelulusan' },
              { value: '15+', label: 'Teknologi Dikuasai' },
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
