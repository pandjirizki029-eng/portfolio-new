'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  FolderGit2,
  Award,
  ArrowUpRight,
  ExternalLink,
  Folder,
  Layers,
  Sparkles,
  Terminal,
  Cpu,
  Globe,
  Database,
  Lock,
  ChevronLeft,
  ChevronRight,
  Eye,
  Server,
  Cloud,
  Bot,
} from 'lucide-react'
import { projectsData as sharedProjectsData } from '@/lib/projects-data'

/* ── 8 Real Projects with Custom Titles & User Images ── */
const projectsData = sharedProjectsData.map((p) => ({
  id: p.id,
  slug: p.slug,
  fileNo: p.fileNo,
  category: p.category,
  title: p.title,
  year: p.year,
  status: p.status,
  image: p.image,
  tags: p.tags,
  icon: p.icon,
}))

/* ── 4 Certificates with User Images ── */
const certificatesData = [
  {
    id: 'c1',
    fileNo: 'CERT_01',
    category: 'CERTIFICATION',
    title: 'Junior Web Developer (JWD)',
    issuer: 'Kominfo / BNSP Indonesia',
    year: '2025',
    credentialId: 'CERT-BNSP-88921',
    image: '/images/certif3.png',
    tags: ['BNSP Standard', 'Web Development'],
    icon: Award,
  },
  {
    id: 'c2',
    fileNo: 'CERT_02',
    category: 'COMPETENCY',
    title: 'Sertifikat Kompetensi Keahlian RPL',
    issuer: 'SMK Telkom Malang / BNSP',
    year: '2025',
    credentialId: 'STC-RPL-2025-091',
    image: '/images/certif4.png',
    tags: ['Software Engineering', 'Full Stack'],
    icon: Terminal,
  },
  {
    id: 'c3',
    fileNo: 'CERT_03',
    category: 'SPECIALIZATION',
    title: 'Cloud & DevOps Competency Certificate',
    issuer: 'Dicoding / Tech Skill Center',
    year: '2025',
    credentialId: 'STC-SYS-2025-114',
    image: '/images/certif5.png',
    tags: ['Docker', 'Nginx', 'Cloud Infrastructure'],
    icon: Layers,
  },
  {
    id: 'c4',
    fileNo: 'CERT_04',
    category: 'COMPETITION',
    title: 'Penghargaan Prestasi Lomba Kompetensi',
    issuer: 'LKS / Instansi Pendidikan',
    year: '2025',
    credentialId: 'AWS-SA-2025-044',
    image: '/images/certif6.png',
    tags: ['First Winner', 'Speed Coding'],
    icon: Sparkles,
  },
]

// Dynamic wave offsets and rotations for organic fanned arch effect
const waveStyles = [
  { translateY: '14px', rotate: '-3.5deg' },
  { translateY: '6px', rotate: '-2deg' },
  { translateY: '-3px', rotate: '-0.8deg' },
  { translateY: '-10px', rotate: '0deg' },
  { translateY: '-3px', rotate: '0.8deg' },
  { translateY: '6px', rotate: '2deg' },
  { translateY: '14px', rotate: '3.5deg' },
]

