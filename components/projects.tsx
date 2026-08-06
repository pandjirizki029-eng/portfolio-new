'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  FolderGit2,
  Award,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react'

/* ── Data with Photo Support ── */
const projectsData = [
  {
    id: 'p1',
    category: 'WEB APP',
    title: 'ProductivityFlow Management App',
    year: '2026',
    status: 'Active',
    image: '/images/project1.png',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Kanban'],
  },
  {
    id: 'p2',
    category: '3D GRAPHICS',
    title: 'Interactive 3D Virtual Museum',
    year: '2025',
    status: 'Completed',
    image: '/images/project2.png',
    tags: ['Three.js', 'React Three Fiber', 'WebGL'],
  },
  {
    id: 'p3',
    category: 'SCHOOL PORTAL',
    title: 'SMK Telkom Student Portal',
    year: '2024',
    status: 'Completed',
    image: '/images/project1.png',
    tags: ['PHP', 'Laravel', 'MySQL', 'Tailwind'],
  },
]

const certificatesData = [
  {
    id: 'c1',
    category: 'CERTIFICATION',
    title: 'Junior Web Developer (JWD)',
    issuer: 'BNSP / Kominfo Indonesia',
    year: '2025',
    credentialId: 'CERT-BNSP-88921',
    image: '/images/cert1.png',
    tags: ['BNSP Standard', 'Frontend & Backend'],
  },
  {
    id: 'c2',
    category: 'SPECIALIZATION',
    title: 'Full-Stack JavaScript Web Developer',
    issuer: 'Dicoding Indonesia Academy',
    year: '2025',
    credentialId: 'DICODING-FS-2025-091',
    image: '/images/cert1.png',
    tags: ['React', 'Node.js', 'REST API'],
  },
  {
    id: 'c3',
    category: 'DEVOPS & CLOUD',
    title: 'Docker & Linux System Administration',
    issuer: 'SMK Telkom Competency Center',
    year: '2024',
    credentialId: 'STC-SYS-2024-114',
    image: '/images/cert1.png',
    tags: ['Docker', 'Nginx', 'Linux CLI'],
  },
]

export function Projects() {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates'>('projects')

  return (
    <section id="work" className="relative border-b border-border bg-zinc-950 py-24 md:py-32 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col items-center text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">
            03 — Portfolio Showcase
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl mb-8">
            Karya &amp; <span className="text-primary">Sertifikasi.</span>
          </h2>

          {/* Toggle Buttons */}
          <div className="inline-flex items-center rounded-full border border-white/10 bg-zinc-900/90 p-1.5 backdrop-blur-md shadow-xl">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2.5 rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-primary text-black shadow-[0_0_25px_rgba(255,85,0,0.45)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FolderGit2 size={16} />
              Projects
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex items-center gap-2.5 rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'certificates'
                  ? 'bg-primary text-black shadow-[0_0_25px_rgba(255,85,0,0.45)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Award size={16} />
              Certificate
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'projects' ? (
          /* Projects Grid with Photo Cards */
          <div className="grid gap-8 md:grid-cols-3 transition-all duration-500">
            {projectsData.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-zinc-900/90 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,85,0,0.15)]"
              >
                {/* Photo Banner Area */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

                  {/* Overlaid Category & Year Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-primary border border-primary/30">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6 pt-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors mb-3 leading-snug">
                      {item.title}
                    </h3>

                    {/* Status Pill */}
                    <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 mb-5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      {item.status}
                    </div>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-4 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="flex items-center justify-between font-mono text-xs font-semibold text-primary pt-2 border-t border-white/5 group-hover:underline">
                      <span>Lihat Proyek</span>
                      <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Certificates Grid with Photo Cards */
          <div className="grid gap-8 md:grid-cols-3 transition-all duration-500">
            {certificatesData.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-zinc-900/90 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(255,85,0,0.15)]"
              >
                {/* Photo Banner Area */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />

                  {/* Overlaid Category & Year Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1">
                      <ShieldCheck size={12} />
                      {item.category}
                    </span>
                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-6 pt-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors mb-2 leading-snug">
                      {item.title}
                    </h3>

                    <p className="font-mono text-xs text-zinc-400 mb-4">
                      Penerbit: <span className="text-zinc-200 font-semibold">{item.issuer}</span>
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 border-t border-white/10 pt-4 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-zinc-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Link */}
                    <div className="flex items-center justify-between font-mono text-xs font-semibold text-amber-400 pt-2 border-t border-white/5 group-hover:underline">
                      <span>Verifikasi Sertifikat</span>
                      <ExternalLink size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
