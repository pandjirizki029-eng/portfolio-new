'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Terminal as TerminalIcon, Maximize2, Minus, X, ChevronRight } from 'lucide-react'

type Command = {
  cmd: string
  output: React.ReactNode
}

const ASCII_ART = [
  "=====-:::::::::::=-:::::*************====----=+####%%%%%%%%%%*+=--------------------*=-----*+-------",
  "====----::::::::-+=::::*************====---=+#%%%%%%%%%%%%%%%%%##*-----------------*=-----*+--------",
  "===------::-=:--+=::::*************===----+%%%%%%%%%%%%%%%%%%%%%%#%#=-------------*=-----*+---------",
  "==-----:---+++++=:::-+++**********===----*%%###%%%%%%%%%%%%%%%%%%%%%%=-----------==-----*+----------",
  "=----::::-===++=:::-==+==++******===-----*#+**###%%%%%%%%%%%%%%%%%%%%%+---------*=-----#+-----------",
  "---------======:::-***+==+=+=***===----+#**++***#%%%%%%%%%%%%%%%%%%%%##=------=*=-----*=-----------=",
  "--------======--:=******+++===*===----*###++++++++*###%%%%%%%%%%%%%%%##===----#=-----#=-----------=#",
  "-------======:---**********++*===----+#*%*=+++==++++*#%%%%%%%%%%%%%%%%%#+====#=-----#=-----------=##",
  "------======----*************===-----+#*#====+++++++*##%%%%%%%%%%%%%%%%%+===*==---=#=-----------=###",
  "==---=========-*************===------*#*+===++++++****#%%%%%%%%%%%%%%%%%#+=*======#=-----------+####",
  "----=====--=--*************===---------====+++*****####%%%%%%%%%%%%%%%%%%+*====-=#===---------+#####",
  ":::=====-:---*************+===---------==+++++**##**#%%##%%%%%%%%%%%%%%%**==-===#=======-----+######",
  "=:=====-----+*++*********+===---------=++++++****##%##########%%%%%%%%%#*==-===*==========+=*#######",
  "-==+****#**#####***=-=***+==---------=++++++***#####%##########%%%#%%#+*==-=-=*===========-*########",
  "=+****##*#############*+*+=*=*=---====++++++*******###**########%#%##+*==-=-=*=======--==-*#########",
  "****###*###################++*+==+++==+++++*****#******#%%###%%#*+===*-----=*======-====-*##########",
  "***##%#*#########%#########*++*+++++++++++*****#++*+**#########*=-=++-----++==--===-===-*##########+",
  "*###%#***######%#######%%%#*++**+++**+++++******##****#######**+=+++-----++=--===--===-*##########==",
  "*##%%****####%######%%%%%%%#*++*#+****++++**###**#####+====+**++=++-----++=--===--==+-*##########-=*",
  "##%%#****##%########%%%%%%%%%****#***#*+*******#####*=**+++*******=----++-----======-##########*--++",
  "#%%%***#########%%%%%%%%%%%%%%%#**+%%%%%%%%%%*+++*%%%%%%%%%%**********++-----======-##########*--++=",
  "#%%#**#########%%%%%%%%%%%%%%%%%%%#%%%%%%%%%%%+==========++++*****+*******+---==-=-##########*=*=*+-",
  "%%%*#########%%%%%%%%%%%%%%%%%%%%%#%%%%%%%%%%%++++++++++++*+++**+++++***********+=##########*+*****+",
  "%%#########%%%%#%%%%%%%%%%%%%%%%%%#+++#*#+++++++++*****************+*************%#########*******+=",
  "%########%%%%%%%%%%%%%%%%%%%%%%%%%#+==+++======++********#######*****************%%%######+=+**#*+=-",
  "%#######%%%%#%%#%%%%%%%%%%%%%%%%%%#*=++++++=====++++++++**+==++*****************#%%%%####+=++**+=+*=",
  "%#######%%####%%%%###%%%%%%%%%%%%%#*=++++==+========++++++++****##*************%%%%%%%%#==+**=-=----",
  "########%%%####%%####%%%%%%%%%%%%%**+==================++++***##*************#%%%%%%%%%%*+++-=+=====",
  "#######%%%%%%%%%%%%%%%%%%%%#%%%%%%%%#############%%%%%%%%%%%%%#************#%%%%%%%%%%%%#+*-==--:===",
  "######%%%%%%%%%%%%%%%%%%%%#%%%%#%%%%%%%%%%%%%%%%%%%%%%%%%%%@@#***#+===+=#%%%%%%%%%%%%%%%*+===--:---=",
  "#####%%%%%%%%%%%%%%%%%%%%#%%%%%%%%##%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#+=+--%%%%%%%%%%%%%%#+:==-------=",
  "####%%%%%%%%%%%%%%##*#*%%%%%%%%%%#%%%%%%%%%%%%%%%%%%%%@%%%%%%%%%%%%%#+:-#%%%%%%%%%%%%%%#=+=---:==-=-",
  "###%%%%%%%%%%%%%%%%%%%%#%%*#%%%%%%%%%%%%%%%%%%%%%%%%%@@%%%%%%%%%%%%%%%+##%%%%%%%%%%%%%%*+=--=-=---:-",
  "##%%%%%%%%%%%%+*%%%%%%%%%%%+***%%%%%%#%%#%%%%%%%%%%%@@@%%%%%%%%%%%%%%%%#%%%%%%%%%%%%%%%*=-=---=--:-=",
  "#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%++=:--=----==",
  "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#=-++=+=--==+=",
  "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*=+=-*+=--+===",
  "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+===**+-=+=--+",
  "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+=+**=--===-++",
  "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#++*+=-==++=*+=",
  "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%==+=--==+=++=-:",
  "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%+------=*%%%%%%%%%%%%%%%%%%%%%%%%%+++==-==++++++-=",
  "%%%%%%%%%%%@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%*=---------=-*##%%%%%%%%%%%%%%%%%%%%*+++=-==++=*===++",
  "%%%%%%%%%%@@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=*=------====-*########%%%%%%%%%%%%%%=+*+--==+=+**====+",
  "%%%%%%%%%@@@@@%%%%%%%@@@%%%%%%%%%%%%%%%%%%#=-*=---+=---==-*##########****######*==*#+====++++*+-=-++",
  "%%%%%%%%%@@@@@@%@@@%%@@@%%%%%%%%%%%%%%%%%%=-*------+-===-#############++=====++===#*=-=+++++*===-++*",
  "%%%%%%%@@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%-*------------##########+*#+=++=+=++=-=*+===+=++#*=====+++",
  "%%%%%%%@@@@@@@@@@@@@@@@@@@%%%%%%%%%%%%%%%+*---:-:::---:*#########+===--=+#**##=+++**++++++==+===++++"
].join('\n')