export function Projects() {
  const [activeTab, setActiveTab] = useState<'projects' | 'certificates'>('projects')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section id="work" className="relative border-b border-border bg-background py-20 md:py-28 overflow-hidden w-full">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/[0.05] blur-[160px] pointer-events-none" />

      {/* Header Container (Centered max-w-7xl) */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10">
            <Sparkles size={13} className="animate-spin" />
            03 — Fullscreen Deck Archive
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl mb-4">
            Karya &amp; <span className="text-primary">Prestasi.</span>
          </h2>
          <p className="text-muted-foreground font-mono text-xs md:text-sm max-w-xl mb-8">
            Sorot kursor ke folder untuk membuka kunci &amp; membaca detail berkas.
          </p>

          {/* Toggle Buttons & Arrow Navigation Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="inline-flex items-center rounded-full border border-border bg-card/90 p-1.5 backdrop-blur-md shadow-2xl">
              <button
                onClick={() => {
                  setActiveTab('projects')
                  setHoveredId(null)
                }}
                className={`flex items-center gap-2.5 rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'projects'
                    ? 'bg-primary text-black shadow-[0_0_25px_rgba(var(--primary-rgb),0.45)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FolderGit2 size={16} />
                Projects ({projectsData.length})
              </button>

              <button
                onClick={() => {
                  setActiveTab('certificates')
                  setHoveredId(null)
                }}
                className={`flex items-center gap-2.5 rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeTab === 'certificates'
                    ? 'bg-primary text-black shadow-[0_0_25px_rgba(var(--primary-rgb),0.45)]'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Award size={16} />
                Prestasi / Sertifikat ({certificatesData.length})
              </button>
            </div>

            {/* Scroll Navigation Arrows */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/90 p-1.5 backdrop-blur-md shadow-xl">
              <button
                onClick={() => handleScroll('left')}
                title="Geser Kiri"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-black transition-all duration-200 active:scale-95 shadow"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider px-1">GESER</span>
              <button
                onClick={() => handleScroll('right')}
                title="Geser Kanan"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-black transition-all duration-200 active:scale-95 shadow"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL WIDTH DECK CONTAINER (100% Edge-to-Edge Screen Width) */}
      <div className="relative group/deck w-full">
        {/* Side Floating Quick Action Arrows */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-card/90 text-muted-foreground hover:bg-primary hover:text-black border border-border backdrop-blur-md transition-all duration-300 shadow-2xl opacity-70 group-hover/deck:opacity-100"
          title="Geser Kiri"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex items-center justify-center h-12 w-12 rounded-full bg-card/90 text-muted-foreground hover:bg-primary hover:text-black border border-border backdrop-blur-md transition-all duration-300 shadow-2xl opacity-70 group-hover/deck:opacity-100"
          title="Geser Kanan"
        >
          <ChevronRight size={24} />
        </button>

        {/* Scrollable Wave Container spanning full screen width */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto py-12 px-6 sm:px-12 md:px-16 scroll-smooth no-scrollbar"
        >
          <div className="flex items-center justify-start xl:justify-center min-w-max -space-x-8 sm:-space-x-10 md:-space-x-12 px-4 pt-4 pb-6">
            {(activeTab === 'projects' ? projectsData : certificatesData).map((item, index) => {
              const isHovered = hoveredId === item.id
              const waveStyle = waveStyles[index % waveStyles.length]

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group relative flex-none w-[280px] sm:w-[310px] md:w-[330px] transition-all duration-300 ease-out cursor-pointer ${
                    isHovered
                      ? 'z-30 shadow-[0_20px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(var(--primary-rgb),0.35)]'
                      : 'z-10 shadow-xl'
                  }`}
                  style={{
                    transform: isHovered
                      ? 'translateY(-14px) rotate(0deg)'
                      : `translateY(${waveStyle.translateY}) rotate(${waveStyle.rotate})`,
                  }}
                >
                  {/* Folder Tab Header */}
                  <div className="flex items-end justify-between px-2">
                    <div
                      className={`relative flex items-center gap-2 rounded-t-xl px-4 py-2 font-mono text-[11px] font-bold tracking-wider transition-all duration-300 border border-b-0 ${
                        isHovered
                          ? 'border-primary bg-primary text-black shadow-[0_-3px_10px_rgba(var(--primary-rgb),0.4)]'
                          : 'border-border bg-muted text-muted-foreground group-hover:border-primary/80 group-hover:bg-muted'
                      }`}
                    >
                      <Folder size={14} className={isHovered ? 'text-black fill-black' : 'text-primary fill-primary/40'} />
                      <span>{item.fileNo}</span>
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground px-2 py-1 font-semibold">#0{index + 1}</span>
                  </div>

                  {/* Folder Card Body */}
                  <div
                    className={`relative flex flex-col justify-between overflow-hidden rounded-2xl rounded-tl-none border transition-all duration-300 min-h-[380px] ${
                      isHovered
                        ? 'border-primary bg-card/95 ring-1 ring-primary/40'
                        : 'border-border/80 bg-card group-hover:border-primary/60 shadow-2xl'
                    }`}
                  >
                    {/* Minimalist Lock/Eye Cover - High Contrast Card Background (Shown when NOT hovered) */}
                    <div
                      className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-muted via-card to-background transition-all duration-300 ${
                        isHovered ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100 scale-100'
                      }`}
                    >
                      {/* Centered Lock Icon with Glowing Ring */}
                      <div className="relative flex flex-col items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
                        <div className="relative flex items-center justify-center h-20 w-20 rounded-2xl bg-card/90 border border-primary/40 text-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.25)] group-hover:border-primary group-hover:scale-110 transition-all duration-300">
                          <Lock size={36} className="text-primary" />
                        </div>
                        
                        <div className="mt-6 flex items-center gap-2 font-mono text-xs font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
                          <Eye size={14} className="text-primary animate-bounce" />
                          <span>HOVER TO UNLOCK</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Content (Revealed when HOVERED) */}
                    <div
                      className={`flex flex-col justify-between flex-1 transition-all duration-300 ${
                        isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Photo Banner Area */}
                      <div className="relative h-44 w-full overflow-hidden bg-background">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                          <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-black/80 text-primary border border-primary/40">
                            {item.category}
                          </span>
                          <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-black/80 text-muted-foreground border border-border">
                            {item.year}
                          </span>
                        </div>
                      </div>

                      {/* Card Info Body */}
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <h3 className="text-base font-bold text-foreground mb-2 leading-snug text-primary">
                            {item.title}
                          </h3>

                          {activeTab === 'projects' ? (
                            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground mb-3">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                              {(item as typeof projectsData[0]).status}
                            </div>
                          ) : (
                            <p className="font-mono text-xs text-muted-foreground mb-3">
                              Penerbit: <span className="text-foreground font-semibold">{(item as typeof certificatesData[0]).issuer}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 border-t border-border pt-3 mb-3">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded border border-primary/20 bg-primary/5 px-2 py-0.5 font-mono text-[9px] text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Action Button */}
                          {activeTab === 'projects' && 'slug' in item ? (
                            <Link href={`/project/${(item as typeof projectsData[0]).slug}`} className="flex items-center justify-between font-mono text-xs font-bold text-black bg-primary rounded-lg px-3 py-2 shadow-md hover:brightness-110 transition-all">
                              <span>Lihat Proyek</span>
                              <ArrowUpRight size={15} />
                            </Link>
                          ) : (
                            <div className="flex items-center justify-between font-mono text-xs font-bold text-black bg-primary rounded-lg px-3 py-2 shadow-md">
                              <span>Verifikasi</span>
                              <ExternalLink size={15} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
