'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, Maximize2, Minus, X, ChevronRight } from 'lucide-react'

type Command = {
  cmd: string
  output: React.ReactNode
}

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Command[]>([
    {
      cmd: 'welcome',
      output: (
        <div className="text-zinc-400 mb-2">
          <p>Welcome to PandjiOS v1.0.0 (tty1)</p>
          <p>Type <span className="text-primary font-bold">'help'</span> to see available commands.</p>
          <p>Try typing <span className="text-primary font-bold">'whoami'</span> to start.</p>
        </div>
      ),
    },
  ])
  const [input, setInput] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [history])

  // Focus input on click anywhere in terminal
  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedCmd = input.trim().toLowerCase()
    
    if (!trimmedCmd) return

    let output: React.ReactNode = null

    switch (trimmedCmd) {
      case 'whoami':
        output = (
          <div className="text-white space-y-2 mt-2 mb-4">
            <div className="font-bold text-xl text-primary animate-pulse">Hii! Aku Panji 👋</div>
            <p className="text-zinc-300">
              Nama lengkapku <span className="text-orange-400 font-semibold">Muhammad Pandji Ar Rizky Munib</span>.
            </p>
            <p className="text-zinc-300">
              Aku adalah seorang siswa jurusan <span className="text-sky-300">Sistem Informasi Jaringan dan Aplikasi (SIJA)</span> di SMK Telkom Sidoarjo.
            </p>
            <p className="text-zinc-300">
              Aku sangat tertarik dengan dunia <span className="text-purple-400">Linux, DevOps, dan Cloud Infrastructure</span>. 
              Membangun sistem yang reliable dan secure adalah passion utamaku!
            </p>
          </div>
        )
        break
      case 'help':
        output = (
          <div className="text-zinc-300 space-y-1 mt-2 mb-4">
            <p className="text-zinc-400 mb-2">Available commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-primary font-bold">whoami</span><span>Nampilin siapa aku sebenarnya</span>
              <span className="text-primary font-bold">skills</span><span>Lihat daftar skill dan tech stack</span>
              <span className="text-primary font-bold">socials</span><span>Daftar kontak dan sosial media</span>
              <span className="text-primary font-bold">sudo</span><span>???</span>
              <span className="text-primary font-bold">clear</span><span>Bersihkan layar terminal</span>
            </div>
          </div>
        )
        break
      case 'skills':
        output = (
          <div className="text-zinc-300 space-y-2 mt-2 mb-4">
            <p className="text-zinc-400 mb-2">My Tech Stack:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-sky-400">OS:</span> Linux (Ubuntu, Debian)</li>
              <li><span className="text-blue-500">Containers:</span> Docker, Docker Compose</li>
              <li><span className="text-green-500">Web Server:</span> Nginx</li>
              <li><span className="text-purple-500">Frontend:</span> React, Next.js, TailwindCSS</li>
              <li><span className="text-orange-400">Cloud:</span> AWS, VPS (DigitalOcean)</li>
            </ul>
          </div>
        )
        break
      case 'socials':
        output = (
          <div className="text-zinc-300 space-y-1 mt-2 mb-4">
            <p><span className="text-zinc-500">GitHub:</span> <a href="#" className="text-primary hover:underline">github.com/pandjirizki</a></p>
            <p><span className="text-zinc-500">LinkedIn:</span> <a href="#" className="text-primary hover:underline">linkedin.com/in/pandjirizki</a></p>
            <p><span className="text-zinc-500">Email:</span> <a href="mailto:pandji@example.com" className="text-primary hover:underline">pandji@example.com</a></p>
          </div>
        )
        break
      case 'sudo':
        output = (
          <div className="text-red-400 mt-2 mb-4">
            pandji is not in the sudoers file. This incident will be reported.
          </div>
        )
        break
      case 'clear':
        setHistory([])
        setInput('')
        return
      default:
        output = (
          <div className="text-red-400 mt-1 mb-4">
            Command not found: {trimmedCmd}. Type 'help' for available commands.
          </div>
        )
    }

    setHistory((prev) => [...prev, { cmd: input, output }])
    setInput('')
  }

  return (
    <div 
      className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl font-mono text-sm shadow-primary/10 transition-all hover:shadow-primary/20"
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-white/10 select-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold">
          <TerminalIcon size={14} />
          pandji@portfolio: ~
        </div>
        <div className="flex gap-3 text-zinc-500">
          <Minus size={14} className="hover:text-white cursor-pointer transition-colors" />
          <Maximize2 size={14} className="hover:text-white cursor-pointer transition-colors" />
          <X size={14} className="hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollContainerRef}
        className="p-5 h-[400px] md:h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
      >
        {history.map((item, i) => (
          <div key={i}>
            {item.cmd !== 'welcome' && (
              <div className="flex items-center gap-2 text-zinc-100 mb-1">
                <span className="text-green-400 font-bold">pandji@portfolio</span>
                <span className="text-white">:</span>
                <span className="text-blue-400 font-bold">~</span>
                <span className="text-white">$</span>
                <span className="ml-1">{item.cmd}</span>
              </div>
            )}
            {item.output}
          </div>
        ))}
        
        {/* Current Input Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 text-zinc-100 mt-2">
          <span className="text-green-400 font-bold whitespace-nowrap">pandji@portfolio</span>
          <span className="text-white">:</span>
          <span className="text-blue-400 font-bold">~</span>
          <span className="text-white">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-zinc-100 caret-primary"
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  )
}
