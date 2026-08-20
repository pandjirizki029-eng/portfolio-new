'use client'

import { useRef, useState, useEffect } from 'react'
import { Terminal } from 'lucide-react'
import { InteractiveTerminal } from './interactive-terminal'

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function LinuxCloud() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.2)

  return (
    <section id="terminal-profile" className="relative border-b border-border overflow-hidden bg-background py-24 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-12 md:mb-16 transition-all duration-700 flex flex-col items-center text-center"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10">
            <Terminal size={13} />
            Interactive Shell
          </div>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Siapa <span className="text-primary">Aku?</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Coba ketik command di bawah ini untuk mencari tahu tentangku. (Hint: coba ketik <strong className="text-primary">whoami</strong> atau <strong className="text-primary">neofetch</strong>)
          </p>
        </div>

        {/* Interactive Terminal Gamification */}
        <div 
          className="transition-all duration-1000 delay-300"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(30px)' }}
        >
          <InteractiveTerminal />
        </div>
      </div>
    </section>
  )
}
