'use client'

import { useRef, useState, useEffect, useCallback } from 'react'

/* ── All skills in one flat array with category colors ── */
const allSkills = [
  { label: 'React', color: '#61dafb' },
  { label: 'Next.js', color: '#ffffff' },
  { label: 'TypeScript', color: '#3178c6' },
  { label: 'Tailwind CSS', color: '#38bdf8' },
  { label: 'HTML5 / CSS3', color: '#e34f26' },
  { label: 'Node.js', color: '#68a063' },
  { label: 'Express', color: '#eeeeee' },
  { label: 'Laravel / PHP', color: '#ff2d20' },
  { label: 'MySQL', color: '#00758f' },
  { label: 'REST API', color: '#f59e0b' },
  { label: 'Git & GitHub', color: '#f05033' },
  { label: 'VS Code', color: '#007acc' },
  { label: 'Figma', color: '#a259ff' },
  { label: 'Linux', color: '#fcc624' },
  { label: 'Vercel', color: '#ffffff' },
  { label: 'Docker', color: '#2496ed' },
  { label: 'Nginx', color: '#009639' },
  { label: 'Cloudflare', color: '#f48120' },
  { label: 'Python', color: '#3776ab' },
  { label: 'Redis', color: '#dc382d' },
]

const ribbonItems1 = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5 / CSS3',
  'Node.js', 'Express', 'Laravel / PHP', 'MySQL', 'REST API',
]

const ribbonItems2 = [
  'Git & GitHub', 'VS Code', 'Figma', 'Linux', 'Vercel',
  'SMK Telkom Sidoarjo (2024 – 2028)', 'Software Engineering / RPL', 'Web Development',
]

/* ── Physics body for each skill tag ── */
interface Body {
  x: number
  y: number
  vx: number
  vy: number
  w: number
  h: number
  label: string
  color: string
}

