'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useAnimation, PanInfo, useTransform } from 'framer-motion'
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

// Removed waveStyles since we no longer stack them

function Gallery({ type }: { type: 'projects' | 'certificates' }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const x = useMotionValue(0)
  const controls = useAnimation()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Configuration for Coverflow
  // Reduced width so more items fit on a standard 100% zoom screen
  const itemWidth = 300
  const gap = 24
  const step = itemWidth + gap

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Pseudo-infinite items (duplicate 3 times for super lightweight 60fps performance)
  const currentData = type === 'projects' ? projectsData : certificatesData
  const infiniteItems = Array.from({ length: 3 }).flatMap((_, i) => 
    currentData.map((item) => ({ ...item, uniqueId: `${i}-${item.id}` }))
  )
  
  const totalWidth = infiniteItems.length * step

  // Start in the middle of the track
  useEffect(() => {
    if (windowWidth > 0) {
      const middleIndex = Math.floor(infiniteItems.length / 2)
      const startX = -(middleIndex * step) + windowWidth / 2 - itemWidth / 2
      x.set(startX)
      controls.set({ x: startX })
    }
  }, [windowWidth, type])

  const handleDragEnd = (e: any, info: PanInfo) => {
    // We can add logic to snap to the closest item here if we want,
    // but a smooth free-drag is also very nice.
  }

  // Calculate dynamic styles for each item based on `x` motion value
  const CarouselItem = ({ item, index }: { item: any, index: number }) => {
    const itemCenter = index * step + itemWidth / 2
    
    const distance = useTransform(x, (val) => {
      return val + itemCenter - windowWidth / 2
    })

    // Tunnel/Concave Effect: Edges are large and rotated inwards, center is small
    // Thresholds tuned to 600px so it perfectly frames 5 visible cards on a 100% display
    const rotateY = useTransform(distance, [-600, 0, 600], [30, 0, -30])
    const scale = useTransform(distance, [-600, 0, 600], [1.25, 0.75, 1.25])
    
    // Fix zIndex: framer-motion needs exact integers for z-index, otherwise browsers ignore it
    const rawZIndex = useTransform(distance, [-600, 0, 600], [10, 0, 10])
    const zIndex = useTransform(rawZIndex, (val) => Math.round(val))
    
    // Wide opacity so cards NEVER disappear on wide screens until safely out of view
    const opacity = useTransform(distance, [-2000, -800, 0, 800, 2000], [0, 1, 1, 1, 0])

    return (
      <div 
        style={{ 
          perspective: '1200px', 
          width: 300, 
          marginLeft: index === 0 ? 0 : 24 
        }} 
        className="relative flex-none"
      >
        <motion.div
          style={{
            rotateY,
            scale,
            zIndex,
            opacity,
            willChange: "transform",
          }}
          className="relative w-full h-[180px] sm:h-[220px] md:h-[240px] rounded-2xl overflow-hidden shadow-2xl bg-card border-2 border-white/5 cursor-none group"
        >
        <Image
          src={item.image}
          alt={item.title}
          fill
          draggable={false}
          className="object-cover object-center pointer-events-none"
        />
        {/* Subtle gradient overlay to enhance 3D effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent pointer-events-none" />
        
        {/* Action Button (Lihat Detail) */}
        <Link
          href={type === 'projects' && item.slug ? `/project/${item.slug}` : '#'}
          onMouseEnter={() => setIsHovering(false)}
          onMouseLeave={() => setIsHovering(true)}
          className="absolute bottom-5 right-5 z-30 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110 transition-all duration-300"
          title={type === 'projects' ? 'Lihat Detail Proyek' : 'Lihat Sertifikat'}
        >
          {type === 'projects' ? <ArrowUpRight size={24} /> : <ExternalLink size={24} />}
        </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <section id={type === 'projects' ? 'work' : 'certificates'} className="relative border-b border-border bg-background py-20 md:py-28 overflow-hidden w-full">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-primary/[0.05] blur-[160px] pointer-events-none" />

      {/* Header Container (Centered max-w-7xl) */}
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary mb-3 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10">
            <Sparkles size={13} className="animate-spin" />
            {type === 'projects' ? '03 — Fullscreen Deck Archive' : '04 — Professional Licenses'}
          </div>
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-foreground md:text-5xl mb-4">
            {type === 'projects' ? (
              <>Karya &amp; <span className="text-primary">Prestasi.</span></>
            ) : (
              <>Lisensi &amp; <span className="text-primary">Sertifikasi.</span></>
            )}
          </h2>
          <p className="text-muted-foreground font-mono text-xs md:text-sm max-w-xl mb-8">
            Geser (drag) ke kanan atau kiri untuk menjelajahi {type === 'projects' ? 'seluruh proyek' : 'seluruh sertifikat'}
          </p>
        </div>
      </div>

      {/* Custom Drag Cursor (Placed outside perspective container to avoid breaking 'fixed' positioning) */}
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center px-5 py-2 bg-foreground text-background font-bold text-sm tracking-wide rounded-full shadow-2xl border border-white/20"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1 : 0,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 28, mass: 0.5 },
          opacity: { duration: 0.2 }
        }}
      >
        Drag
      </motion.div>

      {/* FULL WIDTH DECK CONTAINER */}
      <div 
        ref={containerRef}
        className="relative w-full cursor-none overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Draggable Track */}
        <div ref={carouselRef} className="w-full py-16 px-0">
          <motion.div
            drag="x"
            // Allow dragging all the way to center even at the extremes
            dragConstraints={{ right: windowWidth / 2, left: -totalWidth + windowWidth / 2 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
            style={{ x }}
            animate={controls}
            onDragEnd={handleDragEnd}
            className="flex items-center min-w-max"
          >
            {infiniteItems.map((item, index) => (
              <CarouselItem key={item.uniqueId} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function Projects() {
  return <Gallery type="projects" />
}

export function Certificates() {
  return <Gallery type="certificates" />
}
