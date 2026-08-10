'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Terminal,
  Shield,
  Cloud,
  Server,
  HardDrive,
  Network,
  Lock,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Workflow,
  Container,
  ShieldCheck,
  Zap,
  GitBranch,
  Eye,
  Rocket,
  CircleCheck,
} from 'lucide-react'

/* ── Code snippets for the animated terminal blocks ── */
const codeBlocks = [
  {
    id: 'nginx',
    filename: 'nginx.conf',
    lang: 'nginx',
    lines: [
      { num: 1, text: 'server {', color: 'text-purple-400' },
      { num: 2, text: '    listen 443 ssl http2;', color: 'text-sky-300' },
      { num: 3, text: '    server_name api.pandji.dev;', color: 'text-orange-400' },
      { num: 4, text: '', color: '' },
      { num: 5, text: '    ssl_certificate /etc/letsencrypt/live/pandji.dev/fullchain.pem;', color: 'text-amber-300' },
      { num: 6, text: '    ssl_certificate_key /etc/letsencrypt/live/pandji.dev/privkey.pem;', color: 'text-amber-300' },
      { num: 7, text: '', color: '' },
      { num: 8, text: '    location / {', color: 'text-purple-400' },
      { num: 9, text: '        proxy_pass http://localhost:3000;', color: 'text-sky-300' },
      { num: 10, text: '        proxy_set_header Host $host;', color: 'text-sky-300' },
      { num: 11, text: '    }', color: 'text-purple-400' },
      { num: 12, text: '}', color: 'text-purple-400' },
    ],
  },
  {
    id: 'docker',
    filename: 'Dockerfile',
    lang: 'dockerfile',
    lines: [
      { num: 1, text: 'FROM node:20-alpine AS builder', color: 'text-sky-400' },
      { num: 2, text: 'WORKDIR /app', color: 'text-orange-400' },
      { num: 3, text: 'COPY package*.json ./', color: 'text-amber-300' },
      { num: 4, text: 'RUN npm ci --only=production', color: 'text-rose-400' },
      { num: 5, text: '', color: '' },
      { num: 6, text: 'FROM node:20-alpine AS runtime', color: 'text-sky-400' },
      { num: 7, text: 'COPY --from=builder /app/node_modules ./node_modules', color: 'text-amber-300' },
      { num: 8, text: 'COPY . .', color: 'text-amber-300' },
      { num: 9, text: 'EXPOSE 3000', color: 'text-purple-400' },
      { num: 10, text: 'CMD ["node", "server.js"]', color: 'text-orange-400' },
    ],
  },
  {
    id: 'bash',
    filename: 'deploy.sh',
    lang: 'bash',
    lines: [
      { num: 1, text: '#!/bin/bash', color: 'text-zinc-500' },
      { num: 2, text: 'set -euo pipefail', color: 'text-rose-400' },
      { num: 3, text: '', color: '' },
      { num: 4, text: 'echo "[deploy] Deploying to production..."', color: 'text-orange-400' },
      { num: 5, text: 'docker compose -f docker-compose.prod.yml up -d --build', color: 'text-sky-300' },
      { num: 6, text: 'sudo systemctl reload nginx', color: 'text-sky-300' },
      { num: 7, text: 'sudo certbot renew --quiet', color: 'text-amber-300' },
      { num: 8, text: 'echo "[done] Deployment complete!"', color: 'text-orange-400' },
    ],
  },
]

/* ── Security scan results ── */
const scanResults = [
  {
    id: 's1',
    severity: 'passed' as const,
    title: 'SSL/TLS Configuration',
    detail: 'TLS 1.3 enabled with strong cipher suites.',
    icon: ShieldCheck,
  },
  {
    id: 's2',
    severity: 'warning' as const,
    title: 'Open Port Detection',
    detail: 'Port 22 (SSH) exposed — key-based auth enforced.',
    icon: AlertTriangle,
  },
  {
    id: 's3',
    severity: 'passed' as const,
    title: 'Container Image Scan',
    detail: '0 critical vulnerabilities found in base image.',
    icon: CheckCircle2,
  },
  {
    id: 's4',
    severity: 'passed' as const,
    title: 'Firewall Rules (UFW)',
    detail: 'Only ports 80, 443, 22 allowed. Default deny policy.',
    icon: Shield,
  },
]

