'use client'

import { useEffect, useState } from 'react'

const WORDS = ['Hi,', 'Halo,', 'Bonjour,', 'Hola,', 'Ciao,']

export function AnimatedGreeting() {
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(WORDS[0].length)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = WORDS[wordIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && charIndex < currentWord.length) {
      // Kecepatan mengetik santai & jelas (270ms per huruf)
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1)
      }, 270)
    } else if (!isDeleting && charIndex === currentWord.length) {
      // Jeda membaca saat kata lengkap (2.8 detik)
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2800)
    } else if (isDeleting && charIndex > 0) {
      // Kecepatan menghapus perlahan (130ms per huruf)
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1)
      }, 130)
    } else if (isDeleting && charIndex === 0) {
      // Jeda sebelum mengetik bahasa berikutnya (500ms)
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % WORDS.length)
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex])

  const currentWord = WORDS[wordIndex]
  const displayedText = currentWord.slice(0, charIndex)

  return (
    <div className="mb-2 sm:mb-3 inline-flex items-baseline select-none">
      <style>{`
        @keyframes fast-cursor-blink {
          0%, 49% {
            opacity: 1;
          }
          50%, 100% {
            opacity: 0;
          }
        }
        .animate-fast-cursor {
          animation: fast-cursor-blink 0.55s infinite;
        }
      `}</style>

      {/* Teks salam bahasa yang berubah: Ukuran lebih besar & warna teks kontras elegan (text-foreground putih/terang dengan glow halus) */}
      <span className="font-serif italic font-bold text-lg sm:text-xl md:text-2xl text-foreground tracking-normal leading-none inline-flex items-baseline drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
        {displayedText}
      </span>

      {/* Kursor typing di antara teks salam dan I'M */}
      <span className="inline-block w-[2px] sm:w-[2.5px] h-[0.95em] bg-primary rounded-full animate-fast-cursor self-center ml-1.5 mr-2 sm:mr-2.5 opacity-95 shadow-[0_0_8px_rgba(234,88,12,0.8)]" />

      {/* Teks "I'm" warna signature primary orange berukuran seimbang & lebih besar */}
      <span className="font-mono text-base sm:text-lg md:text-xl uppercase tracking-[0.25em] text-primary font-bold leading-none inline-flex items-baseline">
        I&apos;m
      </span>
    </div>
  )
}
