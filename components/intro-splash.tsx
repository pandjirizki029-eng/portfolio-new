'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

/* ── Character set for the scramble effect ── */
const GLITCH_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*!?<>{}[]'

const TARGET_WORD = 'YOKOSO'
const SUBTITLE = 'ようこそ'

/* ── Single letter scramble component ── */
function ScrambleLetter({
  targetChar,
  delay,
  onResolved,
}: {
  targetChar: string
  delay: number
  onResolved: () => void
}) {
  const [display, setDisplay] = useState(' ')
  const [resolved, setResolved] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      // Start scrambling
      let iterations = 0
      const maxIterations = 8 + Math.floor(Math.random() * 6) // 8-13 iterations
      const speed = 60 + Math.random() * 40 // 60-100ms per cycle

      intervalRef.current = setInterval(() => {
        if (iterations >= maxIterations) {
          // Resolve to the target character
          setDisplay(targetChar)
          setResolved(true)
          onResolved()
          if (intervalRef.current) clearInterval(intervalRef.current)
          return
        }
        // Show random glitch character
        setDisplay(GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
        iterations++
      }, speed)
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [targetChar, delay, onResolved])

  return (
    <span
      className={`inline-block w-[0.85em] text-center transition-all duration-300 ${
        resolved
          ? 'text-white scale-110'
          : 'text-primary/80 scale-100'
      }`}
      style={{
        textShadow: resolved
          ? '0 0 30px rgba(255,85,0,0.6), 0 0 60px rgba(255,85,0,0.3), 0 0 120px rgba(255,85,0,0.1)'
          : '0 0 8px rgba(255,85,0,0.3)',
      }}
    >
      {display}
    </span>
  )
}

/* ── Main Intro Splash Screen ── */
export function IntroSplash({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'scramble' | 'hold' | 'fadeout' | 'done'>('scramble')
  const [resolvedCount, setResolvedCount] = useState(0)
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showLine, setShowLine] = useState(false)
  const [showParticles, setShowParticles] = useState(true)

  const handleLetterResolved = useCallback(() => {
    setResolvedCount((prev) => prev + 1)
  }, [])

  // When all letters resolve, move to hold phase
  useEffect(() => {
    if (resolvedCount >= TARGET_WORD.length && phase === 'scramble') {
      setPhase('hold')
      // Show decorative elements
      setTimeout(() => setShowLine(true), 200)
      setTimeout(() => setShowSubtitle(true), 500)
      // Start fadeout after hold
      setTimeout(() => {
        setPhase('fadeout')
        setShowParticles(false)
      }, 2200)
      // Complete after fade animation
      setTimeout(() => {
        setPhase('done')
        onComplete()
      }, 3200)
    }
  }, [resolvedCount, phase, onComplete])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-1000 ${
        phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ cursor: 'none' }}
    >
      {/* Background subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9IjEiLz48L3N2Zz4=')]" />

      {/* Ambient glow behind text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[400px] rounded-full bg-primary/5 blur-[100px] animate-pulse" />

      {/* Floating particles (deterministic positions to avoid hydration mismatch) */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[
            { x: 12, y: 8, d: 5.2, dl: 0.3 }, { x: 85, y: 22, d: 6.1, dl: 1.2 },
            { x: 45, y: 65, d: 4.8, dl: 2.1 }, { x: 8, y: 78, d: 7.3, dl: 0.7 },
            { x: 92, y: 45, d: 5.5, dl: 1.8 }, { x: 33, y: 12, d: 6.7, dl: 0.1 },
            { x: 67, y: 88, d: 4.2, dl: 2.5 }, { x: 20, y: 55, d: 7.8, dl: 0.9 },
            { x: 78, y: 33, d: 5.9, dl: 1.5 }, { x: 55, y: 72, d: 6.4, dl: 0.4 },
            { x: 40, y: 18, d: 3.8, dl: 2.8 }, { x: 72, y: 60, d: 7.1, dl: 1.1 },
            { x: 15, y: 40, d: 5.6, dl: 0.6 }, { x: 88, y: 75, d: 4.5, dl: 2.3 },
            { x: 50, y: 5, d: 6.9, dl: 1.7 }, { x: 25, y: 92, d: 5.3, dl: 0.2 },
            { x: 60, y: 28, d: 7.5, dl: 2.6 }, { x: 95, y: 15, d: 4.1, dl: 1.4 },
            { x: 38, y: 82, d: 6.2, dl: 0.8 }, { x: 75, y: 50, d: 5.7, dl: 2.0 },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute h-[2px] w-[2px] rounded-full bg-primary/40"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                animation: `introParticle ${p.d}s ease-in-out ${p.dl}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Scan lines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Top decorative line */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-700 ${
            showLine ? 'w-48 opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* Main scramble text */}
        <div className="flex items-center gap-1">
          {TARGET_WORD.split('').map((char, index) => (
            <span
              key={index}
              className="font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.15em] uppercase"
              style={{ lineHeight: 1 }}
            >
              <ScrambleLetter
                targetChar={char}
                delay={300 + index * 180}
                onResolved={handleLetterResolved}
              />
            </span>
          ))}
        </div>

        {/* Subtitle (Japanese) */}
        <div
          className={`transition-all duration-700 ${
            showSubtitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          }`}
        >
          <p className="font-mono text-sm sm:text-base tracking-[0.5em] text-primary/60 uppercase">
            {SUBTITLE}
          </p>
        </div>

        {/* Bottom decorative line */}
        <div
          className={`h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent transition-all duration-700 delay-100 ${
            showLine ? 'w-32 opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* "Press any key" / skip hint (appears after text resolves) */}
        <div
          className={`absolute -bottom-20 transition-all duration-500 ${
            showSubtitle
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-zinc-600 uppercase animate-pulse">
            loading...
          </p>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l border-t border-primary/20" />
      <div className="absolute top-6 right-6 w-8 h-8 border-r border-t border-primary/20" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l border-b border-primary/20" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r border-b border-primary/20" />

      {/* Bottom build tag */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <p className="font-mono text-[9px] tracking-widest text-zinc-700 uppercase">
          pandji.dev // v2.0
        </p>
      </div>
    </div>
  )
}