/* ── Interactive Skill Playground ── */
function SkillPlayground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bodiesRef = useRef<Body[]>([])
  const rafRef = useRef<number>(0)
  const dragRef = useRef<{ idx: number; offX: number; offY: number } | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const [ready, setReady] = useState(false)

  // Measure text widths and init bodies
  const initBodies = useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const rect = container.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const ctx = canvas.getContext('2d')!
    ctx.scale(dpr, dpr)
    ctx.font = 'bold 12px "JetBrains Mono", monospace'

    const W = rect.width
    const H = rect.height
    const padX = 20
    const padY = 10

    const bodies: Body[] = allSkills.map((skill) => {
      const metrics = ctx.measureText(skill.label)
      const w = metrics.width + padX * 2
      const h = 14 + padY * 2
      return {
        x: Math.random() * (W - w - 20) + 10,
        y: Math.random() * (H - h - 20) + 10,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        w,
        h,
        label: skill.label,
        color: skill.color,
      }
    })

    bodiesRef.current = bodies
    setReady(true)
  }, [])

  // Physics loop
  useEffect(() => {
    if (!ready) return
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')!
    const dpr = window.devicePixelRatio || 1

    const tick = () => {
      const rect = container.getBoundingClientRect()
      const W = rect.width
      const H = rect.height

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)

      const bodies = bodiesRef.current
      const drag = dragRef.current
      const mouse = mouseRef.current

      // Update physics
      for (let i = 0; i < bodies.length; i++) {
        const b = bodies[i]

        if (drag && drag.idx === i) {
          // Dragged body follows mouse
          const targetX = mouse.x - drag.offX
          const targetY = mouse.y - drag.offY
          b.vx = (targetX - b.x) * 0.3
          b.vy = (targetY - b.y) * 0.3
          b.x = targetX
          b.y = targetY
        } else {
          // Apply friction
          b.vx *= 0.985
          b.vy *= 0.985

          // Mouse repulsion (when not dragging anything)
          if (mouse.active && !drag) {
            const cx = b.x + b.w / 2
            const cy = b.y + b.h / 2
            const dx = cx - mouse.x
            const dy = cy - mouse.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120 * 0.8
              b.vx += (dx / dist) * force
              b.vy += (dy / dist) * force
            }
          }

          b.x += b.vx
          b.y += b.vy
        }

        // Wall bounce
        if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * 0.6 }
        if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * 0.6 }
        if (b.x + b.w > W) { b.x = W - b.w; b.vx = -Math.abs(b.vx) * 0.6 }
        if (b.y + b.h > H) { b.y = H - b.h; b.vy = -Math.abs(b.vy) * 0.6 }

        // Body-body collision (simple AABB push)
        for (let j = i + 1; j < bodies.length; j++) {
          const o = bodies[j]
          const overlapX = Math.min(b.x + b.w, o.x + o.w) - Math.max(b.x, o.x)
          const overlapY = Math.min(b.y + b.h, o.y + o.h) - Math.max(b.y, o.y)
          if (overlapX > 0 && overlapY > 0) {
            const pushX = overlapX * 0.5
            const pushY = overlapY * 0.5
            if (overlapX < overlapY) {
              const dir = b.x + b.w / 2 < o.x + o.w / 2 ? -1 : 1
              b.x += dir * pushX
              o.x -= dir * pushX
              b.vx += dir * 0.3
              o.vx -= dir * 0.3
            } else {
              const dir = b.y + b.h / 2 < o.y + o.h / 2 ? -1 : 1
              b.y += dir * pushY
              o.y -= dir * pushY
              b.vy += dir * 0.3
              o.vy -= dir * 0.3
            }
          }
        }
      }

      // Draw
      for (const b of bodies) {
        const isBeingDragged = drag && bodies[drag.idx] === b
        const isHovered = !drag && mouse.active && mouse.x >= b.x && mouse.x <= b.x + b.w && mouse.y >= b.y && mouse.y <= b.y + b.h

        // Shadow
        if (isBeingDragged) {
          ctx.shadowColor = b.color + '80'
          ctx.shadowBlur = 20
          ctx.shadowOffsetY = 4
        }

        // Background
        ctx.fillStyle = isBeingDragged
          ? b.color + '35'
          : isHovered
            ? b.color + '25'
            : 'rgba(255,255,255,0.04)'
        ctx.strokeStyle = isBeingDragged
          ? b.color
          : isHovered
            ? b.color + 'aa'
            : 'rgba(255,255,255,0.12)'
        ctx.lineWidth = isBeingDragged ? 1.5 : 1

        const r = 8
        ctx.beginPath()
        ctx.roundRect(b.x, b.y, b.w, b.h, r)
        ctx.fill()
        ctx.stroke()

        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Text
        ctx.fillStyle = isBeingDragged || isHovered ? b.color : 'rgba(255,255,255,0.75)'
        ctx.font = 'bold 12px "JetBrains Mono", monospace'
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2 + 1)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [ready])

  // Mouse handlers
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const getPos = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onDown = (e: MouseEvent) => {
      const pos = getPos(e)
      const bodies = bodiesRef.current
      // Find topmost body under cursor (reverse order = on top)
      for (let i = bodies.length - 1; i >= 0; i--) {
        const b = bodies[i]
        if (pos.x >= b.x && pos.x <= b.x + b.w && pos.y >= b.y && pos.y <= b.y + b.h) {
          dragRef.current = { idx: i, offX: pos.x - b.x, offY: pos.y - b.y }
          // Move to end of array (top z-order)
          const [body] = bodies.splice(i, 1)
          bodies.push(body)
          dragRef.current.idx = bodies.length - 1
          break
        }
      }
      mouseRef.current = { ...pos, active: true }
    }

    const onMove = (e: MouseEvent) => {
      const pos = getPos(e)
      mouseRef.current = { ...pos, active: true }

      // Change cursor
      const bodies = bodiesRef.current
      let overBody = false
      for (const b of bodies) {
        if (pos.x >= b.x && pos.x <= b.x + b.w && pos.y >= b.y && pos.y <= b.y + b.h) {
          overBody = true
          break
        }
      }
      container.style.cursor = dragRef.current ? 'grabbing' : overBody ? 'grab' : 'default'
    }

    const onUp = () => {
      if (dragRef.current) {
        const b = bodiesRef.current[dragRef.current.idx]
        // Give a little velocity on release
        b.vx *= 1.5
        b.vy *= 1.5
      }
      dragRef.current = null
    }

    const onLeave = () => {
      mouseRef.current.active = false
      dragRef.current = null
      container.style.cursor = 'default'
    }

    container.addEventListener('mousedown', onDown)
    container.addEventListener('mousemove', onMove)
    container.addEventListener('mouseup', onUp)
    container.addEventListener('mouseleave', onLeave)
    return () => {
      container.removeEventListener('mousedown', onDown)
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseup', onUp)
      container.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  // Init + resize
  useEffect(() => {
    initBodies()
    const onResize = () => {
      const canvas = canvasRef.current
      const container = containerRef.current
      if (!canvas || !container) return
      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      // Clamp bodies to new size
      for (const b of bodiesRef.current) {
        if (b.x + b.w > rect.width) b.x = rect.width - b.w
        if (b.y + b.h > rect.height) b.y = rect.height - b.h
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [initBodies])

  return (
    <div ref={containerRef} className="relative w-full h-[320px] md:h-[360px] rounded-2xl border border-white/8 bg-zinc-950/80 overflow-hidden select-none">
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/40 rounded-tl-2xl pointer-events-none z-10" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/40 rounded-br-2xl pointer-events-none z-10" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Label */}
      <div className="absolute top-3 left-4 z-20 flex items-center gap-2 pointer-events-none">
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">Drag & play — interactive skills</span>
      </div>

      {/* Skill count */}
      <div className="absolute top-3 right-4 z-20 pointer-events-none">
        <span className="font-mono text-[10px] text-zinc-600">{allSkills.length} SKILLS</span>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="border-b border-border overflow-hidden w-full">
      {/* Upper About Content */}
      <div className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28 md:pb-16">
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
              Perjalanan teknologi saya dimulai pada tahun 2024 saat saya mulai menempuh pendidikan di <span className="font-semibold text-foreground">SMK Telkom Sidoarjo</span>. Berfokus pada pengembangan perangkat lunak, pemrograman web, dan teknologi digital, saya berkomitmen untuk terus belajar hingga target kelulusan pada tahun 2028.
            </p>
            <p>
              Sebagai siswa di SMK Telkom Sidoarjo, saya aktif mengembangkan berbagai proyek web, mengasah keterampilan logika pemrograman, serta membangun aplikasi modern yang efisien dan bermanfaat.
            </p>
          </div>
        </div>

        {/* Interactive Skill Playground */}
        <div className="mt-16 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap">Tech Arsenal</span>
            <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
          </div>
          <SkillPlayground />
        </div>
      </div>

      {/* FULL WIDTH Orange Angled Ribbon Marquee (100% Screen Edge-to-Edge) */}
      <div className="relative w-full overflow-hidden py-10 my-4">
        {/* Top Angled Ribbon */}
        <div className="relative z-10 -rotate-2 transform bg-[#ff5500] py-3.5 shadow-lg border-y border-white/20 w-[110%] -left-[5%]">
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
        <div className="relative z-20 -mt-7 rotate-2 transform bg-[#ff6b00] py-3.5 shadow-2xl border-y border-white/20 w-[110%] -left-[5%]">
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
    </section>
  )
}