/* ── Infrastructure skill cards ── */
const infraSkills = [
  { label: 'Linux Administration', desc: 'Ubuntu/Debian server management, systemd, cron, user permissions', icon: Terminal, color: '#ff5500' },
  { label: 'Docker & Containers', desc: 'Multi-stage builds, docker-compose, container orchestration', icon: Container, color: '#ff6b00' },
  { label: 'Nginx Reverse Proxy', desc: 'Load balancing, SSL termination, virtual hosts, caching', icon: Server, color: '#ff5500' },
  { label: 'Cloud VPS Deployment', desc: 'DigitalOcean, cloud-init, SSH hardening, monitoring', icon: Cloud, color: '#ff6b00' },
  { label: 'CI/CD Pipelines', desc: 'GitHub Actions, automated testing, zero-downtime deploys', icon: GitBranch, color: '#ff5500' },
  { label: 'Network & Security', desc: 'UFW firewall, Certbot SSL, fail2ban, SSH key management', icon: Lock, color: '#ff6b00' },
]

/* ── Animated typing line ── */
function TerminalTyping() {
  const commands = [
    '$ ssh deploy@pandji.dev',
    '$ sudo systemctl status nginx',
    '$ docker ps --format "table {{.Names}}\\t{{.Status}}"',
    '$ tail -f /var/log/nginx/access.log',
    '$ certbot certificates',
    '$ ufw status verbose',
  ]
  const [cmdIndex, setCmdIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const cmd = commands[cmdIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (charIndex < cmd.length) {
            setCharIndex((c) => c + 1)
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (charIndex > 0) {
            setCharIndex((c) => c - 1)
          } else {
            setIsDeleting(false)
            setCmdIndex((i) => (i + 1) % commands.length)
          }
        }
      },
      isDeleting ? 25 : 55,
    )
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, cmdIndex, commands])

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-primary">
      <span>{commands[cmdIndex].slice(0, charIndex)}</span>
      <span className="inline-block w-2.5 h-5 bg-primary animate-pulse" />
    </div>
  )
}

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Code Block Component (GitHub-style) ── */
function CodeBlock({ block, delay }: { block: (typeof codeBlocks)[0]; delay: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* File tab */}
      <div className="flex items-center gap-2 rounded-t-lg border border-b-0 border-white/10 bg-zinc-800/90 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 font-mono text-xs text-zinc-400">{block.filename}</span>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-zinc-600">{block.lang}</span>
      </div>
      {/* Code lines */}
      <div className="overflow-hidden rounded-b-lg border border-white/10 bg-[#0d1117]">
        {block.lines.map((line) => (
          <div key={line.num} className="flex items-center hover:bg-white/[0.03] transition-colors">
            <span className="w-10 shrink-0 select-none border-r border-white/5 py-0.5 text-right font-mono text-[11px] text-zinc-600 pr-2">
              {line.num}
            </span>
            <pre className={`py-0.5 pl-4 font-mono text-[12px] md:text-[13px] ${line.color || 'text-zinc-500'}`}>
              {line.text}
            </pre>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Security Alert Component (GitHub-style) ── */
function SecurityAlert({ item, delay }: { item: (typeof scanResults)[0]; delay: number }) {
  const { ref, visible } = useReveal()
  const Icon = item.icon
  const isPassed = item.severity === 'passed'

  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className={`flex items-start gap-3 rounded-lg border px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${
          isPassed
            ? 'border-primary/20 bg-primary/5 hover:border-primary/40'
            : 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40'
        }`}
      >
        <Icon size={18} className={`mt-0.5 shrink-0 ${isPassed ? 'text-primary' : 'text-amber-400'}`} />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-white">{item.title}</span>
            <span
              className={`rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                isPassed ? 'bg-primary/20 text-primary' : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {item.severity}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-zinc-400">{item.detail}</p>
        </div>
      </div>
    </div>
  )
}

/* ── Main Section ── */
export function LinuxCloud() {
  const { ref: headerRef, visible: headerVisible } = useReveal(0.2)

  return (
    <section id="linux-cloud" className="relative border-b border-border overflow-hidden bg-zinc-950 py-24 md:py-32">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-primary/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="mb-16 md:mb-20 transition-all duration-700"
          style={{ opacity: headerVisible ? 1 : 0, transform: headerVisible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10">
            <Terminal size={13} />
            Infrastructure &amp; DevOps
          </div>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
            Linux &amp; Cloud <span className="text-primary">Infrastructure.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">
            Dari konfigurasi server Linux, deployment containerized apps dengan Docker, hingga setup reverse proxy Nginx
            dan pipeline CI/CD — fondasi infrastruktur modern yang reliable dan secure.
          </p>
        </div>

        {/* Live Terminal Bar */}
        <div className="mb-12 rounded-xl border border-white/10 bg-[#0d1117] p-4 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
            </div>
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">pandji@cloud-server:~</span>
            <span className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
          <TerminalTyping />
        </div>

        {/* Two-Column Layout: Code + Security */}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] mb-16">
          {/* Left: Code blocks */}
          <div className="space-y-5">
            {codeBlocks.map((block, i) => (
              <CodeBlock key={block.id} block={block} delay={i * 150} />
            ))}
          </div>

          {/* Right: Security scan panel */}
          <div className="space-y-5">
            {/* GitHub-style scan header */}
            <div className="rounded-xl border border-white/10 bg-zinc-900/80 overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-800/60 px-4 py-3">
                <Shield size={16} className="text-primary" />
                <span className="font-mono text-xs font-bold text-white">Security Scan Results</span>
                <span className="ml-auto font-mono text-[10px] text-zinc-500">4 checks completed</span>
              </div>
              <div className="p-3 space-y-2">
                {scanResults.map((item, i) => (
                  <SecurityAlert key={item.id} item={item} delay={i * 100} />
                ))}
              </div>
              <div className="border-t border-white/10 bg-primary/5 px-4 py-2.5 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-primary" />
                <span className="font-mono text-[11px] text-primary font-semibold">All critical checks passed — infrastructure secure</span>
              </div>
            </div>

            {/* Deployment status card */}
            <div className="rounded-xl border border-white/10 bg-zinc-900/80 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Workflow size={15} className="text-primary" />
                <span className="font-mono text-xs font-bold text-white">Deployment Pipeline</span>
              </div>
              <div className="space-y-2">
                {[
                  { step: 'Build Docker Image', status: 'done', time: '42s' },
                  { step: 'Run Security Scan', status: 'done', time: '18s' },
                  { step: 'Push to Registry', status: 'done', time: '12s' },
                  { step: 'Deploy to Production', status: 'done', time: '8s' },
                  { step: 'Health Check', status: 'active', time: '...' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 font-mono text-[11px]">
                    <div
                      className={`h-4 w-4 rounded-full flex items-center justify-center ${
                        item.status === 'done'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-amber-500/20 text-amber-400 animate-pulse'
                      }`}
                    >
                      {item.status === 'done' ? (
                        <CheckCircle2 size={10} />
                      ) : (
                        <Zap size={10} />
                      )}
                    </div>
                    <span className="text-zinc-300 flex-1">{item.step}</span>
                    <span className="text-zinc-600">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Infrastructure Skill Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 whitespace-nowrap flex items-center gap-2">
              <Cpu size={12} className="text-primary" />
              Core Infrastructure Skills
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-primary/40 to-transparent" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infraSkills.map((skill, i) => {
              const Icon = skill.icon
              return (
                <InfraCard key={skill.label} skill={skill} Icon={Icon} delay={i * 80} />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfraCard({ skill, Icon, delay }: { skill: (typeof infraSkills)[0]; Icon: typeof Terminal; delay: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className="group relative rounded-xl border border-white/8 bg-zinc-900/60 p-5 transition-all duration-500 hover:border-primary/40 hover:bg-zinc-900/90 hover:shadow-[0_0_30px_rgba(255,85,0,0.1)] cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition-colors group-hover:border-primary/30"
        style={{ backgroundColor: skill.color + '15' }}
      >
        <Icon size={20} style={{ color: skill.color }} />
      </div>
      <h3 className="font-mono text-sm font-bold text-white mb-1 group-hover:text-primary transition-colors">
        {skill.label}
      </h3>
      <p className="font-mono text-[11px] leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
        {skill.desc}
      </p>
      <ChevronRight
        size={14}
        className="absolute top-5 right-4 text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 group-hover:translate-x-1"
      />
    </div>
  )
}
