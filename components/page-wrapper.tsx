'use client'

import { useState, useEffect } from 'react'
import { IntroSplash } from '@/components/intro-splash'

const INTRO_KEY = 'intro-played'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [alreadyPlayed, setAlreadyPlayed] = useState(true) // default true to avoid flash
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    // Check sessionStorage — only runs client-side
    const played = sessionStorage.getItem(INTRO_KEY)
    if (played) {
      setIntroComplete(true)
      setAlreadyPlayed(true)
    } else {
      setAlreadyPlayed(false)
    }
  }, [])

  const handleComplete = () => {
    setIntroComplete(true)
    sessionStorage.setItem(INTRO_KEY, '1')
  }

  return (
    <>
      {!alreadyPlayed && <IntroSplash onComplete={handleComplete} />}
      <div
        className={`transition-opacity duration-700 ${
          introComplete ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ pointerEvents: introComplete ? 'auto' : 'none' }}
      >
        {children}
      </div>
    </>
  )
}
