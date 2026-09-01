'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

function NextjsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-foreground">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.88 17.58L10.74 8.79V16.8H9.36V7.2h1.32l7.14 8.79V7.2h1.38v10.38h-1.32z"/>
    </svg>
  )
}

function TypescriptIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#3178c6]">
      <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm11 15.35c0-.68.21-1.25.64-1.71.43-.46.99-.75 1.68-.87.49-.09.99-.11 1.48-.06v-1.32c-.52-.05-1.04-.04-1.56.03-.78.11-1.42.42-1.92.93-.5.51-.76 1.15-.76 1.93s.25 1.4.75 1.86c.5.46 1.13.7 1.89.72h.16c.49-.01.97-.04 1.45-.1v-1.32c-.44.06-.88.09-1.33.09-.72-.01-1.29-.22-1.7-.63-.42-.42-.62-.97-.62-1.68zm5.84-5.11h-3.9v1.27h1.27v5.69h1.36v-5.69h1.27V10.24z"/>
    </svg>
  )
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#38bdf8]">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19 12.001 19c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  )
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[#61dafb]">
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(0 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0db7ed]">
      <path d="M13.983 11.078h2.119c.102 0 .186-.083.186-.188V9.08c0-.103-.084-.186-.186-.186h-2.119c-.103 0-.186.083-.186.186v1.81c0 .105.083.188.186.188zM11.266 11.078h2.119c.102 0 .185-.083.185-.188V9.08c0-.103-.083-.186-.185-.186h-2.119c-.103 0-.186.083-.186.186v1.81c0 .105.083.188.186.188zM11.266 8.357h2.119c.102 0 .185-.083.185-.186V6.36c0-.103-.083-.186-.185-.186h-2.119c-.103 0-.186.083-.186.186v1.81c0 .103.083.186.186.186zM8.548 11.078H10.66c.103 0 .186-.083.186-.188V9.08c0-.103-.083-.186-.186-.186H8.548c-.103 0-.186.083-.186.186v1.81c0 .105.083.188.186.188zM8.548 8.357H10.66c.103 0 .186-.083.186-.186V6.36c0-.103-.083-.186-.186-.186H8.548c-.103 0-.186.083-.186.186v1.81c0 .103.083.186.186.186zM5.83 11.078h2.119c.103 0 .186-.083.186-.188V9.08c0-.103-.083-.186-.186-.186H5.83c-.103 0-.186.083-.186.186v1.81c0 .105.083.188.186.188zM2.877 13.513c-.22.083-.435.172-.647.265v.693c.27-.058.55-.101.838-.128.283-.027.575-.037.868-.03a8.924 8.924 0 0 1 2.213.376c.725.215 1.417.518 2.062.9 1.156.685 2.155 1.586 3.491 1.944.664.179 1.348.243 2.03.193.684-.049 1.36-.216 1.996-.499a8.96 8.96 0 0 0 2.235-1.506c.642-.603 1.196-1.309 1.637-2.102.46-.826.748-1.723.85-2.668.04-.373.05-.747.03-1.12h-.03a3.535 3.535 0 0 0-2.482.99c-.394.39-.687.872-.857 1.397H20.08v.002a2.385 2.385 0 0 1-.417.848c-.287.394-.67.708-1.112.91a4.966 4.966 0 0 1-2.02.433c-.768.016-1.53-.139-2.222-.455a7.172 7.172 0 0 0-2.824-.658c-.68-.009-1.355.088-2.012.288a8.87 8.87 0 0 1-2.212.378c-.73-.016-1.455-.157-2.146-.42z"/>
    </svg>
  )
}

function NginxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#009639]">
      <path d="M21.9 2.19l-.02-.02H18.9l-4.72 6.55V2.19h-3.32v13.08l4.72-6.55v6.55h3.32V2.19zm-13.8 0L3.38 8.74v6.53h3.32V8.74l4.72-6.55H8.1z"/>
    </svg>
  )
}

function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#f05032]">
      <path d="M23.546 10.93L13.07 4.54a2.222 2.222 0 0 0-2.9 0L7.45 7.26l2.96 2.96a2.235 2.235 0 0 1 2.87 0l2.5-2.5a.735.735 0 0 1 1.04 0 .735.735 0 0 1 0 1.04l-2.5 2.5a2.235 2.235 0 0 1 0 2.87l3.03 3.03c.5.5 1.34.5 1.84 0l4.3-4.3a2.22 2.22 0 0 0 0-2.89zM10.03 21.43a2.222 2.222 0 0 0 2.9 0l2.72-2.72-2.96-2.96a2.235 2.235 0 0 1-2.87 0l-2.5 2.5a.735.735 0 0 1-1.04 0 .735.735 0 0 1 0-1.04l2.5-2.5a2.235 2.235 0 0 1 0-2.87L5.79 8.78c-.5-.5-1.34-.5-1.84 0l-3.4 3.4a2.222 2.222 0 0 0 0 2.9l10.48 6.35z"/>
    </svg>
  )
}

function LaravelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#ff2d20]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
  )
}

// 8 tools with randomized elegant speeds: some slow (50s - 75s), some medium (35s - 45s)
const tools = [
  { name: 'Next.js', Icon: NextjsIcon, speed: 65 },
  { name: 'TypeScript', Icon: TypescriptIcon, speed: 45 },
  { name: 'Tailwind CSS', Icon: TailwindIcon, speed: 70 },
  { name: 'React', Icon: ReactIcon, speed: 50 },
  { name: 'Docker', Icon: DockerIcon, speed: 58 },
  { name: 'Nginx', Icon: NginxIcon, speed: 38 },
  { name: 'Git', Icon: GitIcon, speed: 75 },
  { name: 'Laravel', Icon: LaravelIcon, speed: 42 },
]

export function Lanyard() {
  const [mounted, setMounted] = useState(false)
  const radius = 135 // Orbit radius expanded to accommodate larger photo

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-[400px]" />
  }

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center select-none overflow-visible">
      {/* CSS Animations */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(var(--rotation-start)) translateZ(0); }
          to { transform: rotate(var(--rotation-end)) translateZ(0); }
        }
        @keyframes counter-orbit {
          from { transform: rotate(var(--counter-start)) translateZ(0); }
          to { transform: rotate(var(--counter-end)) translateZ(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1) translateZ(0); }
          50% { transform: scale(1.02) translateZ(0); }
        }
        .animate-orbit {
          animation-name: orbit;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .animate-counter-orbit {
          animation-name: counter-orbit;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }
        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
          will-change: transform;
        }
        /* Pauses only the hovered item's orbit and counter-orbit animations */
        .orbit-item:has(.tech-icon-trigger:hover),
        .orbit-item:has(.tech-icon-trigger:hover) .animate-counter-orbit {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Glow / Ambient background for the orbit */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-primary/[0.05] blur-[70px] pointer-events-none" />

      {/* Orbit Path Dashed Ring */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] rounded-full border border-dashed border-primary/20 pointer-events-none z-0" />

      {/* Center Profile Picture with double border (enlarged) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto">
        <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full p-1.5 bg-gradient-to-tr from-primary/80 via-primary to-primary/60 shadow-[0_0_40px_rgba(var(--primary-rgb),0.18)] animate-pulse-slow">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-card">
            <Image
              src="/images/profile2.png"
              alt="Muhammad Pandji"
              width={176}
              height={176}
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              draggable={false}
              priority
            />
          </div>
        </div>
      </div>

      {/* Independent Orbiting Tech Icons */}
      {tools.map((tool, i) => {
        const theta = i * (360 / tools.length)
        return (
          <div
            key={tool.name}
            className="orbit-item absolute left-1/2 top-1/2 w-0 h-0 z-20 animate-orbit"
            style={{
              '--rotation-start': `${theta}deg`,
              '--rotation-end': `${theta + 360}deg`,
              animationDuration: `${tool.speed}s`,
            } as React.CSSProperties}
          >
            <div
              className="absolute pointer-events-auto"
              style={{
                transform: `translate(${radius}px)`,
              }}
            >
              {/* Counter-rotating wrapper to keep icons upright */}
              <div
                className="animate-counter-orbit"
                style={{
                  '--counter-start': `${-theta}deg`,
                  '--counter-end': `${-theta - 360}deg`,
                  animationDuration: `${tool.speed}s`,
                } as React.CSSProperties}
              >
                <div
                  className="tech-icon-trigger relative flex items-center justify-center w-11 h-11 rounded-full border border-amber-500/30 bg-background shadow-[0_0_15px_rgba(245,158,11,0.06),inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-115 transition-all duration-300 group/item cursor-pointer"
                >
                  <tool.Icon />

                  {/* Tooltip */}
                  <span className="absolute -bottom-8 scale-0 transition-all rounded bg-card border border-border px-2 py-1 text-[10px] font-mono text-foreground group-hover/item:scale-100 shadow-lg pointer-events-none whitespace-nowrap z-30">
                    {tool.name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
