'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode, useEffect } from 'react'

export function SmoothScrolling({ children }: { children: ReactNode }) {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      const href = target?.getAttribute('href')
      
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault()
        lenis.scrollTo(href)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [lenis])

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