export function InteractiveTerminal() {
  const [history, setHistory] = useState<Command[]>([
    {
      cmd: 'welcome',
      output: (
        <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 items-start mb-6 mt-2">
          <div className="hidden md:block text-primary font-mono whitespace-pre text-[4px] leading-[1.2] select-none tracking-tighter opacity-80">
            {ASCII_ART}
          </div>
          <div className="text-[#8b949e] flex flex-col justify-center w-full">
            <div className="mb-4 inline-block">
              <span className="text-primary font-bold">pandji</span>
              <span className="text-[#c9d1d9]">@</span>
              <span className="text-primary font-bold">portfolio</span>
              <div className="h-px bg-[#30363d] w-full my-1"></div>
            </div>
            
            <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-1 mb-4 text-xs md:text-sm">
              <span className="text-primary font-bold">OS</span><span className="text-[#c9d1d9]">PandjiOS x86_64</span>
              <span className="text-primary font-bold">Host</span><span className="text-[#c9d1d9]">Portfolio Web Server</span>
              <span className="text-primary font-bold">Kernel</span><span className="text-[#c9d1d9]">5.15.0-1040-aws</span>
              <span className="text-primary font-bold">Uptime</span><span className="text-[#c9d1d9]">99.9% (Always Online)</span>
              <span className="text-primary font-bold">Shell</span><span className="text-[#c9d1d9]">bash 5.1.16</span>
              <span className="text-primary font-bold">Theme</span><span className="text-[#c9d1d9]">Dot Matrix (Terminal)</span>
            </div>
            
            <div className="flex gap-1.5 mb-5">
              <div className="w-3 h-3 bg-[#1e1e1e]"></div>
              <div className="w-3 h-3 bg-[#f85149]"></div>
              <div className="w-3 h-3 bg-[#3fb950]"></div>
              <div className="w-3 h-3 bg-[#d29922]"></div>
              <div className="w-3 h-3 bg-[#58a6ff]"></div>
              <div className="w-3 h-3 bg-[#bc8cff]"></div>
              <div className="w-3 h-3 bg-[#39c5cf]"></div>
              <div className="w-3 h-3 bg-[#b1bac4]"></div>
            </div>

            <p className="mb-1 text-[#c9d1d9]">Welcome to PandjiOS v1.0.0 (tty1)</p>
            <p>Type <span className="text-primary font-bold">'help'</span> to see available commands.</p>
            <p>Try typing <span className="text-primary font-bold">'whoami'</span> to start.</p>
          </div>
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
          <div className="text-[#c9d1d9] space-y-2 mt-2 mb-4">
            <div className="font-bold text-xl text-primary animate-pulse">Hii! Aku Panji 👋</div>
            <p className="text-[#8b949e]">
              Nama lengkapku <span className="text-orange-400 font-semibold">Muhammad Pandji Ar Rizky Munib</span>.
            </p>
            <p className="text-[#8b949e]">
              Aku adalah seorang siswa jurusan <span className="text-sky-300">Sistem Informasi Jaringan dan Aplikasi (SIJA)</span> di SMK Telkom Sidoarjo.
            </p>
            <p className="text-[#8b949e]">
              Aku sangat tertarik dengan dunia <span className="text-purple-400">Linux, DevOps, dan Cloud Infrastructure</span>. 
              Membangun sistem yang reliable dan secure adalah passion utamaku!
            </p>
          </div>
        )
        break
      case 'help':
        output = (
          <div className="text-[#8b949e] space-y-1 mt-2 mb-4">
            <p className="text-[#8b949e] mb-2">Available commands:</p>
            <div className="grid grid-cols-[100px_1fr] gap-2 text-[#c9d1d9]">
              <span className="text-primary font-bold">whoami</span><span>Nampilin siapa aku sebenarnya</span>
              <span className="text-primary font-bold">neofetch</span><span>Tampilkan info sistem & ASCII art</span>
              <span className="text-primary font-bold">skills</span><span>Lihat daftar skill dan tech stack</span>
              <span className="text-primary font-bold">socials</span><span>Daftar kontak dan sosial media</span>
              <span className="text-primary font-bold">sudo</span><span>???</span>
              <span className="text-primary font-bold">clear</span><span>Bersihkan layar terminal</span>
            </div>
          </div>
        )
        break
      case 'neofetch':
        output = (
          <div className="flex flex-col xl:flex-row gap-4 xl:gap-8 items-start mb-6 mt-4">
            <div className="hidden md:block text-primary font-mono whitespace-pre text-[4px] leading-[1.2] select-none tracking-tighter opacity-80">
              {ASCII_ART}
            </div>
            <div className="text-[#8b949e] flex flex-col justify-center w-full">
              <div className="mb-4 inline-block">
                <span className="text-primary font-bold">pandji</span>
                <span className="text-[#c9d1d9]">@</span>
                <span className="text-primary font-bold">portfolio</span>
                <div className="h-px bg-[#30363d] w-full my-1"></div>
              </div>
              
              <div className="grid grid-cols-[80px_1fr] gap-x-2 gap-y-1 mb-4 text-xs md:text-sm">
                <span className="text-primary font-bold">OS</span><span className="text-[#c9d1d9]">PandjiOS x86_64</span>
                <span className="text-primary font-bold">Host</span><span className="text-[#c9d1d9]">Portfolio Web Server</span>
                <span className="text-primary font-bold">Kernel</span><span className="text-[#c9d1d9]">5.15.0-1040-aws</span>
                <span className="text-primary font-bold">Uptime</span><span className="text-[#c9d1d9]">99.9% (Always Online)</span>
                <span className="text-primary font-bold">Packages</span><span className="text-[#c9d1d9]">1337 (npm)</span>
                <span className="text-primary font-bold">Shell</span><span className="text-[#c9d1d9]">bash 5.1.16</span>
                <span className="text-primary font-bold">Theme</span><span className="text-[#c9d1d9]">Dot Matrix (Terminal)</span>
                <span className="text-primary font-bold">CPU</span><span className="text-[#c9d1d9]">100x Engineer Brain</span>
                <span className="text-primary font-bold">Memory</span><span className="text-[#c9d1d9]">16GB / 32GB</span>
              </div>
              
              <div className="flex gap-1.5 mb-2">
                <div className="w-3 h-3 bg-[#1e1e1e]"></div>
                <div className="w-3 h-3 bg-[#f85149]"></div>
                <div className="w-3 h-3 bg-[#3fb950]"></div>
                <div className="w-3 h-3 bg-[#d29922]"></div>
                <div className="w-3 h-3 bg-[#58a6ff]"></div>
                <div className="w-3 h-3 bg-[#bc8cff]"></div>
                <div className="w-3 h-3 bg-[#39c5cf]"></div>
                <div className="w-3 h-3 bg-[#b1bac4]"></div>
              </div>
            </div>
          </div>
        )
        break
      case 'skills':
        output = (
          <div className="text-[#8b949e] space-y-2 mt-2 mb-4">
            <p className="text-[#8b949e] mb-2">My Tech Stack:</p>
            <ul className="list-disc list-inside space-y-1 text-[#c9d1d9]">
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
          <div className="text-[#8b949e] space-y-1 mt-2 mb-4">
            <p><span className="text-[#8b949e]">GitHub:</span> <a href="https://github.com/pandjirizki029-eng" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/pandjirizki029-eng</a></p>
            <p><span className="text-[#8b949e]">LinkedIn:</span> <a href="https://www.linkedin.com/in/pandji-rizki-927ba3421" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">linkedin.com/in/pandji-rizki-927ba3421</a></p>
            <p><span className="text-[#8b949e]">Instagram:</span> <a href="https://www.instagram.com/fyxx_jull?igsh=aXBrdTR6cGxjNnQx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">instagram.com/fyxx_jull</a></p>
            <p><span className="text-[#8b949e]">Email:</span> <a href="mailto:pandjirizki24@gmail.com" className="text-primary hover:underline">pandjirizki24@gmail.com</a></p>
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
        setHistory((prev) => prev.length > 0 && prev[0].cmd === 'welcome' ? [prev[0]] : [])
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
      className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-2xl font-mono text-sm shadow-primary/10 transition-all hover:shadow-primary/20"
      onClick={focusInput}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d] select-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
        </div>
        <div className="flex items-center gap-2 text-[#8b949e] text-xs font-semibold">
          <TerminalIcon size={14} />
          pandji@portfolio: ~
        </div>
        <div className="flex gap-3 text-[#8b949e]">
          <Minus size={14} className="hover:text-[#c9d1d9] cursor-pointer transition-colors" />
          <Maximize2 size={14} className="hover:text-[#c9d1d9] cursor-pointer transition-colors" />
          <X size={14} className="hover:text-[#c9d1d9] cursor-pointer transition-colors" />
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
              <div className="flex items-center gap-2 text-[#c9d1d9] mb-1">
                <span className="text-green-400 font-bold">pandji@portfolio</span>
                <span className="text-[#c9d1d9]">:</span>
                <span className="text-blue-400 font-bold">~</span>
                <span className="text-[#c9d1d9]">$</span>
                <span className="ml-1">{item.cmd}</span>
              </div>
            )}
            {item.output}
          </div>
        ))}
        
        {/* Current Input Line */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 text-[#c9d1d9] mt-2">
          <span className="text-green-400 font-bold whitespace-nowrap">pandji@portfolio</span>
          <span className="text-[#c9d1d9]">:</span>
          <span className="text-blue-400 font-bold">~</span>
          <span className="text-[#c9d1d9]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-[#c9d1d9] caret-primary"
            spellCheck="false"
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  )
}
