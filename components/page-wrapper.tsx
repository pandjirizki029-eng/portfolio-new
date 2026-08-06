'use client'

import { useState } from 'react'
import { IntroSplash } from '@/components/intro-splash'

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <IntroSplash onComplete={() => setIntroComplete(true)} />
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
